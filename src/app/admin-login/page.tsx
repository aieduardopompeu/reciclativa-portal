import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParamsShape = {
  next?: string;
  error?: string;
  email?: string;
};

async function resolveSearchParams(
  value?: SearchParamsShape | Promise<SearchParamsShape>
): Promise<SearchParamsShape> {
  if (!value) return {};
  if (typeof (value as Promise<SearchParamsShape>).then === "function") {
    return (await value) ?? {};
  }
  return value;
}

export default async function AdminLoginLegacyPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const qs = new URLSearchParams();
  qs.set("next", sp.next || "/admin");
  if (sp.error) qs.set("error", sp.error);
  if (sp.email) qs.set("email", sp.email);
  redirect(`/login?${qs.toString()}`);
}
