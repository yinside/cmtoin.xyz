import type { ReactNode } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export interface LegalSection {
  id: string;
  label: string;
}

interface LegalBodyProps {
  sections: LegalSection[];
  children: ReactNode;
}

export function LegalBody({ sections, children }: LegalBodyProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
            On this page
          </p>
          <nav aria-label="On this page" className="mt-3">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-sm text-xs leading-5 text-slate-600 transition-colors hover:text-brand-700"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 hover:text-brand-800"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </div>
        <p className="mt-4 px-1 text-[0.7rem] leading-5 text-slate-500">
          This page is a template and should be reviewed before publication.{" "}
          <Link
            href="/contact/"
            className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2"
          >
            Contact us
          </Link>{" "}
          with questions.
        </p>
      </aside>

      <div className="min-w-0">
        <div className="prose-cm max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
