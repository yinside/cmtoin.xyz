import type { ReactNode } from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="40" height="40" rx="11" fill="#2563EB" />
        <g transform="rotate(-14 20 20)">
          <rect x="7" y="14.5" width="26" height="11" rx="2.5" fill="white" />
          <path
            d="M11.5 14.5v4M16 14.5v2.8M20.5 14.5v4M25 14.5v2.8M29.5 14.5v4"
            stroke="#2563EB"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
        <circle cx="31.5" cy="29.5" r="2" fill="#BFDBFE" />
      </svg>
      <span className="text-[1.4rem] font-bold leading-none tracking-[-0.045em] text-navy">
        CM<span className="text-brand-600">to</span>IN
      </span>
    </span>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="40" height="40" rx="11" fill="#2563EB" />
      <g transform="rotate(-14 20 20)">
        <rect x="7" y="14.5" width="26" height="11" rx="2.5" fill="white" />
        <path
          d="M11.5 14.5v4M16 14.5v2.8M20.5 14.5v4M25 14.5v2.8M29.5 14.5v4"
          stroke="#2563EB"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
      <circle cx="31.5" cy="29.5" r="2" fill="#BFDBFE" />
    </svg>
  );
}

export function BrandLink({ children }: { children?: ReactNode }) {
  return (
    <span className="flex flex-col gap-0.5">
      <Logo />
      {children ? (
        <span className="pl-[46px] text-[0.7rem] font-medium tracking-wide text-slate-500">
          {children}
        </span>
      ) : null}
    </span>
  );
}
