"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import type { SaaSRole } from "@/types/saas";

function sanitizeText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

const allowedCreateRolesByCreator: Record<SaaSRole, SaaSRole[]> = {
  org_admin: [
    "org_admin_full",
    "manager_operational",
    "manager_financial",
    "manager_commercial",
    "operator",
    "viewer",
  ],
  org_admin_full: [
    "manager_operational",
    "manager_financial",
    "manager_commercial",
    "operator",
    "viewer",
  ],
  manager_operational: [],
  manager_financial: [],
  manager_commercial: [],
  operator: [],
  viewer: [],
  super_admin: [],
};

function buildTemporaryPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$!";
  let password = "Recicla@";
  for (let i = 0; i < 8; i += 1) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

async function sendInitialAccessEmail(params: {
  organizationName: string;
  userName: string;
  email: string;
  temporaryPassword: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return { sent: false as const, reason: "missing_env" as const };
  }

  const resend = new Resend(apiKey);
  const appUrl = `${getBaseUrl()}/app/login`;

  await resend.emails.send({
    from,
    to: params.email,
    subject: `Acesso inicial liberado — ${params.organizationName}`,
    html: `
      <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#0f172a">
        <h2 style="margin:0 0 16px">Acesso inicial liberado</h2>
        <p>Olá, <strong>${params.userName}</strong>.</p>
        <p>Seu acesso à Reciclativa Gestão foi liberado.</p>
        <div style="margin:16px 0;padding:16px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc">
          <p style="margin:0 0 8px"><strong>Login:</strong> ${params.email}</p>
          <p style="margin:0 0 8px"><strong>Senha provisória:</strong> ${params.temporaryPassword}</p>
          <p style="margin:0"><strong>Acesso:</strong> <a href="${appUrl}">${appUrl}</a></p>
        </div>
        <p>No primeiro acesso, você deverá trocar a senha e ativar o MFA.</p>
      </div>
    `,
  });

  return { sent: true as const };
}

async function getTargetUserForOrg(params: { organizationId: string; userId: string }) {
  const result = await sql<{
    id: string;
    email: string;
    role: SaaSRole;
    is_active: boolean;
    is_admin_master: boolean;
    name: string;
  }>`
    select
      su.id,
      su.email,
      su.role,
      su.is_active,
      su.name,
      exists(
        select 1
        from admin_master_users amu
        where lower(amu.email) = lower(su.email)
          and amu.is_active = true
      ) as is_admin_master
    from saas_users su
    where su.id = ${params.userId}
      and su.organization_id = ${params.organizationId}
    limit 1
  `;
  return result.rows[0] || null;
}

export async function createSaaSUserAction(formData: FormData) {
  const currentUser = await getCurrentSaaSUser();

  const name = sanitizeText(formData.get("name"));
  const email = sanitizeText(formData.get("email")).toLowerCase();
  const role = sanitizeText(formData.get("role")) as SaaSRole;
  const unitId = sanitizeText(formData.get("unit_id"));

  if (!name) throw new Error("O nome do usuário é obrigatório.");
  if (!email) throw new Error("O e-mail do usuário é obrigatório.");

  const allowedRoles = allowedCreateRolesByCreator[currentUser.role] || [];
  if (!allowedRoles.includes(role)) {
    throw new Error("Você não tem permissão para criar este perfil.");
  }

  const existing = await sql<{ id: string }>`
    select id
    from saas_users
    where organization_id = ${currentUser.organization.id}
      and lower(email) = ${email}
    limit 1
  `;
  if (existing.rows[0]) {
    throw new Error("Já existe um usuário com este e-mail nesta organização.");
  }

  const validUnitId = unitId || null;
  const temporaryPassword = buildTemporaryPassword();

  await sql`
    insert into saas_users (
      organization_id,
      unit_id,
      name,
      email,
      password_hash,
      role,
      is_active,
      must_change_password,
      mfa_enabled,
      mfa_recovery_codes
    ) values (
      ${currentUser.organization.id},
      ${validUnitId},
      ${name},
      ${email},
      crypt(${temporaryPassword}, gen_salt('bf')),
      ${role},
      true,
      true,
      false,
      '[]'::jsonb
    )
  `;

  await sql`
    insert into audit_logs (
      organization_id,
      user_id,
      module,
      action,
      entity_type,
      previous_data,
      new_data
    ) values (
      ${currentUser.organization.id},
      ${currentUser.id},
      'users',
      'create',
      'saas_users',
      null,
      ${JSON.stringify({
        name,
        email,
        role,
        unit_id: validUnitId,
        must_change_password: true,
        mfa_enabled: false,
      })}::jsonb
    )
  `;

  await sendInitialAccessEmail({
    organizationName: currentUser.organization.tradeName || currentUser.organization.legalName,
    userName: name,
    email,
    temporaryPassword,
  });

  revalidatePath("/app/cadastros/usuarios");
  redirect(
    `/app/cadastros/usuarios?created=ok&email=${encodeURIComponent(email)}&temp_password=${encodeURIComponent(temporaryPassword)}`
  );
}

export async function updateSaaSUserRoleAction(formData: FormData) {
  const currentUser = await getCurrentSaaSUser();
  const userId = sanitizeText(formData.get("user_id"));
  const nextRole = sanitizeText(formData.get("role")) as SaaSRole;

  if (!userId) throw new Error("Usuário inválido.");
  if (userId === currentUser.id) throw new Error("Você não pode alterar o próprio perfil.");

  const target = await getTargetUserForOrg({
    organizationId: currentUser.organization.id,
    userId,
  });

  if (!target) throw new Error("Usuário não encontrado nesta organização.");
  if (target.role === "org_admin" || target.is_admin_master) {
    throw new Error("O super admin não pode ter o perfil alterado aqui.");
  }

  const allowedRoles = allowedCreateRolesByCreator[currentUser.role] || [];
  if (!allowedRoles.includes(nextRole)) {
    throw new Error("Você não tem permissão para definir este perfil.");
  }

  if (currentUser.role !== "org_admin" && target.role === "org_admin_full") {
    throw new Error("Somente o super admin pode alterar outro admin full.");
  }

  await sql`
    update saas_users
    set role = ${nextRole}
    where id = ${userId}
      and organization_id = ${currentUser.organization.id}
  `;

  await sql`
    insert into audit_logs (
      organization_id,
      user_id,
      module,
      action,
      entity_type,
      previous_data,
      new_data
    ) values (
      ${currentUser.organization.id},
      ${currentUser.id},
      'users',
      'update',
      'saas_users',
      null,
      ${JSON.stringify({
        target_user_id: userId,
        role: nextRole,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/usuarios");
}

export async function resetSaaSUserPasswordAction(formData: FormData) {
  const currentUser = await getCurrentSaaSUser();
  const userId = sanitizeText(formData.get("user_id"));

  if (!userId) throw new Error("Usuário inválido.");
  if (userId === currentUser.id) throw new Error("Use a alteração normal de senha para o seu próprio acesso.");

  const target = await getTargetUserForOrg({
    organizationId: currentUser.organization.id,
    userId,
  });

  if (!target) throw new Error("Usuário não encontrado nesta organização.");
  if (target.role === "org_admin" || target.is_admin_master) {
    throw new Error("O super admin não pode ter a senha redefinida aqui.");
  }
  if (currentUser.role !== "org_admin" && target.role === "org_admin_full") {
    throw new Error("Somente o super admin pode redefinir a senha de um admin full.");
  }

  const temporaryPassword = buildTemporaryPassword();

  await sql`
    update saas_users
    set
      password_hash = crypt(${temporaryPassword}, gen_salt('bf')),
      must_change_password = true,
      mfa_enabled = false,
      mfa_secret_encrypted = null,
      mfa_recovery_codes = '[]'::jsonb
    where id = ${userId}
      and organization_id = ${currentUser.organization.id}
  `;

  await sql`
    insert into audit_logs (
      organization_id,
      user_id,
      module,
      action,
      entity_type,
      previous_data,
      new_data
    ) values (
      ${currentUser.organization.id},
      ${currentUser.id},
      'users',
      'update',
      'saas_users',
      null,
      ${JSON.stringify({
        target_user_id: userId,
        password_reset: true,
        must_change_password: true,
        mfa_enabled: false,
      })}::jsonb
    )
  `;

  await sendInitialAccessEmail({
    organizationName: currentUser.organization.tradeName || currentUser.organization.legalName,
    userName: target.name,
    email: target.email,
    temporaryPassword,
  });

  revalidatePath("/app/cadastros/usuarios");
  redirect(
    `/app/cadastros/usuarios?reset=ok&reset_email=${encodeURIComponent(target.email)}&reset_temp_password=${encodeURIComponent(temporaryPassword)}`
  );
}

export async function toggleSaaSUserStatusAction(formData: FormData) {
  const currentUser = await getCurrentSaaSUser();

  const userId = sanitizeText(formData.get("user_id"));
  const nextStatus = sanitizeText(formData.get("next_status"));

  if (!userId) throw new Error("Usuário inválido.");
  if (!["active", "inactive"].includes(nextStatus)) {
    throw new Error("Status inválido.");
  }
  if (userId === currentUser.id) {
    throw new Error("Você não pode inativar o próprio acesso.");
  }

  const target = await getTargetUserForOrg({
    organizationId: currentUser.organization.id,
    userId,
  });

  if (!target) throw new Error("Usuário não encontrado nesta organização.");
  if (target.role === "org_admin" || target.is_admin_master) {
    throw new Error("O super admin não pode ser inativado aqui.");
  }
  if (currentUser.role !== "org_admin" && target.role === "org_admin_full") {
    throw new Error("Somente o super admin pode inativar um admin full.");
  }

  const nextIsActive = nextStatus === "active";

  await sql`
    update saas_users
    set is_active = ${nextIsActive}
    where id = ${userId}
      and organization_id = ${currentUser.organization.id}
  `;

  await sql`
    insert into audit_logs (
      organization_id,
      user_id,
      module,
      action,
      entity_type,
      previous_data,
      new_data
    ) values (
      ${currentUser.organization.id},
      ${currentUser.id},
      'users',
      ${nextIsActive ? 'reactivate' : 'archive'},
      'saas_users',
      null,
      ${JSON.stringify({
        target_user_id: userId,
        is_active: nextIsActive,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/usuarios");
}
