import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  includeSchema?: boolean;
  className?: string;
}

export function Breadcrumbs({
  items,
  includeSchema = true,
  className = "",
}: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-medium text-slate-500 sm:text-[0.8rem]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-slate-300"
                    aria-hidden="true"
                  />
                ) : null}
                {isLast ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-slate-700"
                    aria-current="page"
                  >
                    {index === 0 ? (
                      <House className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : null}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-brand-700"
                  >
                    {index === 0 ? (
                      <House className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : null}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {includeSchema ? <JsonLd data={breadcrumbSchema(items)} /> : null}
    </>
  );
}
