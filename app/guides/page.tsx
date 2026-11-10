import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Ruler,
  TableProperties,
  MoveVertical,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout, SectionHeading } from "@/components/PageLayout";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { GUIDE_LINKS } from "@/lib/site";

const pagePath = "/guides/";
const pageTitle = "Measurement Conversion Guides";
const pageDescription =
  "Practical guides to converting centimeters, inches, feet, and other length units. Learn the formulas, avoid common mistakes, and choose the right converter.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const guides = [
  {
    ...GUIDE_LINKS[0],
    icon: Ruler,
    topics: ["The exact formula", "Worked examples", "Mental math shortcut"],
  },
  {
    ...GUIDE_LINKS[1],
    icon: MoveVertical,
    topics: ["The two-step method", "Height examples", "Rounding rules"],
  },
  {
    ...GUIDE_LINKS[2],
    icon: BookOpen,
    topics: ["Unit definitions", "Where each is used", "How to choose"],
  },
];

export default function GuidesPage() {
  return (
    <PageLayout
      eyebrow="Guides"
      title={pageTitle}
      description="Clear explanations of the conversions people use most, written for readers who want to understand the result — not just copy it."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Guides", href: pagePath },
      ]}
    >
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          description: pageDescription,
          path: pagePath,
        })}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {guides.map((guide, index) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span
                  className="text-3xl font-bold tracking-tighter text-slate-100"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-navy">
                {guide.label}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {guide.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                {guide.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-center gap-2 text-xs text-slate-500"
                  >
                    <span
                      className="h-1 w-1 rounded-full bg-brand-400"
                      aria-hidden="true"
                    />
                    {topic}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Read the guide
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>

      <section className="mt-16 sm:mt-20" aria-labelledby="approach-heading">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="How to use them"
              title="Learn the why, then use the tool"
              description="Each guide pairs the underlying math with a calculator, so you can check your understanding against a real result."
              id="approach-heading"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Start with the formula",
                text: "Every guide explains the exact relationship between the units before showing examples.",
              },
              {
                title: "Check a worked example",
                text: "Numbers make the method concrete. Each guide includes common values such as 180 cm or 12 inches.",
              },
              {
                title: "Watch the rounding",
                text: "Decimal inches and feet-and-inches results are rounded differently. The guides show where that matters.",
              },
              {
                title: "Use the right tool",
                text: "Each guide links to the matching converter and chart so you can move from explanation to result quickly.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-brand-100 bg-brand-50/70 p-6 sm:mt-20 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-navy sm:text-2xl">
              Need the answer now?
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Open a calculator for an instant result, or scan the full
              centimeter-to-inch chart without reading a word.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cm-to-inches/"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              <TableProperties className="h-4 w-4" aria-hidden="true" />
              Open the converter
            </Link>
            <Link
              href="/cm-to-inches-chart/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-200 hover:text-brand-700"
            >
              View the chart
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
