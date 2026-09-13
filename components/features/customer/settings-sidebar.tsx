
"use client";

import {
  Bell,
  ChevronRight,
  CircleHelp,
  Heart,
  Palette,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { ACCENT, GOLD } from "@/components/ui/tokens";
import { cn } from "@/lib/utils";

export type CustomerSettingSection =
  | "profile"
  | "preferences"
  | "notifications"
  | "appearance"
  | "security";

const sections: {
  id: CustomerSettingSection;
  label: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
    icon: UserRound,
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Browsing and shopping",
    icon: Heart,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and updates",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme and interface",
    icon: Palette,
  },
  {
    id: "security",
    label: "Security",
    description: "Account protection",
    icon: ShieldCheck,
  },
];

interface CustomerSettingsSidebarProps {
  activeSection: CustomerSettingSection;
  onSectionChange: (section: CustomerSettingSection) => void;
}

export function CustomerSettingsSidebar({
  activeSection,
  onSectionChange,
}: CustomerSettingsSidebarProps) {
  return (
    <aside
      className={cn(
        "h-fit rounded-2xl border p-1.5",
        "border-[#F51B72]/10",
        "bg-[linear-gradient(145deg,rgba(245,27,114,0.045),rgba(107,16,46,0.025),rgba(255,255,255,0.015))]",
        "shadow-[0_10px_35px_rgba(10,1,6,0.05)]",
        "backdrop-blur-xl",
        "lg:sticky lg:top-24",
      )}
    >
      <div className="px-3 pb-3 pt-2.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Preferences
        </p>
      </div>

      <nav className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const selected = section.id === activeSection;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "group relative flex w-full items-center gap-2.5 overflow-hidden rounded-xl px-2.5 py-2.5 text-left",
                "border transition-all duration-300",
                selected
                  ? [
                      "border-[#F51B72]/25",
                      "bg-gradient-to-r from-[#F51B72]/14 via-[#F51B72]/7 to-[#6B102E]/5",
                      "shadow-[inset_0_1px_0_rgba(248,195,225,0.08),0_5px_18px_rgba(245,27,114,0.08)]",
                    ].join(" ")
                  : [
                      "border-transparent",
                      "hover:border-[#F51B72]/8",
                      "hover:bg-[#F51B72]/[0.035]",
                    ].join(" "),
              )}
            >
              {selected && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-6 top-1/2 size-14 -translate-y-1/2 rounded-full blur-2xl"
                  style={{
                    backgroundColor: `${ACCENT}20`,
                  }}
                />
              )}

              <span
                className={cn(
                  "relative flex size-8 shrink-0 items-center justify-center rounded-lg border",
                  selected
                    ? "border-[#F51B72]/25 bg-[#F51B72]/10"
                    : "border-[#F51B72]/8 bg-[#F51B72]/[0.025]",
                )}
              >
                <Icon
                  className="size-[14px]"
                  strokeWidth={1.7}
                  style={{
                    color: ACCENT,
                  }}
                />
              </span>

              <span className="relative min-w-0 flex-1">
                <span className="block text-[12px] font-medium text-ink">
                  {section.label}
                </span>

                <span
                  className={cn(
                    "mt-0.5 block truncate text-[9px]",
                    selected ? "text-ink-soft" : "text-ink-faint",
                  )}
                >
                  {section.description}
                </span>
              </span>

              <ChevronRight
                className={cn(
                  "relative size-3.5 transition-all duration-300",
                  selected
                    ? "text-[#F51B72]/60"
                    : "translate-x-[-3px] text-ink-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                )}
              />
            </button>
          );
        })}
      </nav>

      <div className="mt-2 border-t border-[#F51B72]/8 px-2.5 pb-1 pt-3">
        <div className="flex items-start gap-2.5">
          <CircleHelp
            className="mt-0.5 size-3.5 shrink-0"
            style={{ color: GOLD }}
          />

          <div>
            <p className="text-[10px] font-medium text-ink">
              Need assistance?
            </p>

            <p className="mt-1 text-[9px] leading-4 text-ink-faint">
              Our support team can help with your account.
            </p>

            <button
              type="button"
              className="mt-1.5 text-[9px] font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-[#F51B72]"
            >
              Contact support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

