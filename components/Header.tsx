"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeftRight,
  ArrowRight,
  ChevronDown,
  Footprints,
  Menu,
  Milestone,
  MoveHorizontal,
  MoveVertical,
  Ruler,
  X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { CONVERTER_LINKS, PRIMARY_NAV } from "@/lib/site";
import type { ConverterLink } from "@/lib/site";

const CONVERTER_ICONS: Record<ConverterLink["icon"], LucideIcon> = {
  ruler: Ruler,
  swap: ArrowLeftRight,
  feet: Footprints,
  height: MoveVertical,
  millimeter: MoveHorizontal,
  meter: Milestone,
};

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [convertersOpen, setConvertersOpen] = useState(false);
  const convertersRef = useRef<HTMLDivElement>(null);
  const convertersButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const convertersActive = CONVERTER_LINKS.some((link) =>
    isPathActive(pathname, link.href),
  );

  useEffect(() => {
    setMobileOpen(false);
    setConvertersOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!convertersOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        convertersRef.current &&
        !convertersRef.current.contains(event.target as Node)
      ) {
        setConvertersOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [convertersOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-md focus-visible:outline-offset-4"
          aria-label="CMtoIN home"
        >
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-brand-50 text-brand-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-navy"
            }`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>

          <div
            className="relative"
            ref={convertersRef}
            onMouseEnter={() => setConvertersOpen(true)}
            onMouseLeave={() => setConvertersOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setConvertersOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" && convertersOpen) {
                setConvertersOpen(false);
                convertersButtonRef.current?.focus();
              }
            }}
          >
            <button
              ref={convertersButtonRef}
              type="button"
              className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                convertersActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-navy"
              }`}
              aria-expanded={convertersOpen}
              aria-controls="converters-menu"
              aria-haspopup="true"
              onClick={() => setConvertersOpen((open) => !open)}
            >
              Converters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  convertersOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {convertersOpen ? (
              <div
                id="converters-menu"
                className="absolute left-0 top-full w-[380px] pt-3"
              >
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-lift">
                  <p className="px-3 pb-2 pt-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Length converters
                  </p>
                  <ul>
                    {CONVERTER_LINKS.map((link) => {
                      const Icon = CONVERTER_ICONS[link.icon];
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50"
                            aria-current={
                              isPathActive(pathname, link.href)
                                ? "page"
                                : undefined
                            }
                            onClick={() => setConvertersOpen(false)}
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-600 group-hover:border-brand-200">
                              <Icon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-navy">
                                {link.label}
                              </span>
                              <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                                {link.description}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-1 border-t border-slate-100 px-3 pb-1 pt-3">
                    <Link
                      href="/cm-to-inches-chart/"
                      className="flex items-center justify-between rounded-lg py-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
                      onClick={() => setConvertersOpen(false)}
                    >
                      Browse conversion charts
                      <ArrowRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {PRIMARY_NAV.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                isPathActive(pathname, item.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-navy"
              }`}
              aria-current={
                isPathActive(pathname, item.href) ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/#calculator"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Convert now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          ref={mobileButtonRef}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && typeof document !== "undefined"
        ? createPortal(
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-[72px] z-50 overflow-y-auto border-t border-slate-200 bg-white px-4 pb-10 pt-4 sm:px-6 lg:hidden"
        >
          <nav aria-label="Mobile navigation">
            <Link
              href="/"
              className={`flex min-h-11 items-center rounded-xl px-3 text-base font-medium ${
                pathname === "/"
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              aria-current={pathname === "/" ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <p className="mb-2 mt-6 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Converters
            </p>
            <div className="grid gap-1">
              {CONVERTER_LINKS.map((link) => {
                const Icon = CONVERTER_ICONS[link.icon];
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 ${
                      isPathActive(pathname, link.href)
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    aria-current={
                      isPathActive(pathname, link.href) ? "page" : undefined
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-sm font-semibold">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {link.shortLabel}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <p className="mb-2 mt-6 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Explore
            </p>
            <div className="grid gap-1">
              {PRIMARY_NAV.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-11 items-center rounded-xl px-3 text-base font-medium ${
                    isPathActive(pathname, item.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-current={
                    isPathActive(pathname, item.href) ? "page" : undefined
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="/#calculator"
              className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
              onClick={() => setMobileOpen(false)}
            >
              Open the converter
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>,
        document.body,
      )
        : null}
    </header>
  );
}
