type SaaSReadOnlyNoticeProps = {
  title?: string;
  description?: string;
};

export default function SaaSReadOnlyNotice({
  title = "Acesso somente leitura",
  description = "Seu perfil permite consultar este módulo, mas não permite criar, editar, cancelar ou executar ações operacionais.",
}: SaaSReadOnlyNoticeProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-amber-800">{description}</p>
    </div>
  );
}
