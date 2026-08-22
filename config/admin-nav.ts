import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string }[];
}

export const adminNav: AdminNavItem[] = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Car,
    children: [
      { label: "All Vehicles", href: "/admin/inventory" },
      { label: "Available", href: "/admin/inventory?status=available" },
      { label: "Sold", href: "/admin/inventory?status=sold" },
      { label: "Add Vehicle", href: "/admin/inventory/new" },
    ],
  },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Customers", href: "/admin/customers", icon: Users },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    children: [
      { label: "Sales", href: "/admin/analytics?tab=sales" },
      { label: "Inventory", href: "/admin/analytics?tab=inventory" },
      { label: "Leads", href: "/admin/analytics?tab=leads" },
    ],
  },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];
