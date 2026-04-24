"use client";

import { useMemo, useState } from "react";

type CompanyLookup = {
  cnpj: string;
  cnpjDigits: string;
  legalName: string;
  tradeName: string;
  taxStatus: string;
  openedAt: string;
  mainActivity: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

const modules = [
  { value: "operation", label: "Operacao", helper: "Entradas, saidas e rotina operacional" },
  { value: "inventory", label: "Estoque", helper: "Saldos por material, unidade e local" },
  { value: "finance", label: "Financeiro", helper: "Contas a pagar, receber e vencimentos" },
  { value: "customers_suppliers", label: "Clientes e fornecedores", helper: "Base comercial e operacional organizada" },
  { value: "reports", label: "Relatorios", helper: "Indicadores para acompanhar a empresa" },
  { value: "multiunit", label: "Multiunidade", helper: "Filiais, patios e operacoes separadas" },
];

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCnpj(value: string) {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 min-h-6 text-sm font-semibold text-slate-950">{value || "Nao informado"}</p>
    </div>
  );
}

function ModuleOption({ value, label, helper }: { value: string; label: string; helper: string }) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-emerald-300 hover:bg-emerald-50/40">
      <input
        type="checkbox"
        name="expected_modules"
        value={value}
        defaultChecked={value === "operation" || value === "finance"}
        className="mt-1 h-4 w-4 accent-emerald-700"
      />
      <span>
        <span className="block text-sm font-bold text-slate-950">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-600">{helper}</span>
      </span>
    </label>
  );
}

export default function CompanySignupForm({ ok, error }: { ok: boolean; error: string }) {
  const [cnpj, setCnpj] = useState("");
  const [company, setCompany] = useState<CompanyLookup | null>(null);
  const [lookupMessage, setLookupMessage] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [manualMode, setManualMode] = useState(false);

  const cnpjDigits = useMemo(() => onlyDigits(cnpj), [cnpj]);
  const canSubmit = manualMode || Boolean(company?.cnpjDigits && company.cnpjDigits === cnpjDigits);

  async function lookupCnpj() {
    setLookupMessage("");
    setCompany(null);
    setManualMode(false);

    if (cnpjDigits.length !== 14) {
      setLookupMessage("Informe um CNPJ com 14 digitos para buscar os dados oficiais.");
      return;
    }

    setIsLookingUp(true);

    try {
      const response = await fetch(`/api/app/cnpj/${cnpjDigits}`);
      const data = await response.json().catch(() => null);

      if (!data?.ok) {
        if (data?.manualAllowed && data?.company?.cnpjDigits) {
          setManualMode(true);
          setCompany(data.company as CompanyLookup);
          setLookupMessage(data.message || "Voce pode continuar para analise manual.");
          return;
        }

        setLookupMessage(data?.message || "Nao foi possivel consultar este CNPJ agora.");
        return;
      }

      setCompany(data.company as CompanyLookup);
      setLookupMessage("Dados oficiais encontrados. Confira e complete o cadastro abaixo.");
    } catch {
      setLookupMessage("Falha ao consultar o CNPJ. Tente novamente em instantes.");
    } finally {
      setIsLookingUp(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Cadastro de empresa</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Cadastre sua empresa para acessar a Reciclativa Gestao
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          Comece pelo CNPJ. A consulta preenche os dados oficiais da empresa e eles ficam travados para analise do admin master.
        </p>
      </div>

      {ok ? (
        <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-5 text-emerald-950">
          <p className="text-lg font-bold">Cadastro enviado para analise.</p>
          <p className="mt-2 text-sm leading-6">
            O admin master vai revisar os dados. Se aprovado, a empresa recebe uma senha provisoria para o primeiro acesso.
          </p>
        </div>
      ) : null}

      {!ok && error ? (
        <div className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-5 text-red-900">
          <p className="text-lg font-bold">Nao foi possivel enviar o cadastro.</p>
          <p className="mt-2 text-sm leading-6">{error}</p>
        </div>
      ) : null}

      <form action="/api/app/signup" method="POST" className="mt-8 space-y-8">
        <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" />

        {!manualMode && company ? (
          <>
            <input type="hidden" name="legal_name" value={company.legalName || ""} />
            <input type="hidden" name="trade_name" value={company.tradeName || ""} />
            <input type="hidden" name="tax_status" value={company.taxStatus || ""} />
            <input type="hidden" name="opened_at" value={company.openedAt || ""} />
            <input type="hidden" name="main_activity" value={company.mainActivity || ""} />
            <input type="hidden" name="official_email" value={company.email || ""} />
            <input type="hidden" name="official_phone" value={company.phone || ""} />
            <input type="hidden" name="official_street" value={company.address?.street || ""} />
            <input type="hidden" name="official_number" value={company.address?.number || ""} />
            <input type="hidden" name="official_complement" value={company.address?.complement || ""} />
            <input type="hidden" name="official_district" value={company.address?.district || ""} />
            <input type="hidden" name="official_city" value={company.address?.city || ""} />
            <input type="hidden" name="official_state" value={company.address?.state || ""} />
            <input type="hidden" name="official_zip_code" value={company.address?.zipCode || ""} />
          </>
        ) : null}

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <label htmlFor="cnpj" className="mb-2 block text-sm font-bold text-slate-950">CNPJ*</label>
            <input
              id="cnpj"
              name="cnpj"
              type="text"
              value={cnpj}
              onChange={(event) => {
                setCnpj(formatCnpj(event.target.value));
                setCompany(null);
    setManualMode(false);
                setLookupMessage("");
              }}
              inputMode="numeric"
              maxLength={18}
              required
              placeholder="00.000.000/0000-00"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
            <button
              type="button"
              onClick={lookupCnpj}
              disabled={isLookingUp}
              className="mt-3 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLookingUp ? "Buscando..." : "Buscar dados do CNPJ"}
            </button>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
            <p>
              Comece pelo CNPJ para preencher automaticamente razao social, situacao cadastral e endereco oficial.
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              Esses dados nao podem ser alterados no cadastro.
            </p>
          </div>
        </section>

        {lookupMessage ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {lookupMessage}
          </div>
        ) : null}

        {company && !manualMode ? (
          <section className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Dados oficiais encontrados</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">{company.legalName}</h2>
              </div>
              <span className="w-fit rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-bold text-emerald-800">
                {company.taxStatus || "CNPJ consultado"}
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <Field label="CNPJ" value={company.cnpj} />
              <Field label="Nome fantasia" value={company.tradeName} />
              <Field label="Abertura" value={company.openedAt} />
              <Field label="Atividade principal" value={company.mainActivity} />
              <Field label="Cidade/UF oficial" value={[company.address.city, company.address.state].filter(Boolean).join(" / ")} />
              <Field label="Endereco oficial" value={[company.address.street, company.address.number, company.address.district].filter(Boolean).join(", ")} />
            </div>
          </section>
        ) : null}

        <section key={`${company?.cnpjDigits || "empty-company"}-${manualMode ? "manual" : "lookup"}`} className={canSubmit ? "space-y-6" : "pointer-events-none space-y-6 opacity-45"}>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-950">Complete os dados obrigatorios</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Estes dados serao usados pelo admin master para analisar a empresa e criar o primeiro acesso se o cadastro for aprovado.
            </p>
          </div>

          {manualMode ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <label htmlFor="legal_name" className="mb-2 block text-sm font-bold text-slate-950">Razao social*</label>
              <input id="legal_name" name="legal_name" required placeholder="Razao social da empresa" className="w-full rounded-2xl border border-amber-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
              <p className="mt-2 text-xs leading-5 text-amber-900">Como a consulta automatica nao retornou os dados oficiais, o admin master vai validar esta informacao manualmente.</p>
            </div>
          ) : null}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="responsible_name" className="mb-2 block text-sm font-bold text-slate-950">Responsavel*</label>
              <input id="responsible_name" name="responsible_name" required disabled={!canSubmit} placeholder="Nome do responsavel" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>
            <div>
              <label htmlFor="responsible_email" className="mb-2 block text-sm font-bold text-slate-950">E-mail de acesso*</label>
              <input id="responsible_email" name="responsible_email" type="email" required disabled={!canSubmit} placeholder="voce@empresa.com" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>
            <div>
              <label htmlFor="responsible_whatsapp" className="mb-2 block text-sm font-bold text-slate-950">WhatsApp*</label>
              <input id="responsible_whatsapp" name="responsible_whatsapp" required disabled={!canSubmit} placeholder="DDD + numero" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>
            <div>
              <label htmlFor="operation_type" className="mb-2 block text-sm font-bold text-slate-950">Tipo de operacao*</label>
              <select id="operation_type" name="operation_type" required disabled={!canSubmit} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                <option value="">Selecione</option>
                <option value="reciclagem">Reciclagem</option>
                <option value="gestao_residuos">Gestao de residuos</option>
                <option value="cooperativa">Cooperativa</option>
                <option value="industria">Industria</option>
                <option value="comercio_servicos">Comercio ou servicos</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor="operational_city" className="mb-2 block text-sm font-bold text-slate-950">Cidade operacional*</label>
              <input id="operational_city" name="operational_city" required disabled={!canSubmit} placeholder="Cidade principal" defaultValue={company?.address?.city || ""} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>
            <div>
              <label htmlFor="operational_state" className="mb-2 block text-sm font-bold text-slate-950">UF operacional*</label>
              <input id="operational_state" name="operational_state" required disabled={!canSubmit} maxLength={2} placeholder="SP" defaultValue={company?.address?.state || ""} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 uppercase text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-950">Quais modulos sua empresa pretende usar?</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {modules.map((module) => <ModuleOption key={module.value} {...module} />)}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-950">Mensagem opcional</label>
            <textarea id="message" name="message" rows={5} disabled={!canSubmit} placeholder="Conte rapidamente o que sua empresa quer organizar na Reciclativa Gestao." className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
          </div>
        </section>

        <div className="border-t border-slate-200 pt-6">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Enviar cadastro para analise
          </button>
          <p className="mt-3 max-w-3xl text-xs leading-5 text-slate-600">
            O envio nao libera acesso imediato. Aprovado o cadastro, o admin master cria a empresa e envia uma senha provisoria para o primeiro acesso.
          </p>
        </div>
      </form>
    </div>
  );
}




