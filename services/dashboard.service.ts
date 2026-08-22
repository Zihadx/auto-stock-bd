import {
  dashboardStats,
  monthlyRevenue,
  monthlyUnitsSold,
  inventoryDistribution,
  recentActivity,
  needsAttention,
} from "@/data/dashboard";
import type { DashboardStats, RecentActivityItem } from "@/types/analytics";
import type { NeedsAttentionItem } from "@/data/dashboard";

const ARTIFICIAL_DELAY_MS = 250;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ARTIFICIAL_DELAY_MS));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return delay(dashboardStats);
}

export async function getDashboardCharts() {
  return delay({ monthlyRevenue, monthlyUnitsSold, inventoryDistribution });
}

export async function getRecentActivity(limit = 6): Promise<RecentActivityItem[]> {
  return delay(recentActivity.slice(0, limit));
}

export async function getNeedsAttention(): Promise<NeedsAttentionItem[]> {
  return delay(needsAttention);
}
