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
  const [activeDialog, setActiveDialog] = useState<InquiryType | null>(null);
  const vehicleName = `${vehicle.brand} ${vehicle.model}`;

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${vehicleName} (${vehicle.year}) listed on AutoStock BD — is it still available?`,
  );
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`;

  return (
    <div className="sticky top-24 rounded-md border border-line bg-paper-raised p-5">
      <PriceDisplay amount={vehicle.price} negotiable={vehicle.negotiable} size="lg" />
      <p className="mt-1 text-xs text-ink-faint">
        {vehicle.location} · {vehicle.inquiryCount} people inquired this week
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        <Button variant="brass" onClick={() => setActiveDialog("general")}>
          Ask about this vehicle
        </Button>
        <Button variant="secondary" onClick={() => setActiveDialog("test-drive")}>
          <Calendar className="h-4 w-4" aria-hidden />
          Book a test drive
        </Button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-success px-4 text-sm font-medium text-paper hover:bg-success/90"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Chat on WhatsApp
        </a>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink-soft">
        <Phone className="h-4 w-4" aria-hidden />
        <a href={`tel:${siteConfig.phone}`} className="hover:text-ink">
          {siteConfig.phone}
        </a>
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
