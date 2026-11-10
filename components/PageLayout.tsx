import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/schema";

interface PageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  /** Optional compact row under the intro, e.g. quick facts. */
  introExtra?: ReactNode;
}

export function PageLayout({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  introExtra,
}: PageLayoutProps) {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50/70">
        <div
          className="pointer-events-none absolute inset-0 ruler-grid opacity-70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-7 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-7 max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span
                className="h-px w-7 bg-brand-400"
                aria-hidden="true"
              />
              {eyebrow}
            </p>
            <h1 className="mt-3 text-balance text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-navy sm:text-[2.65rem] lg:text-[3.15rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {description}
            </p>
            {introExtra ? <div className="mt-6">{introExtra}</div> : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {children}
      </div>
    </main>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  action,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-4 ${
        centered
          ? "items-center text-center"
          : action
            ? "sm:flex-row sm:items-end sm:justify-between"
            : ""
      } ${className}`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <p
            className={`text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 ${
              centered ? "" : "flex items-center gap-2"
            }`}
          >
            {!centered ? (
              <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
            ) : null}
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={id}
          className={`text-balance text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem] ${
            eyebrow ? "mt-2.5" : ""
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-pretty text-[0.95rem] leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          {action.label}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
