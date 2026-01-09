import type { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";

export const metadata: Metadata = {
  title: "Checklist AdSense — Reciclativa (Interno)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ChecklistClient />;
}
