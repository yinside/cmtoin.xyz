import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ruler, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found on CMtoIN.",
  robots: {
    index: false,
    follow: true,
  },
};

const helpfulLinks = [
  {
    label: "CM to Inches Converter",
    href: "/cm-to-inches/",
    description: "The main length converter, with formula and examples.",
  },
  {
    label: "CM to Inches Chart",
    href: "/cm-to-inches-chart/",
    description: "A complete 1–300 cm reference table.",
  },
  {
    label: "Inches to CM Converter",
    href: "/inches-to-cm/",
    description: "Convert in the opposite direction.",
  },
  {
    label: "Measurement Guides",
    href: "/guides/",
    description: "Plain-English explanations of the math.",
  },
];

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 ruler-grid opacity-50"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Ruler className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
          Error 404
        </p>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-[-0.04em] text-navy sm:text-5xl">
          That page could not be found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-slate-600">
          The link may be old, mistyped, or pointing to a page that has moved.
          The converters and charts below are a good place to pick up again.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/cm-to-inches/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Open the converter
          </Link>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          {helpfulLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-navy">
                  {link.label}
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 text-slate-300 group-hover:text-brand-600"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {link.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
