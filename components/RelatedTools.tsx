import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/PageLayout";
import { CONVERTER_LINKS } from "@/lib/site";

interface RelatedToolsProps {
  hrefs: string[];
  title?: string;
  description?: string;
  className?: string;
}

export function RelatedTools({
  hrefs,
  title = "Related conversion tools",
  description = "Keep converting with the tools that pair naturally with this page.",
  className = "",
}: RelatedToolsProps) {
  const tools = hrefs
    .map((href) => CONVERTER_LINKS.find((tool) => tool.href === href))
    .filter((tool): tool is (typeof CONVERTER_LINKS)[number] => Boolean(tool));

  if (tools.length === 0) {
    return null;
  }

  return (
    <section
      className={`border-t border-slate-200 pt-10 sm:pt-12 ${className}`}
      aria-labelledby="related-tools-heading"
    >
      <SectionHeading
        eyebrow="Keep going"
        title={title}
        description={description}
        id="related-tools-heading"
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/50"
          >
            <span>
              <span className="block text-sm font-semibold text-navy">
                {tool.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {tool.shortLabel}
              </span>
            </span>
            <ArrowUpRight
              className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-600"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
