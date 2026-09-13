"use client";

import {
  Bell,
  Building2,
  Check,
  ChevronRight,
  CircleHelp,
  Globe2,
  KeyRound,
  LockKeyhole,
  Monitor,
  Moon,
  Palette,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

import {
  ACCENT,
  GOLD,
  NATIVE_OPTION_CLASS,
} from "@/components/ui/tokens";
import { cn } from "@/lib/utils";

type SettingSection =
  | "account"
  | "dealership"
  | "notifications"
  | "appearance"
  | "security";

const sections: {
  id: SettingSection;
  label: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    id: "account",
    label: "Account",
    description: "Profile and preferences",
    icon: UserRound,
  },
  {
    id: "dealership",
    label: "Dealership",
    description: "Business configuration",
    icon: Building2,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and activity",
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
    description: "Access and protection",
    icon: ShieldCheck,
  },
];

/* -------------------------------------------------------------------------- */
/* Glass surface                                                              */
/* -------------------------------------------------------------------------- */

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        "border-[#F51B72]/10",
        "bg-[linear-gradient(145deg,rgba(245,27,114,0.055),rgba(107,16,46,0.035),rgba(255,255,255,0.018))]",
        "shadow-[0_12px_40px_rgba(10,1,6,0.06)]",
        "backdrop-blur-xl",
        className,
      )}
    >
      {/* soft ambient pink */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full opacity-[0.07] blur-3xl"
        style={{ backgroundColor: ACCENT }}
      />

      {/* glass reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F8C3E1]/20 to-transparent"
      />

      <div className="relative">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Setting row                                                                */
/* -------------------------------------------------------------------------- */

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#F51B72]/8 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3.5">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl border",
            "border-[#F51B72]/10",
            "bg-[#F51B72]/[0.035]",
            "shadow-[inset_0_1px_0_rgba(248,195,225,0.06)]",
          )}
        >
          <Icon
            className="size-[15px]"
            style={{ color: ACCENT }}
            strokeWidth={1.7}
          />
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-medium tracking-[-0.01em] text-ink">
            {title}
          </p>

          <p className="mt-1 max-w-xl text-[11px] leading-5 text-ink-faint">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0 sm:pl-8">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Premium toggle                                                             */
/* -------------------------------------------------------------------------- */

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={checked ? "Disable setting" : "Enable setting"}
      onClick={() => onChange(!checked)}
      className={cn(
        "group relative h-7 w-12 shrink-0 rounded-full border p-[3px]",
        "outline-none",
        "transition-all duration-300 ease-out",
        "focus-visible:ring-2 focus-visible:ring-[#F51B72]/25 focus-visible:ring-offset-2",
        checked
          ? [
              "border-[#F51B72]/35",
              "bg-gradient-to-br from-[#F51B72] via-[#E71869] to-[#6B102E]",
              "shadow-[0_4px_18px_rgba(245,27,114,0.24)]",
            ].join(" ")
          : [
              "border-[#F51B72]/10",
              "bg-[#F51B72]/[0.035]",
              "hover:border-[#F51B72]/20",
            ].join(" "),
      )}
    >
      {/* Glass highlight */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[2px] rounded-full",
          "bg-white/[0.08]",
          "transition-opacity duration-300",
          checked ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Thumb */}
      <span
        aria-hidden="true"
        className={cn(
          "relative block size-5 rounded-full bg-white",
          "shadow-[0_2px_8px_rgba(10,1,6,0.28)]",
          "transition-transform duration-300",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      >
        <span
          className={cn(
            "absolute left-[4px] top-[3px] size-1.5 rounded-full",
            "transition-colors duration-300",
            checked ? "bg-[#F8C3E1]" : "bg-[#F51B72]/20",
          )}
        />
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Select                                                                     */
/* -------------------------------------------------------------------------- */

function SelectField({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "h-9 min-w-[132px] rounded-xl border px-3",
        "border-[#F51B72]/10",
        "bg-[#F51B72]/[0.035]",
        "text-xs font-medium text-ink",
        "outline-none",
        "transition-all duration-200",
        "hover:border-[#F51B72]/20",
        "focus:border-[#F51B72]/35",
        "focus:ring-2 focus:ring-[#F51B72]/10",
      )}
    >
      {children}
    </select>
  );
}

/* -------------------------------------------------------------------------- */
/* Section intro                                                              */
/* -------------------------------------------------------------------------- */

function SectionIntro({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5">
        <div
          className="flex size-8 items-center justify-center rounded-lg border"
          style={{
            borderColor: `${ACCENT}18`,
            background: `${ACCENT}08`,
          }}
        >
          <Icon
            className="size-[15px]"
            style={{ color: ACCENT }}
            strokeWidth={1.7}
          />
        </div>

        <h2 className="text-[15px] font-semibold tracking-[-0.015em] text-ink">
          {title}
        </h2>
      </div>

      <p className="mt-2 pl-[42px] text-[11px] leading-5 text-ink-faint">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

export function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingSection>("account");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [leadAlerts, setLeadAlerts] = useState(true);

  const [language, setLanguage] = useState("English");

  const { theme, setTheme, resolvedTheme } = useTheme();

  const active =
    sections.find((section) => section.id === activeSection) ?? sections[0];

  const ActiveIcon = active.icon;

  const currentTheme =
    theme === "system"
      ? `System · ${resolvedTheme === "dark" ? "Dark" : "Light"}`
      : theme === "dark"
        ? "Dark"
        : "Light";

  return (
    <main className="container px-6 mx-auto py-7 sm:py-8 lg:py-10">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}

      <header className="mb-8">
        <div className="flex items-center gap-2">
          <span
            className="size-1.5 rounded-full shadow-[0_0_10px_rgba(245,27,114,0.55)]"
            style={{ backgroundColor: ACCENT }}
          />

          <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink-faint">
            Workspace configuration
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-h1 tracking-[-0.035em] text-ink">
              Settings
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-6 text-ink-soft sm:text-[13px]">
              Configure your account, dealership workspace,
              notifications, appearance, and security.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-ink-faint">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            <span>AutoStock BD</span>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Shell                                                               */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        {/* ---------------------------------------------------------------- */}
        {/* Sidebar                                                           */}
        {/* ---------------------------------------------------------------- */}

        <aside
          className={cn(
            "h-fit rounded-2xl border p-1.5",
            "border-[#F51B72]/10",
            "bg-[linear-gradient(145deg,rgba(245,27,114,0.045),rgba(107,16,46,0.025),rgba(255,255,255,0.015))]",
            "shadow-[0_10px_35px_rgba(10,1,6,0.05)]",
            "backdrop-blur-xl",
          )}
        >
          <div className="px-3 pb-2.5 pt-2">
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
                  onClick={() => setActiveSection(section.id)}
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
                          "text-ink-soft",
                          "hover:border-[#F51B72]/8",
                          "hover:bg-[#F51B72]/[0.035]",
                          "hover:text-ink",
                        ].join(" "),
                  )}
                >
                  {/* Active glow */}
                  {selected && (
                    <span
                      aria-hidden="true"
                      className="absolute -left-6 top-1/2 size-14 -translate-y-1/2 rounded-full blur-2xl"
                      style={{
                        backgroundColor: `${ACCENT}20`,
                      }}
                    />
                  )}

                  <span
                    className={cn(
                      "relative flex size-8 shrink-0 items-center justify-center rounded-lg border",
                      "transition-all duration-300",
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
                    <span
                      className={cn(
                        "block text-[12px] font-medium",
                        selected ? "text-ink" : "text-ink",
                      )}
                    >
                      {section.label}
                    </span>

                    <span
                      className={cn(
                        "mt-0.5 block truncate text-[9px]",
                        selected
                          ? "text-ink-soft"
                          : "text-ink-faint",
                      )}
                    >
                      {section.description}
                    </span>
                  </span>

                  <ChevronRight
                    className={cn(
                      "relative size-3.5 transition-all duration-300",
                      selected
                        ? "translate-x-0 text-[#F51B72]/60"
                        : "translate-x-[-3px] text-ink-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                    )}
                  />
                </button>
              );
            })}
          </nav>

          {/* Support */}
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
                  Our support team can help with your workspace.
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

        {/* ---------------------------------------------------------------- */}
        {/* Content                                                           */}
        {/* ---------------------------------------------------------------- */}

        <section className="min-w-0">
          {/* ================================================================ */}
          {/* ACCOUNT                                                          */}
          {/* ================================================================ */}

          {activeSection === "account" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Account"
                description="Manage your personal profile and workspace preferences."
              />

              <div className="space-y-4">
                <GlassCard>
                  {/* Profile header */}
                  <div className="flex items-center gap-4 border-b border-[#F51B72]/8 px-5 py-4">
                    <div
                      className={cn(
                        "relative flex size-11 shrink-0 items-center justify-center rounded-xl",
                        "border border-[#F51B72]/20",
                        "bg-gradient-to-br from-[#F51B72]/20 via-[#6B102E]/15 to-transparent",
                        "text-sm font-semibold text-ink",
                        "shadow-[0_5px_20px_rgba(245,27,114,0.08)]",
                      )}
                    >
                      ZA

                      <span
                        className="absolute -bottom-1 -right-1 size-2.5 rounded-full border-2 border-paper-raised"
                        style={{ backgroundColor: ACCENT }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-ink">
                        Zihad Ahmed
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-ink-faint">
                        Administrator · AutoStock BD
                      </p>
                    </div>

                    <button
                      type="button"
                      className={cn(
                        "rounded-xl border px-3 py-2 text-[10px] font-semibold",
                        "border-[#F51B72]/10",
                        "bg-[#F51B72]/[0.035]",
                        "text-ink",
                        "transition-all duration-200",
                        "hover:border-[#F51B72]/25",
                        "hover:bg-[#F51B72]/[0.07]",
                      )}
                    >
                      Edit profile
                    </button>
                  </div>

                  <div className="px-5">
                    <SettingRow
                      icon={UserRound}
                      title="Full name"
                      description="Your name displayed throughout the workspace."
                    >
                      <span className="text-xs font-medium text-ink">
                        Zihad Ahmed
                      </span>
                    </SettingRow>

                    <SettingRow
                      icon={Globe2}
                      title="Language"
                      description="Choose the language used across your dashboard."
                    >
                      <SelectField
                        value={language}
                        onChange={setLanguage}
                      >
                        <option value="English" className={NATIVE_OPTION_CLASS}>English</option>
                        <option value="বাংলা" className={NATIVE_OPTION_CLASS}>বাংলা</option>
                      </SelectField>
                    </SettingRow>

                    <SettingRow
                      icon={Bell}
                      title="Email notifications"
                      description="Receive important account and workspace updates."
                    >
                      <Toggle
                        checked={emailNotifications}
                        onChange={setEmailNotifications}
                      />
                    </SettingRow>
                  </div>
                </GlassCard>
              </div>
            </>
          )}

          {/* ================================================================ */}
          {/* DEALERSHIP                                                       */}
          {/* ================================================================ */}

          {activeSection === "dealership" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Dealership"
                description="Define the business identity and defaults used by AutoStock."
              />

              <GlassCard className="px-5">
                <SettingRow
                  icon={Building2}
                  title="Dealership name"
                  description="Primary business name shown throughout the system."
                >
                  <span className="text-xs font-semibold text-ink">
                    AutoStock BD
                  </span>
                </SettingRow>

                <SettingRow
                  icon={Globe2}
                  title="Currency"
                  description="Default currency used for inventory and sales."
                >
                  <span
                    className={cn(
                      "rounded-xl border px-3 py-2 text-[10px] font-semibold",
                      "border-[#F51B72]/10",
                      "bg-[#F51B72]/[0.035]",
                      "text-ink",
                    )}
                  >
                    BDT · ৳
                  </span>
                </SettingRow>

                <SettingRow
                  icon={Globe2}
                  title="Timezone"
                  description="Used for reports, timestamps, and activity records."
                >
                  <span className="text-xs font-medium text-ink">
                    Asia / Dhaka
                  </span>
                </SettingRow>

                <SettingRow
                  icon={Building2}
                  title="Inventory visibility"
                  description="Control whether vehicle availability is publicly visible."
                >
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[9px] font-semibold",
                      "border-[#F51B72]/15",
                      "bg-[#F51B72]/[0.045]",
                      "text-ink-soft",
                    )}
                  >
                    Public
                  </span>
                </SettingRow>
              </GlassCard>
            </>
          )}

          {/* ================================================================ */}
          {/* NOTIFICATIONS                                                    */}
          {/* ================================================================ */}

          {activeSection === "notifications" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Notifications"
                description="Choose which events should require your attention."
              />

              <GlassCard className="px-5">
                <SettingRow
                  icon={Bell}
                  title="Inventory alerts"
                  description="Notify you when vehicles reach important stock thresholds."
                >
                  <Toggle
                    checked={inventoryAlerts}
                    onChange={setInventoryAlerts}
                  />
                </SettingRow>

                <SettingRow
                  icon={Bell}
                  title="Lead notifications"
                  description="Get notified whenever a new customer inquiry arrives."
                >
                  <Toggle
                    checked={leadAlerts}
                    onChange={setLeadAlerts}
                  />
                </SettingRow>

                <SettingRow
                  icon={Bell}
                  title="Email summaries"
                  description="Receive periodic sales, inventory, and performance reports."
                >
                  <Toggle
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                  />
                </SettingRow>
              </GlassCard>
            </>
          )}

          {/* ================================================================ */}
          {/* APPEARANCE                                                       */}
          {/* ================================================================ */}

          {activeSection === "appearance" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Appearance"
                description="Control the visual environment of your AutoStock workspace."
              />

              <GlassCard className="p-5">
                <div className="mb-4">
                  <p className="text-[12px] font-semibold text-ink">
                    Interface theme
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-ink-faint">
                    Choose a fixed theme or automatically follow your
                    device preference.
                  </p>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-3">
                  {[
                    {
                      value: "light",
                      label: "Light",
                      description: "Warm paper interface",
                      icon: Sun,
                    },
                    {
                      value: "dark",
                      label: "Dark",
                      description: "Deep automotive interface",
                      icon: Moon,
                    },
                    {
                      value: "system",
                      label: "System",
                      description: "Follow device preference",
                      icon: Monitor,
                    },
                  ].map((option) => {
                    const Icon = option.icon;
                    const selected = theme === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTheme(option.value)}
                        className={cn(
                          "relative overflow-hidden rounded-xl border p-4 text-left",
                          "transition-all duration-300",
                          selected
                            ? [
                                "border-[#F51B72]/25",
                                "bg-gradient-to-br from-[#F51B72]/13 via-[#F51B72]/6 to-[#6B102E]/5",
                                "shadow-[0_6px_22px_rgba(245,27,114,0.08)]",
                              ].join(" ")
                            : [
                                "border-[#F51B72]/8",
                                "bg-[#F51B72]/[0.025]",
                                "hover:border-[#F51B72]/18",
                                "hover:bg-[#F51B72]/[0.05]",
                              ].join(" "),
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={cn(
                              "flex size-8 items-center justify-center rounded-lg border",
                              selected
                                ? "border-[#F51B72]/20 bg-[#F51B72]/10"
                                : "border-[#F51B72]/8 bg-[#F51B72]/[0.025]",
                            )}
                          >
                            <Icon
                              className="size-[14px]"
                              style={{
                                color: selected ? ACCENT : ACCENT,
                              }}
                            />
                          </div>

                          {selected && (
                            <span
                              className="flex size-5 items-center justify-center rounded-full shadow-[0_3px_10px_rgba(245,27,114,0.25)]"
                              style={{
                                backgroundColor: ACCENT,
                              }}
                            >
                              <Check className="size-3 text-white" />
                            </span>
                          )}
                        </div>

                        <p className="mt-4 text-[12px] font-semibold text-ink">
                          {option.label}
                        </p>

                        <p className="mt-1 text-[9px] leading-4 text-ink-faint">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#F51B72]/8 pt-4">
                  <div>
                    <p className="text-[10px] font-medium text-ink">
                      Current appearance
                    </p>

                    <p className="mt-0.5 text-[9px] text-ink-faint">
                      {currentTheme}
                    </p>
                  </div>

                  <Palette
                    className="size-4"
                    style={{ color: `${ACCENT}80` }}
                    strokeWidth={1.6}
                  />
                </div>
              </GlassCard>
            </>
          )}

          {/* ================================================================ */}
          {/* SECURITY                                                         */}
          {/* ================================================================ */}

          {activeSection === "security" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Security"
                description="Protect access to your dealership workspace and account."
              />

              <div className="space-y-4">
                <GlassCard className="px-5">
                  <SettingRow
                    icon={KeyRound}
                    title="Password"
                    description="Update the password used to access your account."
                  >
                    <button
                      type="button"
                      className={cn(
                        "rounded-xl border px-3 py-2 text-[10px] font-semibold",
                        "border-[#F51B72]/10",
                        "bg-[#F51B72]/[0.035]",
                        "text-ink",
                        "transition-all duration-200",
                        "hover:border-[#F51B72]/25",
                        "hover:bg-[#F51B72]/[0.07]",
                      )}
                    >
                      Change password
                    </button>
                  </SettingRow>

                  <SettingRow
                    icon={LockKeyhole}
                    title="Two-factor authentication"
                    description="Add another verification step when signing in."
                  >
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[9px] font-semibold",
                        "border-[#DAA428]/20",
                        "bg-[#DAA428]/[0.06]",
                        "text-ink-soft",
                      )}
                    >
                      Not configured
                    </span>
                  </SettingRow>

                  <SettingRow
                    icon={ShieldCheck}
                    title="Active sessions"
                    description="Review devices and browsers currently signed into your account."
                  >
                    <button
                      type="button"
                      className="text-[10px] font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-[#F51B72]"
                    >
                      Review sessions
                    </button>
                  </SettingRow>
                </GlassCard>

                {/* Security recommendation */}
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border px-5 py-4",
                    "border-[#DAA428]/15",
                    "bg-gradient-to-r from-[#DAA428]/[0.055] via-[#F51B72]/[0.025] to-transparent",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: `${GOLD}25`,
                        backgroundColor: `${GOLD}0A`,
                      }}
                    >
                      <ShieldCheck
                        className="size-3.5"
                        style={{ color: GOLD }}
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold text-ink">
                        Security recommendation
                      </p>

                      <p className="mt-1 max-w-xl text-[9px] leading-5 text-ink-faint">
                        Enable two-factor authentication to strengthen
                        protection for your dealership workspace.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* Footer                                                           */}
          {/* ---------------------------------------------------------------- */}

          <div className="mt-5 flex flex-col gap-2 border-t border-[#F51B72]/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-ink-faint">
              AutoStock BD · Workspace settings
            </p>

            <div className="flex items-center gap-2 text-[9px] text-ink-faint">
              <span
                className="size-1.5 rounded-full shadow-[0_0_8px_rgba(245,27,114,0.4)]"
                style={{ backgroundColor: ACCENT }}
              />

              Protected workspace
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}