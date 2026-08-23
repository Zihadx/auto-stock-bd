import Link from "next/link";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function SortableHeader({
  label,
  ascValue,
  descValue,
  currentSort,
  searchParams,
}: {
  label: string;
  ascValue: string;
  descValue: string;
  currentSort?: string;
  searchParams: URLSearchParams;
}) {
  const isAsc = currentSort === ascValue;
  const isDesc = currentSort === descValue;
  const nextSort = isAsc ? descValue : ascValue;

  const params = new URLSearchParams(searchParams.toString());
  params.set("sort", nextSort);
  params.delete("page");

  const Icon = isAsc ? ArrowUp : isDesc ? ArrowDown : ArrowUpDown;

  return (
    <Link
      href={`?${params.toString()}`}
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-ink-faint hover:text-ink",
        (isAsc || isDesc) && "text-ink",
      )}
    >
      {label}
      <Icon className="h-3 w-3" aria-hidden />
    </Link>
  );
}
