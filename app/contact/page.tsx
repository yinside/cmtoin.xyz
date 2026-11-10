import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout } from "@/components/PageLayout";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const pagePath = "/contact/";
const pageTitle = "Contact CMtoIN";
const pageDescription =
  "Contact CMtoIN by email with questions, correction requests, or feedback about the conversion tools, charts, and guides.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

export default function ContactPage() {
  return (
    <PageLayout
      eyebrow="Contact"
      title={pageTitle}
      description="Questions about a conversion, a correction, or feedback on the site? Email is the best way to reach CMtoIN."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact", href: pagePath },
      ]}
    >
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          description: pageDescription,
          path: pagePath,
        })}
      />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.13em] text-brand-700">
              Email
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-navy">
              {SITE.email}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">
              Send questions, correction requests, or general feedback to this
              address. A direct email link is used instead of a form, so your
              message goes straight to the inbox.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=CMtoIN%20inquiry`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email CMtoIN
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <div className="mt-7 border-t border-slate-100 pt-5">
              <p className="text-sm font-semibold text-navy">
                Helpful details to include
              </p>
              <ul className="mt-3 space-y-2.5">
                {[
                  "The page URL or name of the converter.",
                  "The value and units you entered, if the question is about a specific conversion.",
                  "The result you expected and the result you received, for a correction request.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              href="/about/"
              className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
            >
              About CMtoIN
            </Link>
            <Link
              href="/privacy-policy/"
              className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="/disclaimer/"
              className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
            >
              Disclaimer
            </Link>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="flex items-center gap-2">
              <MessageSquare
                className="h-4 w-4 text-brand-600"
                aria-hidden="true"
              />
              <h2 className="text-sm font-semibold text-navy">
                Before you send
              </h2>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              For a conversion question, the answer may already be on the
              relevant converter page. Each page includes the formula, worked
              examples, and a list of common questions.
            </p>
            <div className="mt-4 grid gap-2">
              <Link
                href="/cm-to-inches/"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-brand-200 hover:text-brand-700"
              >
                Centimeters to inches
              </Link>
              <Link
                href="/inches-to-cm/"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-brand-200 hover:text-brand-700"
              >
                Inches to centimeters
              </Link>
              <Link
                href="/cm-to-inches-chart/"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-brand-200 hover:text-brand-700"
              >
                Full 1–300 cm chart
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck
                className="h-4 w-4 text-brand-600"
                aria-hidden="true"
              />
              <h2 className="text-sm font-semibold text-navy">
                Privacy questions
              </h2>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              For a privacy-related question, include &ldquo;Privacy&rdquo; in
              the subject line. See the{" "}
              <Link
                href="/privacy-policy/"
                className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2"
              >
                privacy policy
              </Link>{" "}
              for the current template.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">
              Note
            </p>
            <p className="mt-2 text-sm leading-7 text-amber-900/80">
              CMtoIN is an independent website. There is no phone support and no
              public office address. Email is the only contact channel.
            </p>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
