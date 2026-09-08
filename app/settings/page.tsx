
import type { Metadata } from "next";

import { CustomerSettingsPage } from "@/components/features/customer/customer-profile";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your AutoStock BD profile, preferences, notifications, appearance, and security.",
};

export default function CustomerSettingsRoute() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />

      <main>
        <CustomerSettingsPage />
      </main>

      <SiteFooter />
    </div>
  );
}

