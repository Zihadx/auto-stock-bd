"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/types/vehicle";

export function VehicleGallery({ images, vehicleName }: { images: VehicleImage[]; vehicleName: string }) {
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, images.findIndex((img) => img.isPrimary)),
  );
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-ink/5 sm:aspect-[16/10]">
        <Image
          src={active.url}
          alt={active.alt}
          fill
          priority
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div
          role="tablist"
          aria-label={`${vehicleName} photos`}
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Photo ${i + 1} of ${images.length}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-colors",
                i === activeIndex ? "border-brass" : "border-transparent",
              )}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
