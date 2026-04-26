"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

type ReceivableRow = {
  id: string;
  description: string;
  due_date: string;
  amount: number;
  received_amount: number;
  status: string;
  customer_name: string | null;
  unit_name: string;
};

type HistoryItem = {
  id: string;
  entity_id: string;
  action: string;
  created_at: string;
  user_id: string | null;
  previous_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
};

function formatMoney(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

function formatDate(value: string): string {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

function formatDateTime(value: string): string {
  if (!value) return "—";
  const [datePart, timePart = ""] = value.split("T");
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}${timePart ? ` • ${timePart.slice(0, 5)}` : ""}`;
}

function getHistoryLabel(action: string): string {
  const map: Record<string, string> = {
    create: "Criação",
    update: "Edição",
    pay: "Quitação total",
    pay_partial: "Baixa parcial",
    pay_batch: "Quitação em lote",
    receive: "Recebimento total",
    receive_partial: "Recebimento parcial",
    receive_batch: "Recebimento em lote",
    cancel: "Cancelamento",
    reverse: "Estorno",
  };
  return map[action] || action;
}

function readNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getHistoryValue(item: HistoryItem): number | null {
  const next = item.new_data || {};
  const prev = item.previous_data || {};
  return (
    readNumber(next.partial_amount) ??
    readNumber(next.received_amount) ??
    readNumber(next.paid_amount) ??
    readNumber(next.amount) ??
    readNumber(prev.partial_amount) ??
    readNumber(prev.received_amount) ??
    readNumber(prev.paid_amount) ??
    null
  );
}

function getHistoryNote(item: HistoryItem): string {
  const next = item.new_data || {};
  const prev = item.previous_data || {};
  const candidates = [
    next.cancel_reason,
    next.reverse_reason,
    next.notes,
    prev.cancel_reason,
    prev.reverse_reason,
    prev.notes,
  ];
  const found = candidates.find((value) => typeof value === "string" && value.trim().length > 0);
  return typeof found === "string" ? found.trim() : "";
}

function HistoryTimeline({ items }: { items: HistoryItem[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Histórico da conta</p>
        <span className="text-[11px] text-slate-400">{items.length} evento(s)</span>
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/10 bg-slate-50 px-3 py-4 text-xs text-slate-500">Nenhum evento encontrado para esta conta.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const value = getHistoryValue(item);
            const note = getHistoryNote(item);
            return (
              <div key={item.id} className="rounded-xl border border-black/5 bg-slate-50 px-3 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-slate-800">{getHistoryLabel(item.action)}</div>
                  <div className="text-[11px] text-slate-500">{formatDateTime(item.created_at)}</div>
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-slate-400">Ação</div>
                    <div className="mt-1 text-xs font-medium text-slate-700">{getHistoryLabel(item.action)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-slate-400">Valor</div>
                    <div className="mt-1 text-xs font-medium text-slate-700">{value === null ? "—" : formatMoney(value)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-slate-400">Usuário</div>
                    <div className="mt-1 text-xs font-medium text-slate-700">{item.user_id || "—"}</div>
                  </div>
                </div>
                {note ? (
                  <div className="mt-2">
                    <div className="text-[11px] uppercase tracking-[0.08em] text-slate-400">Observação / motivo</div>
                    <div className="mt-1 text-xs text-slate-700">{note}</div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    open: { label: "Em aberto", className: "bg-amber-50 text-amber-700 border-amber-200" },
    partial: { label: "Parcial", className: "bg-blue-50 text-blue-700 border-blue-200" },
    received: { label: "Recebida", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    canceled: { label: "Cancelada", className: "bg-red-50 text-red-700 border-red-200" },
  };
  const item = map[status] || { label: status, className: "bg-slate-50 text-slate-700 border-slate-200" };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none ${item.className}`}>{item.label}</span>;
}

function ActionButton({ idleLabel, busyLabel, className, disabled = false }: { idleLabel: string; busyLabel: string; className: string; disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={disabled || pending} className={`inline-flex min-h-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-60 ${className}`}>
      {pending ? busyLabel : idleLabel}
    </button>
  );
}

function ToggleChevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
      <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RowActions({
  item,
  receiveAction,
  partialReceiveAction,
  cancelAction,
  reverseAction,
}: {
  item: ReceivableRow;
  receiveAction: (formData: FormData) => void | Promise<void>;
  partialReceiveAction: (formData: FormData) => void | Promise<void>;
  cancelAction: (formData: FormData) => void | Promise<void>;
  reverseAction: (formData: FormData) => void | Promise<void>;
}) {
  const remaining = Math.max(Number(item.amount || 0) - Number(item.received_amount || 0), 0);

  if (item.status === "received") {
    return (
      <div className="space-y-2 lg:max-w-[280px]">
        <p className="text-xs font-semibold text-emerald-700">Recebida</p>
        <form
          action={reverseAction}
          className="space-y-2"
          onSubmit={(event) => {
            const form = event.currentTarget;
            const input = form.elements.namedItem("reverse_reason") as HTMLInputElement | null;
            const reason = input?.value?.trim() || "";
            if (!reason) return;
            if (!window.confirm("Confirmar estorno desta conta recebida?")) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="receivable_id" value={item.id} />
          <input
            type="text"
            name="reverse_reason"
            required
            placeholder="Motivo do estorno"
            className="w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs outline-none"
          />
          <ActionButton
            idleLabel="Estornar conta"
            busyLabel="Estornando..."
            className="w-full rounded-xl border border-amber-300 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-50"
          />
        </form>
      </div>
    );
  }
  if (item.status === "canceled") return <span className="text-xs font-semibold text-red-700">Cancelada</span>;

  return (
    <div className="grid gap-3 xl:grid-cols-2 xl:items-start">
      <form
        action={receiveAction}
        onSubmit={(event) => {
          if (!window.confirm(`Confirmar recebimento total desta conta no valor de ${formatMoney(remaining)}?`)) {
            event.preventDefault();
          }
        }}
        className="xl:col-span-1"
      >
        <input type="hidden" name="receivable_id" value={item.id} />
        <ActionButton
          idleLabel="Receber total"
          busyLabel="Recebendo..."
          className="w-full rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
        />
      </form>

      <form
        action={partialReceiveAction}
        className="space-y-2 xl:col-span-1"
        onSubmit={(event) => {
          const form = event.currentTarget;
          const input = form.elements.namedItem("partial_amount") as HTMLInputElement | null;
          const raw = input?.value?.trim() || "";
          if (!raw) return;
          if (!window.confirm(`Confirmar recebimento parcial de ${formatMoney(Number(raw))} nesta conta?`)) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="receivable_id" value={item.id} />
        <input
          type="number"
          name="partial_amount"
          min="0.01"
          step="0.01"
          max={remaining.toFixed(2)}
          required
          placeholder="Valor parcial"
          className="w-full rounded-xl border border-black/10 bg-slate-50 px-3 py-2 text-xs outline-none"
        />
        <ActionButton
          idleLabel="Receber parcial"
          busyLabel="Recebendo..."
          className="w-full rounded-xl border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
        />
      </form>

      <form
        action={cancelAction}
        className="space-y-2 xl:col-span-2"
        onSubmit={(event) => {
          const form = event.currentTarget;
          const input = form.elements.namedItem("cancel_reason") as HTMLInputElement | null;
          const reason = input?.value?.trim() || "";
          if (!reason) return;
          if (!window.confirm("Confirmar cancelamento desta conta?")) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="receivable_id" value={item.id} />
        <input
          type="text"
          name="cancel_reason"
          required
          placeholder="Motivo do cancelamento"
          className="w-full rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs outline-none"
        />
        <ActionButton
          idleLabel="Cancelar conta"
          busyLabel="Cancelando..."
          className="w-full rounded-xl border border-red-300 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
        />
      </form>
    </div>
  );
}

export function ReceivablesTable({
  items,
  bulkAction,
  receiveAction,
  partialReceiveAction,
  cancelAction,
  reverseAction,
  histories,
  canManage = true,
}: {
  items: ReceivableRow[];
  bulkAction: (formData: FormData) => void | Promise<void>;
  receiveAction: (formData: FormData) => void | Promise<void>;
  partialReceiveAction: (formData: FormData) => void | Promise<void>;
  cancelAction: (formData: FormData) => void | Promise<void>;
  reverseAction: (formData: FormData) => void | Promise<void>;
  histories: Record<string, HistoryItem[]>;
  canManage?: boolean;
}) {
  const selectableIds = useMemo(() => canManage ? items.filter((item) => item.status === "open" || item.status === "partial").map((item) => item.id) : [], [items, canManage]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDesktopRow, setOpenDesktopRow] = useState<string | null>(null);
  const [openMobileRow, setOpenMobileRow] = useState<string | null>(null);

  const toggleId = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const selectAllVisible = () => setSelectedIds(selectableIds);
  const clearSelection = () => setSelectedIds([]);
  const selectedCount = selectedIds.length;

  return (
    <div className="space-y-4">
      {canManage ? (
      <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-900">Ação em lote</p>
          <p className="text-sm text-emerald-800">Selecione contas em aberto ou parciais para receber tudo de uma vez.</p>
          <p className="mt-1 text-xs font-medium text-emerald-700">
            {selectedCount > 0 ? `${selectedCount} conta(s) selecionada(s) para processamento.` : "Nenhuma conta selecionada no momento."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <button type="button" onClick={selectAllVisible} className="min-h-10 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">Selecionar visíveis</button>
          <button type="button" onClick={clearSelection} className="min-h-10 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">Limpar</button>
          <form
            action={bulkAction}
            onSubmit={(event) => {
              if (selectedCount === 0) {
                event.preventDefault();
                return;
              }
              if (!window.confirm(`Confirmar recebimento em lote de ${selectedCount} conta(s) selecionada(s)?`)) {
                event.preventDefault();
              }
            }}
          >
            {selectedIds.map((id) => <input key={id} type="hidden" name="receivable_ids" value={id} />)}
            <ActionButton
              idleLabel={`Receber selecionadas (${selectedCount})`}
              busyLabel="Processando lote..."
              disabled={selectedCount === 0}
              className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
            />
          </form>
        </div>
      </div>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-800">Nenhuma conta encontrada.</p>
          <p className="mt-1 text-sm text-slate-500">Ajuste os filtros ou cadastre um novo lançamento para começar.</p>
        </div>
      ) : null}

      <div className="space-y-3 lg:hidden">
        {items.map((item) => {
          const total = Number(item.amount || 0);
          const received = Number(item.received_amount || 0);
          const remaining = Math.max(total - received, 0);
          const canSelect = canManage && (item.status === "open" || item.status === "partial");
          const isSelected = selectedIds.includes(item.id);
          const isOpen = openMobileRow === item.id;

          return (
            <div key={item.id} className={`rounded-2xl border border-black/10 bg-white p-4 shadow-sm ${isSelected ? "ring-2 ring-emerald-200" : ""}`}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900">{item.description}</h3>
                  <p className="mt-1 text-xs text-slate-600">{item.customer_name || "Sem cliente"} • {item.unit_name}</p>
                </div>
                <div className="shrink-0"><StatusBadge status={item.status} /></div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-slate-500">Vencimento</div><div className="mt-1 font-semibold text-slate-900">{formatDate(item.due_date)}</div></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-slate-500">Valor total</div><div className="mt-1 font-semibold text-slate-900">{formatMoney(total)}</div></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-slate-500">Valor recebido</div><div className="mt-1 font-semibold text-slate-900">{formatMoney(received)}</div></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-slate-500">Saldo restante</div><div className="mt-1 font-semibold text-slate-900">{formatMoney(remaining)}</div></div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                {canSelect ? (
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <input type="checkbox" checked={isSelected} onChange={() => toggleId(item.id)} className="h-4 w-4 rounded border-black/20 text-emerald-600 focus:ring-emerald-500" />
                    Selecionar
                  </label>
                ) : <span />}
                <button
                  type="button"
                  onClick={() => setOpenMobileRow((current) => current === item.id ? null : item.id)}
                  className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Ações
                  <ToggleChevron open={isOpen} />
                </button>
              </div>

              {isOpen ? (
                <div className="mt-4 space-y-4 border-t border-black/10 pt-4">
                  <div><RowActions item={item} receiveAction={receiveAction} partialReceiveAction={partialReceiveAction} cancelAction={cancelAction} reverseAction={reverseAction} /></div>
                  <div><HistoryTimeline items={histories[item.id] || []} /></div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="hidden space-y-3 lg:block">
        {items.map((item) => {
          const total = Number(item.amount || 0);
          const received = Number(item.received_amount || 0);
          const remaining = Math.max(total - received, 0);
          const canSelect = canManage && (item.status === "open" || item.status === "partial");
          const isSelected = selectedIds.includes(item.id);
          const isOpen = openDesktopRow === item.id;

          return (
            <div key={item.id} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${isSelected ? "border-emerald-200 ring-1 ring-emerald-100" : "border-black/10"}`}>
              <div className="flex items-start gap-4 px-4 py-4 text-sm text-slate-700 xl:items-center">
                <div className="pt-1">
                  {canSelect ? <input type="checkbox" checked={isSelected} onChange={() => toggleId(item.id)} className="h-4 w-4 rounded border-black/20 text-emerald-600 focus:ring-emerald-500" /> : <span className="text-xs text-slate-300">—</span>}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4 xl:hidden">
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-slate-900">{item.description}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span>{item.customer_name || "Sem cliente"}</span>
                        <span>•</span>
                        <span>{item.unit_name}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <StatusBadge status={item.status} />
                      <button
                        type="button"
                        onClick={() => setOpenDesktopRow((current) => current === item.id ? null : item.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        Ações
                        <ToggleChevron open={isOpen} />
                      </button>
                    </div>
                  </div>

                  <div className="hidden xl:flex xl:items-start xl:justify-between xl:gap-6">
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-slate-900">{item.description}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span>{item.customer_name || "Sem cliente"}</span>
                        <span>•</span>
                        <span>{item.unit_name}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <StatusBadge status={item.status} />
                      <button
                        type="button"
                        onClick={() => setOpenDesktopRow((current) => current === item.id ? null : item.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        Ações
                        <ToggleChevron open={isOpen} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-4">
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">Vencimento</div>
                      <div className="mt-1 font-semibold text-slate-900">{formatDate(item.due_date)}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">Total</div>
                      <div className="mt-1 font-semibold text-slate-900">{formatMoney(total)}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">Recebido</div>
                      <div className="mt-1 font-semibold text-slate-900">{formatMoney(received)}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">Saldo</div>
                      <div className="mt-1 font-semibold text-slate-900">{formatMoney(remaining)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {isOpen ? (
                <div className="border-t border-black/10 bg-slate-50/70 px-4 py-3">
                  <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr),380px] xl:items-start">
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="rounded-xl border border-black/5 bg-white px-3 py-2"><span className="block text-[11px] uppercase tracking-[0.08em] text-slate-400">Cliente</span><span className="mt-1 block font-medium text-slate-800">{item.customer_name || "Sem cliente"}</span></div>
                      <div className="rounded-xl border border-black/5 bg-white px-3 py-2"><span className="block text-[11px] uppercase tracking-[0.08em] text-slate-400">Unidade</span><span className="mt-1 block font-medium text-slate-800">{item.unit_name}</span></div>
                      <div className="rounded-xl border border-black/5 bg-white px-3 py-2"><span className="block text-[11px] uppercase tracking-[0.08em] text-slate-400">Situação</span><span className="mt-1 block font-medium text-slate-800">{remaining > 0 ? `${formatMoney(remaining)} restante` : "Sem saldo restante"}</span></div>
                      <div className="rounded-xl border border-black/5 bg-white px-3 py-2"><span className="block text-[11px] uppercase tracking-[0.08em] text-slate-400">Conta</span><span className="mt-1 block font-medium text-slate-800">{formatMoney(total)} total</span></div>
                    </div>
                    <div className="rounded-2xl border border-black/5 bg-white p-3">
                      <RowActions
                        item={item}
                        receiveAction={receiveAction}
                        partialReceiveAction={partialReceiveAction}
                        cancelAction={cancelAction}
                        reverseAction={reverseAction}
                      />
                    </div>
                    <div className="xl:col-span-2">
                      <HistoryTimeline items={histories[item.id] || []} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
