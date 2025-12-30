// src/components/seo/JsonLd.tsx
import React from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON-LD precisa ser string “crua”
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
