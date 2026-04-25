"use client";

import { useId, useState } from "react";

type PasswordInputProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
};

export default function PasswordInput({
  name = "password",
  label = "Senha",
  placeholder = "••••••••",
  autoComplete = "current-password",
  required = true,
  defaultValue,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = useId();

  return (
    <label className="block" htmlFor={inputId}>
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      <div className="relative mt-2">
        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          defaultValue={defaultValue}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-24 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-3 my-auto h-8 rounded-lg px-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </label>
  );
}
