import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ConversionCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  meta?: string;
}

export function ConversionCard({
  title,
  description,
  href,
  icon: Icon,
  meta,
}: ConversionCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600 transition-colors group-hover:border-brand-200 group-hover:bg-brand-100">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600"
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-[-0.01em] text-navy">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {description}
      </p>
      {meta ? (
        <p className="mt-4 text-xs font-medium text-slate-500">{meta}</p>
      ) : null}
    </Link>
  );
}
