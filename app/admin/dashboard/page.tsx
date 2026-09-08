import type { Metadata } from "next";

import {
  getDashboardStats,
  getDashboardCharts,
  getRecentActivity,
  getNeedsAttention,
} from "@/services/dashboard.service";
import { leadsTrend } from "@/data/dashboard";

import { KpiCard } from "@/components/features/dashboard/kpi-card";
import { SalesTrendChart } from "@/components/features/dashboard/sales-trend-chart";
import { InventoryDonut } from "@/components/features/dashboard/inventory-donut";
import { LeadsTrendChart } from "@/components/features/dashboard/leads-trend-chart";
import { RecentActivityList } from "@/components/features/dashboard/recent-activity";
import { NeedsAttentionPanel } from "@/components/features/dashboard/needs-attention";
import { QuickActions } from "@/components/features/dashboard/quick-actions";
import { InventoryHealth } from "@/components/features/dashboard/inventory-health";
import { formatBDTCompact } from "@/lib/format";

export const metadata: Metadata = {
  title: "Dashboard",
};

function timeOfDayGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default async function AdminDashboardPage() {
  const [stats, charts, activity, attention] = await Promise.all([
    getDashboardStats(),
    getDashboardCharts(),
    getRecentActivity(6),
    getNeedsAttention(),
  ]);

  const kpis = [
    {
      label: "Total vehicles",
      value: `${stats.totalVehicles}`,
      deltaPct: 4.2,
      context: "vs. last month",
    },
    {
      label: "Available",
      value: `${stats.available}`,
      deltaPct: -2.1,
      context: "vs. last month",
    },
    {
      label: "Sold this month",
      value: `${stats.soldThisMonth}`,
      deltaPct: 26.7,
      context: "vs. last month",
    },
    {
      label: "New inquiries",
      value: `${stats.newInquiries}`,
      deltaPct: 12.9,
      context: "vs. last month",
    },
    {
      label: "Inventory value",
      value: formatBDTCompact(stats.inventoryValue),
      deltaPct: 3.5,
      context: "vs. last month",
    },
    {
      label: "Conversion rate",
      value: `${stats.conversionRatePct}%`,
      deltaPct: 1.8,
      context: "inquiry → sale",
    },
  ];

  return (
    <div className="container px-10 py-6 sm:py-8">
      {/* Header */}
      <section>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          AutoStock / Overview
        </p>

        <h1 className="text-h1 text-ink">
          {timeOfDayGreeting()}, Admin
        </h1>

        <p className="text-small mt-1 text-ink-soft">
          {stats.greetingSummary}
        </p>
      </section>

      {/* KPI overview */}
      <section
        aria-label="Dashboard metrics"
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
      >
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>

      {/* Revenue + inventory */}
      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <SalesTrendChart data={charts.monthlyRevenue} />
        <InventoryDonut data={charts.inventoryDistribution} />
      </section>

      {/* Leads + inventory health */}
      <section className="mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]">
        <LeadsTrendChart data={leadsTrend} />
        <InventoryHealth stats={stats} />
      </section>

      {/* Activity + quick actions */}
      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivityList items={activity} />
        </div>

        <QuickActions />
      </section>

      {/* Attention */}
      <section className="mt-5">
        <NeedsAttentionPanel items={attention} />
      </section>
    </div>
  );
}