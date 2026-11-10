import type { ReactNode } from "react";
import { Info } from "lucide-react";

interface CalloutProps {
  title?: string;
  children: ReactNode;
  variant?: "info" | "warning" | "neutral";
  className?: string;
}

const variants = {
  info: {
    container: "border-brand-200 bg-brand-50/70",
    icon: "bg-white text-brand-600",
    title: "text-brand-900",
    body: "text-slate-700",
  },
  warning: {
    container: "border-amber-200 bg-amber-50",
    icon: "bg-white text-amber-600",
    title: "text-amber-950",
    body: "text-amber-900/80",
  },
  neutral: {
    container: "border-slate-200 bg-slate-50",
    icon: "bg-white text-slate-500",
    title: "text-navy",
    body: "text-slate-600",
  },
} as const;

export function Callout({
  title,
  children,
  variant = "info",
  className = "",
}: CalloutProps) {
  const styles = variants[variant];

  return (
    <div
      className={`flex gap-3.5 rounded-2xl border p-4 sm:p-5 ${styles.container} ${className}`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/5 ${styles.icon}`}
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className={`min-w-0 text-sm leading-7 ${styles.body}`}>
        {title ? (
          <p className={`mb-1 font-semibold ${styles.title}`}>{title}</p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
