import type { InquiryFilters, InquiryPriority, InquiryStatus, InquiryType } from "@/types/inquiry";

type SearchParams = Record<string, string | string[] | undefined>;

function toArray(value: string | string[] | undefined): string[] | undefined {
  if (!value) return undefined;
  const arr = Array.isArray(value) ? value : value.split(",");
  return arr.filter(Boolean);
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const validStatuses: InquiryStatus[] = ["new", "contacted", "follow-up", "closed"];
const validTypes: InquiryType[] = ["general", "test-drive", "trade-in", "financing"];
const validPriorities: InquiryPriority[] = ["low", "medium", "high"];

export function parseInquiryFilters(searchParams: SearchParams): InquiryFilters {
  return {
    search: first(searchParams.search),
    status: toArray(searchParams.status)?.filter((s): s is InquiryStatus =>
      validStatuses.includes(s as InquiryStatus),
    ),
    type: toArray(searchParams.type)?.filter((t): t is InquiryType =>
      validTypes.includes(t as InquiryType),
    ),
    priority: toArray(searchParams.priority)?.filter((p): p is InquiryPriority =>
      validPriorities.includes(p as InquiryPriority),
    ),
    page: Number(first(searchParams.page)) || 1,
    pageSize: 10,
  };
}
