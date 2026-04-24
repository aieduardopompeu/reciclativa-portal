import type { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";
import { requireAdminMasterReady } from "../../../../lib/admin-master-auth";

export const metadata: Metadata = {
  title: "Checklist AdSense — Reciclativa (Interno)",
  robots: { index: false, follow: false },
};

export default async function Page() {
  await requireAdminMasterReady("/admin/tools/adsense-checklist");
  return <ChecklistClient />;
}
