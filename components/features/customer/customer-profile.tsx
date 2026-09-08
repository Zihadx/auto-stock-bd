
"use client";

import {
  Bell,
  Check,
  Globe2,
  Heart,
  LockKeyhole,
  Mail,
  Monitor,
  Moon,
  Palette,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useState, type ReactNode } from "react";

import { ACCENT, GOLD } from "@/components/ui/tokens";
import { cn } from "@/lib/utils";
import { CustomerSettingSection, CustomerSettingsSidebar } from "./settings-sidebar";



function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-[#F51B72]/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F8C3E1]/20 to-transparent"
      />

      <div className="relative">{children}</div>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#F51B72]/8 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#F51B72]/10 bg-[#F51B72]/[0.035]">
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
      onClick={() => onChange(!checked)}
      className={cn(
        "group relative h-7 w-12 shrink-0 rounded-full border p-[3px]",
        "outline-none transition-all duration-300 ease-out",
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
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[2px] rounded-full bg-white/[0.08]",
          "transition-opacity duration-300",
          checked ? "opacity-100" : "opacity-0",
        )}
      />

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
            checked ? "bg-[#F8C3E1]" : "bg-[#F51B72]/20",
          )}
        />
      </span>
    </button>
  );
}

function SelectField({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
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
        "outline-none transition-all duration-200",
        "hover:border-[#F51B72]/20",
        "focus:border-[#F51B72]/35",
        "focus:ring-2 focus:ring-[#F51B72]/10",
      )}
    >
      {children}
    </select>
  );
}

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

        <div>
          <h2 className="text-[15px] font-semibold tracking-[-0.015em] text-ink">
            {title}
          </h2>
        </div>
      </div>

      <p className="mt-2 pl-[42px] text-[11px] leading-5 text-ink-faint">
        {description}
      </p>
    </div>
  );
}

const sectionIcons = {
  profile: UserRound,
  preferences: Heart,
  notifications: Bell,
  appearance: Palette,
  security: ShieldCheck,
} as const;

export function CustomerSettingsPage() {
  const [activeSection, setActiveSection] =
    useState<CustomerSettingSection>("profile");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [vehicleAlerts, setVehicleAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [marketingNotifications, setMarketingNotifications] = useState(false);

  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("BDT");

  const { theme, setTheme, resolvedTheme } = useTheme();

  const ActiveIcon = sectionIcons[activeSection];

  const currentTheme =
    theme === "system"
      ? `System · ${resolvedTheme === "dark" ? "Dark" : "Light"}`
      : theme === "dark"
        ? "Dark"
        : "Light";

  return (
    <section className="container px-6 mx-auto py-20 sm:py-10 lg:py-40">
      {/* Page heading */}
      <div className="mb-7">
        <div className="flex items-center gap-2">
          <span
            className="size-1.5 rounded-full shadow-[0_0_10px_rgba(245,27,114,0.55)]"
            style={{ backgroundColor: ACCENT }}
          />

          <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink-faint">
            Account
          </span>
        </div>

        <h1 className="mt-3 text-h1 tracking-[-0.035em] text-ink">
          Settings
        </h1>

        <p className="mt-2 max-w-xl text-xs leading-6 text-ink-soft sm:text-[13px]">
          Manage your profile, preferences, notifications, appearance, and
          account security.
        </p>
      </div>

      {/* Main settings dashboard */}
      <div className="grid items-start gap-5 lg:grid-cols-[235px_minmax(0,1fr)]">
        {/* LEFT — Preferences sidebar */}
        <CustomerSettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* RIGHT — Dynamic content */}
        <div className="min-w-0">
          {activeSection === "profile" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Profile"
                description="Manage the personal information associated with your AutoStock account."
              />

              <GlassCard>
                {/* Profile header */}
                <div className="flex flex-col gap-4 border-b border-[#F51B72]/8 px-5 py-5 sm:flex-row sm:items-center">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#F51B72]/20 bg-gradient-to-br from-[#F51B72]/20 via-[#6B102E]/15 to-transparent text-sm font-semibold text-ink shadow-[0_5px_20px_rgba(245,27,114,0.08)]">
                    ZA

                    <span
                      className="absolute -bottom-1 -right-1 size-2.5 rounded-full border-2 border-paper"
                      style={{ backgroundColor: ACCENT }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-ink">
                      Zihad Ahmed
                    </p>

                    <p className="mt-1 text-[10px] text-ink-faint">
                      Customer account · AutoStock BD
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl border border-[#F51B72]/10 bg-[#F51B72]/[0.035] px-3 py-2 text-[10px] font-semibold text-ink transition-all hover:border-[#F51B72]/25 hover:bg-[#F51B72]/[0.07]"
                  >
                    Edit profile
                  </button>
                </div>

                <div className="px-5">
                  <SettingRow
                    icon={UserRound}
                    title="Full name"
                    description="Your name displayed on your account and vehicle enquiries."
                  >
                    <span className="text-xs font-medium text-ink">
                      Zihad Ahmed
                    </span>
                  </SettingRow>

                  <SettingRow
                    icon={Mail}
                    title="Email address"
                    description="Primary email used for account communication."
                  >
                    <span className="max-w-[220px] truncate text-xs font-medium text-ink">
                      zihad@example.com
                    </span>
                  </SettingRow>

                  <SettingRow
                    icon={Globe2}
                    title="Language"
                    description="Choose the language used across your account."
                  >
                    <SelectField
                      value={language}
                      onChange={setLanguage}
                    >
                      <option value="English">English</option>
                      <option value="বাংলা">বাংলা</option>
                    </SelectField>
                  </SettingRow>

                  <SettingRow
                    icon={Globe2}
                    title="Currency"
                    description="Choose how vehicle prices are displayed."
                  >
                    <SelectField
                      value={currency}
                      onChange={setCurrency}
                    >
                      <option value="BDT">BDT · ৳</option>
                      <option value="USD">USD · $</option>
                    </SelectField>
                  </SettingRow>
                </div>
              </GlassCard>

              {/* Profile summary */}
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <GlassCard className="p-4">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                    Saved vehicles
                  </p>

                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-ink">
                    12
                  </p>

                  <p className="mt-1 text-[9px] text-ink-faint">
                    Vehicles in your shortlist
                  </p>
                </GlassCard>

                <GlassCard className="p-4">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                    Enquiries
                  </p>

                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-ink">
                    04
                  </p>

                  <p className="mt-1 text-[9px] text-ink-faint">
                    Active vehicle enquiries
                  </p>
                </GlassCard>

                <GlassCard className="p-4">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                    Account
                  </p>

                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-ink">
                    Active
                  </p>

                  <p className="mt-1 text-[9px] text-ink-faint">
                    Your account is protected
                  </p>
                </GlassCard>
              </div>
            </>
          )}

          {activeSection === "preferences" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Preferences"
                description="Personalize how you discover, save, and compare vehicles."
              />

              <GlassCard className="px-5">
                <SettingRow
                  icon={Heart}
                  title="Saved vehicles"
                  description="Keep your favorite vehicles available from your account."
                >
                  <span className="rounded-full border border-[#F51B72]/15 bg-[#F51B72]/[0.045] px-2.5 py-1 text-[9px] font-semibold text-ink-soft">
                    Enabled
                  </span>
                </SettingRow>

                <SettingRow
                  icon={Bell}
                  title="Vehicle availability alerts"
                  description="Get notified when a saved vehicle becomes available."
                >
                  <Toggle
                    checked={vehicleAlerts}
                    onChange={setVehicleAlerts}
                  />
                </SettingRow>

                <SettingRow
                  icon={Bell}
                  title="Price change alerts"
                  description="Receive an alert when the price of a saved vehicle changes."
                >
                  <Toggle
                    checked={priceAlerts}
                    onChange={setPriceAlerts}
                  />
                </SettingRow>

                <SettingRow
                  icon={Globe2}
                  title="Preferred vehicle type"
                  description="Used to personalize recommendations."
                >
                  <SelectField
                    value="All vehicles"
                    onChange={() => {}}
                  >
                    <option>All vehicles</option>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Hatchback</option>
                    <option>Pickup</option>
                  </SelectField>
                </SettingRow>
              </GlassCard>
            </>
          )}

          {activeSection === "notifications" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Notifications"
                description="Choose which updates and activity you want to receive."
              />

              <GlassCard className="px-5">
                <SettingRow
                  icon={Mail}
                  title="Email notifications"
                  description="Receive important account and enquiry updates."
                >
                  <Toggle
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                  />
                </SettingRow>

                <SettingRow
                  icon={Bell}
                  title="Vehicle alerts"
                  description="Receive updates about saved vehicles."
                >
                  <Toggle
                    checked={vehicleAlerts}
                    onChange={setVehicleAlerts}
                  />
                </SettingRow>

                <SettingRow
                  icon={Bell}
                  title="Price alerts"
                  description="Receive price change notifications."
                >
                  <Toggle
                    checked={priceAlerts}
                    onChange={setPriceAlerts}
                  />
                </SettingRow>

                <SettingRow
                  icon={Bell}
                  title="Offers and recommendations"
                  description="Receive selected AutoStock recommendations."
                >
                  <Toggle
                    checked={marketingNotifications}
                    onChange={setMarketingNotifications}
                  />
                </SettingRow>
              </GlassCard>
            </>
          )}

          {activeSection === "appearance" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Appearance"
                description="Control the visual environment of your AutoStock account."
              />

              <GlassCard className="p-5">
                <div className="mb-4">
                  <p className="text-[12px] font-semibold text-ink">
                    Interface theme
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-ink-faint">
                    Choose a fixed theme or follow your device preference.
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
                          "relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300",
                          selected
                            ? "border-[#F51B72]/25 bg-gradient-to-br from-[#F51B72]/13 via-[#F51B72]/6 to-[#6B102E]/5 shadow-[0_6px_22px_rgba(245,27,114,0.08)]"
                            : "border-[#F51B72]/8 bg-[#F51B72]/[0.025] hover:border-[#F51B72]/18 hover:bg-[#F51B72]/[0.05]",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex size-8 items-center justify-center rounded-lg border border-[#F51B72]/10 bg-[#F51B72]/[0.035]">
                            <Icon
                              className="size-[14px]"
                              style={{ color: ACCENT }}
                            />
                          </div>

                          {selected && (
                            <span
                              className="flex size-5 items-center justify-center rounded-full"
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

          {activeSection === "security" && (
            <>
              <SectionIntro
                icon={ActiveIcon}
                title="Security"
                description="Keep your customer account protected and review access."
              />

              <div className="space-y-4">
                <GlassCard className="px-5">
                  <SettingRow
                    icon={LockKeyhole}
                    title="Password"
                    description="Update the password used to access your account."
                  >
                    <button
                      type="button"
                      className="rounded-xl border border-[#F51B72]/10 bg-[#F51B72]/[0.035] px-3 py-2 text-[10px] font-semibold text-ink transition-all hover:border-[#F51B72]/25 hover:bg-[#F51B72]/[0.07]"
                    >
                      Change password
                    </button>
                  </SettingRow>

                  <SettingRow
                    icon={ShieldCheck}
                    title="Two-factor authentication"
                    description="Add another verification step when signing in."
                  >
                    <span className="rounded-full border border-[#DAA428]/20 bg-[#DAA428]/[0.06] px-2.5 py-1 text-[9px] font-semibold text-ink-soft">
                      Not configured
                    </span>
                  </SettingRow>

                  <SettingRow
                    icon={ShieldCheck}
                    title="Active sessions"
                    description="Review devices currently signed into your account."
                  >
                    <button
                      type="button"
                      className="text-[10px] font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-[#F51B72]"
                    >
                      Review sessions
                    </button>
                  </SettingRow>
                </GlassCard>

                <div className="rounded-2xl border border-[#DAA428]/15 bg-gradient-to-r from-[#DAA428]/[0.055] via-[#F51B72]/[0.025] to-transparent px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#DAA428]/25 bg-[#DAA428]/[0.06]">
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
                        Enable two-factor authentication to add another layer
                        of protection to your account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Bottom status */}
          <div className="mt-5 flex flex-col gap-2 border-t border-[#F51B72]/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-ink-faint">
              AutoStock BD · Account settings
            </p>

            <div className="flex items-center gap-2 text-[9px] text-ink-faint">
              <span
                className="size-1.5 rounded-full shadow-[0_0_8px_rgba(245,27,114,0.4)]"
                style={{ backgroundColor: ACCENT }}
              />

              Account protected
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

