import { ArrowRight } from "lucide-react";

interface FormulaCardProps {
  title: string;
  equation: string;
  description: string;
  example: string;
  className?: string;
}

export function FormulaCard({
  title,
  equation,
  description,
  example,
  className = "",
}: FormulaCardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
        {title}
      </p>
      <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3.5 text-base font-semibold tracking-[-0.01em] text-navy tabular-nums sm:text-lg">
        {equation}
      </p>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-700">
        <ArrowRight
          className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-500"
          aria-hidden="true"
        />
        <span>{example}</span>
      </p>
    </div>
  );
}
