import Link from "next/link";
import { ArrowRight, TableProperties } from "lucide-react";

export interface QuickReferenceRow {
  label: string;
  value: string;
}

interface QuickReferenceProps {
  rows: QuickReferenceRow[];
  formula: string;
  formulaNote: string;
  chartHref: string;
  chartLabel?: string;
  chartDescription?: string;
}

export function QuickReference({
  rows,
  formula,
  formulaNote,
  chartHref,
  chartLabel = "View the full chart",
  chartDescription = "A complete reference table you can scan in seconds.",
}: QuickReferenceProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-700">
          Quick reference
        </p>
        <dl className="mt-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 border-b border-slate-100 py-2.5 last:border-b-0 last:pb-0 first:pt-0"
            >
              <dt className="text-sm text-slate-600">{row.label}</dt>
              <dd className="text-right text-sm font-semibold text-navy tabular-nums">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border border-brand-100 bg-brand-50/80 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-700">
          Formula
        </p>
        <p className="mt-2 text-base font-semibold leading-6 tracking-[-0.01em] text-navy tabular-nums">
          {formula}
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-600">{formulaNote}</p>
      </div>

      <Link
        href={chartHref}
        className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-200 hover:bg-brand-50/40"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <TableProperties className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-navy">
            {chartLabel}
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">
            {chartDescription}
          </span>
        </span>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-600"
          aria-hidden="true"
        />
      </Link>
    </aside>
  );
}
