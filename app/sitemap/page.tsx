import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe, TableProperties } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout } from "@/components/PageLayout";
import { SITEMAP_GROUPS, SITEMAP_ROUTES } from "@/lib/site-map";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const pagePath = "/sitemap/";
const pageTitle = "Sitemap";
const pageDescription =
  "Browse every page on CMtoIN: length converters, the 1–300 cm chart, measurement guides, site information, and legal pages.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

export default function SitemapPage() {
  return (
    <PageLayout
      eyebrow="Index"
      title={pageTitle}
      description={`Every converter, chart, guide, and information page in one place — ${SITEMAP_ROUTES.length} pages in total.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sitemap", href: pagePath },
      ]}
    >
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          description: pageDescription,
          path: pagePath,
        })}
      />

      <section className="rounded-3xl border border-brand-100 bg-brand-50/70 p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <Globe
                className="h-4 w-4 text-brand-600"
                aria-hidden="true"
              />
              <h2 className="text-base font-semibold text-navy">
                For search engines
              </h2>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              The XML version of this sitemap is generated at{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-xs text-slate-700">
                /sitemap.xml
              </code>{" "}
              and referenced in{" "}
              <a
                href="/robots.txt"
                className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4"
              >
                robots.txt
              </a>
              . Submit the XML URL in Google Search Console to help search
              engines discover the site&apos;s pages.
            </p>
          </div>
          <a
            href="/sitemap.xml"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            <TableProperties className="h-4 w-4" aria-hidden="true" />
            Open sitemap.xml
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SITEMAP_GROUPS.map((group, index) => (
          <section key={group.title} aria-labelledby={`group-${index}`}>
            <h2
              id={`group-${index}`}
              className="border-b border-slate-200 pb-3 text-lg font-bold tracking-[-0.02em] text-navy"
            >
              {group.title}
            </h2>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              {group.description}
            </p>
            <ul className="mt-4 divide-y divide-slate-100">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-start justify-between gap-4 py-3.5 transition-colors"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-navy group-hover:text-brand-700">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                        {link.description}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-brand-600"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
