"use client";

import Link from "next/link";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-5 flex items-center justify-between">
      <Link
        href="/"
        className="text-sm text-muted hover:text-ink transition-colors flex items-center gap-1"
      >
        <span aria-hidden>←</span>
        <span>Home</span>
      </Link>
      <div className="text-right">
        <h1 className="text-base font-bold text-ink">{title}</h1>
        {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
      </div>
    </header>
  );
}
