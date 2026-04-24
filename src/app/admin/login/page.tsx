import { redirect } from "next/navigation";

type SearchParamsShape = {
  next?: string;
  error?: string;
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

export default async function AdminLoginRedirectPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const qs = new URLSearchParams();

  if (sp.next) qs.set("next", sp.next);
  if (sp.error) qs.set("error", sp.error);

  redirect(`/admin-login${qs.toString() ? `?${qs.toString()}` : ""}`);
}