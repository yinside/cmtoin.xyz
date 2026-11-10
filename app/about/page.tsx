import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleCheck,
  Globe,
  Mail,
  Scale,
  Target,
  Zap,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout } from "@/components/PageLayout";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const pagePath = "/about/";
const pageTitle = "About CMtoIN";
const pageDescription =
  "CMtoIN is an independent measurement conversion tool offering fast, accurate length converters, charts, and guides. Learn how it works and what it focuses on.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const principles = [
  {
    title: "Accuracy first",
    description:
      "Conversions use exact definitions, including 1 inch = 2.54 centimeters and 1 foot = 30.48 centimeters. The displayed precision is clear, and the underlying math is not approximated.",
    icon: Target,
  },
  {
    title: "Fast by default",
    description:
      "Pages are built for quick loading, and the calculators run directly in your browser. There is no account, no download, and no unnecessary step between a value and its result.",
    icon: Zap,
  },
  {
    title: "Clear explanations",
    description:
      "Every converter includes the formula and context, so you can check the result and understand where it came from. Charts and guides cover the questions that come up most often.",
    icon: Scale,
  },
];

export default function AboutPage() {
  return (
    <PageLayout
      eyebrow="About"
      title={pageTitle}
      description="An independent, focused tool for converting measurements — built to give a clear answer quickly and explain the math behind it."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: pagePath },
      ]}
    >
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          description: pageDescription,
          path: pagePath,
        })}
      />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="prose-cm max-w-3xl text-[0.95rem]">
          <p className="text-lg leading-8 text-slate-700">
            CMtoIN is an independent measurement conversion tool built around a
            simple idea: a unit conversion should be fast, accurate, and easy
            to understand.
          </p>
          <p>
            The site focuses on length conversions between the metric and
            imperial systems, especially centimeters and inches. It also
            includes feet, millimeters, and meters, along with broader reference
            charts and practical guides. The interface is intentionally
            narrow: enter a value, get a result, and find the explanation you
            need without working through a cluttered page.
          </p>
          <p>
            CMtoIN is not affiliated with any standards organization,
            government body, or measurement authority. It is an independent
            reference tool. The conversion factors it uses are public,
            established definitions; the site&apos;s contribution is presenting
            them clearly and applying them consistently.
          </p>

          <h2>How the calculators work</h2>
          <p>
            All calculations run in your browser. The calculators use a shared
            conversion engine based on each unit&apos;s exact relationship to
            the meter. That means the same logic powers centimeters to inches,
            inches to centimeters, centimeters to feet, millimeters to inches,
            and meters to feet. The values you enter are not submitted to a
            server by the calculator.
          </p>
          <p>
            Results are shown to four decimal places by default, with trailing
            zeros removed for readability. The underlying calculation is not
            limited to those four places; the display is simply rounded for
            clarity. When a measurement is too small to display at that
            precision, the calculator says so rather than implying the value is
            exactly zero.
          </p>

          <h2>What you will find here</h2>
          <ul>
            <li>
              Dedicated converters for the most common length conversions, each
              with a working calculator and the relevant formula.
            </li>
            <li>
              A complete{" "}
              <Link href="/cm-to-inches-chart/">
                centimeter to inches chart
              </Link>{" "}
              covering 1 through 300 cm.
            </li>
            <li>
              <Link href="/guides/">Guides</Link> that explain the units,
              worked examples, rounding, and common mistakes.
            </li>
            <li>
              Consistent layouts so the calculator, chart, and related tools are
              easy to find on desktop and mobile.
            </li>
          </ul>

          <h2>Editorial approach</h2>
          <p>
            Content on CMtoIN is written in plain American English and checked
            against the mathematical definitions it describes. The site does not
            publish customer testimonials, ratings, or popularity statistics,
            because those claims are not needed to judge a conversion tool. If
            you spot an error, a correction is welcome.
          </p>

          <h2>Supporting the site</h2>
          <p>
            CMtoIN is free to use. Hosting may eventually be supported by
            advertising, and ad placements are designed to stay separate from
            the calculator controls. Advertising is not required to use any
            tool on the site.
          </p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-700">
              At a glance
            </p>
            <dl className="mt-4 space-y-3">
              {[
                ["Type", "Independent conversion tool"],
                ["Cost", "Free to use"],
                ["Account", "Not required"],
                ["Core units", "cm, in, ft, mm, m"],
                ["Precision", "Up to 4 decimal places"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                >
                  <dt className="text-xs text-slate-500">{label}</dt>
                  <dd className="text-right text-xs font-semibold text-navy">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-brand-600" aria-hidden="true" />
              <p className="text-sm font-semibold text-navy">
                Built for international use
              </p>
            </div>
            <p className="mt-2 text-xs leading-6 text-slate-600">
              Measurements are universal, even when the units are not. CMtoIN
              is designed for anyone comparing metric and imperial lengths.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-navy">Get in touch</p>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Questions, corrections, and suggestions are welcome.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {SITE.email}
            </a>
            <Link
              href="/contact/"
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800"
            >
              Contact page
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <CircleCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
              aria-hidden="true"
            />
            <p className="text-xs leading-5 text-slate-600">
              No account, no sign-up, and no personal details required to use a
              calculator.
            </p>
          </div>
        </aside>
      </div>

      <section
        className="mt-16 border-t border-slate-200 pt-12 sm:mt-20 sm:pt-14"
        aria-labelledby="principles-heading"
      >
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
            <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
            What guides the site
          </p>
          <h2
            id="principles-heading"
            className="text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]"
          >
            Three priorities, no detours
          </h2>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3 lg:gap-5">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
