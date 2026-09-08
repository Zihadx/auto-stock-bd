
"use client";

import { useState } from "react";
import { MessageCircle, Calendar, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/ui/price-display";
import { InquiryDialog } from "@/components/features/vehicle-detail/inquiry-dialog";
import { siteConfig } from "@/config/site";
import type { InquiryType } from "@/types/inquiry";
import type { Vehicle } from "@/types/vehicle";

export function CtaSidebar({ vehicle }: { vehicle: Vehicle }) {
  const [activeDialog, setActiveDialog] =
    useState<InquiryType | null>(null);

  const vehicleName = `${vehicle.brand} ${vehicle.model}`;

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${vehicleName} (${vehicle.year}) listed on AutoStock BD — is it still available?`,
  );

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber.replace(
    /\D/g,
    "",
  )}?text=${whatsappMessage}`;

  return (
    <div
      className="
        sticky top-24 overflow-hidden rounded-2xl
        border border-[#F51B72]/[0.08]
        bg-[#F51B72]/[0.015]
        p-5
        shadow-[0_18px_55px_rgba(10,1,6,0.06)]
        backdrop-blur-2xl
      "
    >
      {/* Subtle glass reflection */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r
          from-transparent
          via-white/[0.10]
          to-transparent
        "
      />

      {/* Very soft ambient glass glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-20 -top-20 size-40
          rounded-full
          bg-[#F51B72]/[0.018]
          blur-3xl
        "
      />

      <div className="relative">
        <PriceDisplay
          amount={vehicle.price}
          negotiable={vehicle.negotiable}
          size="lg"
        />

        <p className="mt-1 text-xs text-ink-faint">
          {vehicle.location} · {vehicle.inquiryCount} people inquired this
          week
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          {/* Existing brass color preserved */}
          <Button
            variant="brass"
            onClick={() => setActiveDialog("general")}
          >
            Ask about this vehicle
          </Button>

          {/* Existing secondary color preserved */}
          <Button
            variant="secondary"
            onClick={() => setActiveDialog("test-drive")}
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Book a test drive
          </Button>

          {/* Existing WhatsApp green preserved */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex h-10 items-center justify-center gap-2
              rounded-sm
              bg-success
              px-4
              text-sm font-medium
              text-paper
              transition-colors
              hover:bg-success/90
            "
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Existing phone styling preserved */}
        <div
          className="
            mt-5 flex items-center gap-2
            border-t border-[#F51B72]/[0.06]
            pt-4 text-sm text-ink-soft
          "
        >
          <Phone className="h-4 w-4" aria-hidden="true" />

          <a
            href={`tel:${siteConfig.phone}`}
            className="hover:text-ink"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {(["general", "test-drive"] as const).map((type) => (
        <InquiryDialog
          key={type}
          vehicleId={vehicle.id}
          vehicleName={vehicleName}
          type={type}
          open={activeDialog === type}
          onClose={() => setActiveDialog(null)}
        />
      ))}
    </div>
  );
}

