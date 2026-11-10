import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, type FaqItem } from "@/lib/schema";

interface FAQProps {
  items: FaqItem[];
  title?: string;
  description?: string;
  id?: string;
  includeSchema?: boolean;
  className?: string;
}

export function FAQ({
  items,
  title = "Frequently asked questions",
  description = "Quick answers to the questions people ask most about this conversion.",
  id = "faq",
  includeSchema = true,
  className = "",
}: FAQProps) {
  return (
    <section id={id} className={className} aria-labelledby={`${id}-heading`}>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
            <span className="h-px w-6 bg-brand-400" aria-hidden="true" />
            Answers
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-2.5 text-balance text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]"
          >
            {title}
          </h2>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-7 text-slate-600">
            {description}
          </p>
          <p className="mt-5 text-sm text-slate-500">
            Have another question?{" "}
            <Link
              href="/contact/"
              className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
            >
              Contact CMtoIN
            </Link>
            .
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="text-[0.95rem] font-semibold leading-6 text-navy sm:text-base">
                  {item.question}
                </span>
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-transform duration-200 group-open:rotate-180">
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </summary>
              <div className="pb-5 pr-10">
                <p className="text-sm leading-7 text-slate-600">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
      {includeSchema ? <JsonLd data={faqSchema(items)} /> : null}
    </section>
  );
}
