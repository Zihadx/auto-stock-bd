"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { SlidersHorizontal, X } from "lucide-react";
import { FiltersPanel } from "@/components/features/inventory/filters-panel";
import { Button } from "@/components/ui/button";

export function MobileFilterDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button variant="secondary" size="sm" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[85vh] flex-col rounded-t-lg bg-paper"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Drawer.Title className="font-display text-base font-medium">
              Filters
            </Drawer.Title>
            <Drawer.Close asChild>
              <button type="button" aria-label="Close filters" className="p-1">
                <X className="h-5 w-5" />
              </button>
            </Drawer.Close>
          </div>
          <div className="overflow-y-auto px-5 py-2">
            <FiltersPanel onApply={() => setOpen(false)} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
