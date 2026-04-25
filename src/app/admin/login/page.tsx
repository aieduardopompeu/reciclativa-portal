import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AdminLoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

function safeAdminNextPath(nextRaw?: string) {
  const next = (nextRaw || "").trim();
  return next.startsWith("/admin") ? next : "/admin";
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const next = safeAdminNextPath(params?.next);

  redirect(`/login?next=${encodeURIComponent(next)}`);
}
