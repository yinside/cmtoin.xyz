import Link from "next/link";
import { ArrowRight, BookOpen, Calculator } from "lucide-react";

interface GuideAsideProps {
  toolHref: string;
  toolLabel: string;
  toolDescription: string;
  relatedHref: string;
  relatedLabel: string;
  relatedDescription: string;
  quickFactLabel: string;
  quickFactValue: string;
}

export function GuideAside({
  toolHref,
  toolLabel,
  toolDescription,
  relatedHref,
  relatedLabel,
  relatedDescription,
  quickFactLabel,
  quickFactValue,
}: GuideAsideProps) {
  return (
    <>
      <div className="rounded-2xl border border-brand-100 bg-brand-50/80 p-5">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-brand-600" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
            Try the tool
          </p>
        </div>
        <p className="mt-3 text-sm font-semibold text-navy">{toolLabel}</p>
        <p className="mt-1.5 text-xs leading-5 text-slate-600">
          {toolDescription}
        </p>
        <Link
          href={toolHref}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Open the converter
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Quick fact
        </p>
        <p className="mt-2 text-xs text-slate-500">{quickFactLabel}</p>
        <p className="mt-1 text-lg font-bold tracking-[-0.02em] text-navy tabular-nums">
          {quickFactValue}
        </p>
      </div>

      <Link
        href={relatedHref}
        className="group block rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
      >
        <div className="flex items-center justify-between gap-3">
          <BookOpen className="h-4 w-4 text-brand-600" aria-hidden="true" />
          <ArrowRight
            className="h-4 w-4 text-slate-300 transition-colors group-hover:text-brand-600"
            aria-hidden="true"
          />
        </div>
        <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Keep reading
        </p>
        <p className="mt-1 text-sm font-semibold text-navy">{relatedLabel}</p>
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {relatedDescription}
        </p>
      </Link>
    </>
  );
}
