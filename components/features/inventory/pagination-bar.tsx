import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function buildHref(searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(page));
  return `?${params.toString()}`;
}

export function PaginationBar({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: URLSearchParams;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav
      aria-label="Inventory pagination"
      className="mt-10 flex items-center justify-center gap-1"
    >
      <Link
        href={buildHref(searchParams, Math.max(1, page - 1))}
        aria-disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink-soft hover:bg-ink/5",
          page === 1 && "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1">
            {showEllipsis && <span className="px-1 text-ink-faint">…</span>}
            <Link
              href={buildHref(searchParams, p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-sm border text-sm",
                p === page
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:bg-ink/5",
              )}
            >
              {p}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildHref(searchParams, Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink-soft hover:bg-ink/5",
          page === totalPages && "pointer-events-none opacity-40",
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
