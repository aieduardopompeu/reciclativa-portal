"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrazilStatesMap from "./BrazilStatesMap";

type Props = {
  ufs: string[];
};

export default function ProfissionaisStatePicker({ ufs }: Props) {
  const router = useRouter();

  function goToUF(uf: string) {
    if (!uf) return;
    router.push(`/profissionais/${uf.toLowerCase()}`);
  }

  return (
    <div className="mt-6">
      <div className="max-w-[560px]">
        <BrazilStatesMap
          value=""
          onSelect={(uf: string) => {
            if (!uf) return;
            goToUF(uf);
          }}
        />
      </div>
    </div>
  );
}
