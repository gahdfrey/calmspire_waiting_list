"use client";

import { useEffect, useRef, useState } from "react";
import { HeartPulse, Menu, X } from "./icons";

const links = [
  { href: "#platform", label: "Platform" },
  { href: "#roles", label: "Access" },
  { href: "#security", label: "Security" },
  { href: "#beta", label: "Beta terms" },
  { href: "#faq", label: "FAQ" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    // Anything outside the header dismisses the menu. pointerdown rather than
    // click, so the menu is already closing as the finger lands — and the
    // toggle button lives inside the header, so its own handler still owns it.
    const onPointerDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="-my-1 flex items-center gap-2.5 py-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/25">
            <HeartPulse className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[17px] font-bold tracking-tight text-slate-900">
            Care<span className="text-blue-600">Vault</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100/80 hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#join"
            className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 sm:inline-flex"
          >
            Request beta access
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-lg p-2.5 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          >
            {/* Both icons are stacked and cross-faded, so the swap turns
                rather than blinks. */}
            <span className="relative block h-5 w-5">
              <Menu
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ease-out motion-reduce:transition-none ${
                  open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ease-out motion-reduce:transition-none ${
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Kept mounted so it can animate. The 0fr -> 1fr grid row expands to
          the content's natural height without hard-coding one; `inert` keeps
          the links out of the tab order and the a11y tree while collapsed. */}
      <div
        id="mobile-menu"
        inert={open ? undefined : true}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="border-t border-slate-200/80 bg-white">
            <nav
              className={`mx-auto max-w-7xl px-6 py-3 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                open ? "translate-y-0" : "-translate-y-1"
              }`}
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-[15px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-blue-600 px-4 py-3 text-center text-[15px] font-semibold text-white sm:hidden"
              >
                Request beta access
              </a>
            </nav>
          </div>
        </div>
      </div>

    </header>
  );
};
