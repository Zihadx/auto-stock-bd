import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/features/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with AutoStock BD — Gulshan, Dhaka.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="text-center">
        <p className="text-label text-brass">Get in touch</p>
        <h1 className="text-h1 mt-3 text-ink">We usually reply the same day</h1>
        <p className="text-body mx-auto mt-3 max-w-lg text-ink-soft">
          Questions about a listing, financing, or a bulk purchase? Send us a
          message and we&apos;ll respond within one business day.
        </p>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-brass" aria-hidden />
            <div>
              <p className="text-small font-medium text-ink">Showroom</p>
              <p className="text-small text-ink-soft">{siteConfig.address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 shrink-0 text-brass" aria-hidden />
            <div>
              <p className="text-small font-medium text-ink">Phone</p>
              <a href={`tel:${siteConfig.phone}`} className="text-small text-ink-soft hover:text-ink">
                {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="h-5 w-5 shrink-0 text-brass" aria-hidden />
            <div>
              <p className="text-small font-medium text-ink">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="text-small text-ink-soft hover:text-ink">
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 shrink-0 text-brass" aria-hidden />
            <div>
              <p className="text-small font-medium text-ink">Hours</p>
              <p className="text-small text-ink-soft">Sat – Thu, 10am – 8pm</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
