import type { Metadata } from "next";
import { getInquiries } from "@/services/inquiry.service";
import { parseInquiryFilters } from "@/lib/parse-inquiry-filters";
import { InquiryStatusTabs } from "@/components/features/admin/inquiries/inquiry-status-tabs";
import { InquirySearch } from "@/components/features/admin/inquiries/inquiry-search";
import { InquiryTable } from "@/components/features/admin/inquiries/inquiry-table";
import { PaginationBar } from "@/components/features/inventory/pagination-bar";

export const metadata: Metadata = {
  title: "Inquiries",
};

export default async function AdminInquiriesPage({
  searchParams,
}: PageProps<"/admin/inquiries">) {
  const resolvedParams = await searchParams;
  const filters = parseInquiryFilters(resolvedParams);
  const result = await getInquiries(filters);

  const urlSearchParams = new URLSearchParams(
    Object.entries(resolvedParams).flatMap(([key, value]) =>
      value === undefined ? [] : Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]],
    ),
  );

  const statusParam = Array.isArray(resolvedParams.status)
    ? resolvedParams.status[0]
    : resolvedParams.status ?? "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div>
        <h1 className="font-display text-2xl font-medium md:text-3xl">Inquiries</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {result.total} inquir{result.total === 1 ? "y" : "ies"}
        </p>
      </div>

      <div className="mt-6">
        <InquiryStatusTabs active={statusParam} searchParams={urlSearchParams} />
      </div>

      <div className="mt-4">
        <InquirySearch />
      </div>

      <div className="mt-4">
        <InquiryTable inquiries={result.items} />
      </div>

      <PaginationBar
        page={result.page}
        totalPages={result.totalPages}
        searchParams={urlSearchParams}
      />
    </div>
  );
}
