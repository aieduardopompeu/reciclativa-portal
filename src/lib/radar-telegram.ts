// src/lib/radar-telegram.ts
//
// Envio da notificação de aprovação do Radar Ambiental via Telegram Bot API.
// Sem verificação de empresa, sem risco de bloqueio de conta — só um bot
// (criado via @BotFather) e um chat_id. Enquanto RADAR_TELEGRAM_BOT_TOKEN /
// RADAR_TELEGRAM_CHAT_ID não estiverem definidos, a mensagem só é logada
// (nada quebra e nada some — é só plugar as credenciais depois).
import { RADAR_TAG_META, type RadarTag } from "@/lib/radar";

type RadarApprovalMessageInput = {
  id: number;
  titulo: string;
  resumo: string;
  tag: RadarTag;
  cidade_uf: string | null;
  relevancia: number;
  token_aprovacao: string;
};

type SendResult = { ok: boolean; skipped?: boolean; error?: string };

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.reciclativa.com").replace(/\/+$/, "");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildApprovalMessage(n: RadarApprovalMessageInput): string {
  const tagLabel = RADAR_TAG_META[n.tag]?.label ?? n.tag;
  const alerta =
    n.relevancia === 5
      ? "🚨 <b>ATENÇÃO — Relevância máxima. Ação recomendada em até 2h.</b>\n\n"
      : "";
  const base = siteUrl();

  return `${alerta}🟢 <b>RADAR AMBIENTAL — Nova matéria para aprovação</b>

📰 <b>Título:</b> ${escapeHtml(n.titulo)}
🏷 <b>Tag:</b> ${escapeHtml(tagLabel)}
📍 <b>Local:</b> ${escapeHtml(n.cidade_uf ?? "Não informado")}
⭐ <b>Relevância:</b> ${n.relevancia}/5
📋 <b>Resumo:</b>
${escapeHtml(n.resumo)}
---
✅ APROVAR: ${base}/api/radar/aprovar/${n.token_aprovacao}
❌ REJEITAR: ${base}/api/radar/rejeitar/${n.token_aprovacao}
👁 VER COMPLETO: ${base}/admin/radar/${n.id}`;
}

export async function sendRadarApprovalTelegram(
  noticia: RadarApprovalMessageInput
): Promise<SendResult> {
  const message = buildApprovalMessage(noticia);

  const botToken = process.env.RADAR_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.RADAR_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log(
      "[radar/telegram] Bot do Telegram não configurado — mensagem não enviada:\n" + message
    );
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[radar/telegram] Falha ao enviar via Telegram Bot API", res.status, errText);
      return { ok: false, error: errText };
    }

    return { ok: true };
  } catch (err) {
    console.error("[radar/telegram] Erro de rede ao enviar Telegram", err);
    return { ok: false, error: String(err) };
  }
}
