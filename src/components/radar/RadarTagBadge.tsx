import { RADAR_TAG_META, type RadarTag } from "@/lib/radar";

export function RadarTagBadge({
  tag,
  className = "",
}: {
  tag: RadarTag;
  className?: string;
}) {
  const meta = RADAR_TAG_META[tag];
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${className}`}
      style={{ backgroundColor: meta.bg, color: meta.text }}
    >
      {meta.label}
    </span>
  );
}
