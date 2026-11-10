import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  FOOTER_RESOURCE_LINKS,
  FOOTER_TOOL_LINKS,
  LEGAL_LINKS,
  SITE,
} from "@/lib/site";

const linkClass =
  "text-sm text-slate-600 transition-colors hover:text-brand-700";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-block rounded-md"
              aria-label="CMtoIN home"
            >
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {SITE.tagline} Free length converters, conversion charts, and
              practical guides for everyday measurements.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {SITE.email}
            </a>
            <p className="mt-5 max-w-xs text-xs leading-5 text-slate-500">
              Conversions use the international inch (1 in = 2.54 cm) and foot
              (1 ft = 30.48 cm).
            </p>
          </div>

          <nav aria-label="Footer converters">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Converters
            </h2>
            <ul className="mt-4 space-y-3">
              {FOOTER_TOOL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer resources">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Resources
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className={linkClass}>
                  Home
                </Link>
              </li>
              {FOOTER_RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer legal">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Legal
            </h2>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.copyrightYear} CMtoIN. All rights reserved.</p>
          <p>Accurate conversions, without the extra steps.</p>
        </div>
      </div>
    </footer>
  );
}
