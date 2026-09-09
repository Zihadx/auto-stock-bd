"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";


import { A, AuthVars, AuthVisualPanel, BrandMark, Field, IgnitionButton, SocialAuthRow } from "@/components/auth/shared";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { ACCENT, GOLD, PAPER } from "@/components/ui/tokens";

/* Password strength — four hairline segments, a functional readout
   rather than decoration: it changes what the person does next (keep
   typing) rather than just filling space. Kept local since only the
   sign-up form needs it. */

function scorePassword(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  return pw.length === 0 ? -1 : score;
}

const STRENGTH_LABEL = ["Too short", "Weak", "Fair", "Good", "Strong"];

function PasswordStrength({ password }: { password: string }) {
  const score = scorePassword(password);
  if (score < 0) return null;
  return (
    <div className="mt-2.5 flex items-center gap-2">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-[3px] flex-1 rounded-full transition-colors duration-300" style={{ backgroundColor: i <= score ? GOLD : A.borderSoft }} />
        ))}
      </div>
      <span className="text-[9px] font-medium uppercase tracking-[0.14em]" style={{ color: A.textFaint }}>
        {STRENGTH_LABEL[score + 1]}
      </span>
    </div>
  );
}

export function SignUpExperience() {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "starting">("idle");

  const canSubmit = useMemo(() => Boolean(name && email && password.length >= 8 && agreed), [name, email, password, agreed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("starting");
    // TODO: wire to real account creation — this local state only drives
    // the button's animation; replace with your sign-up call and route to
    // a verification step on success.
  };

  return (
    <>
      <AuthVars />
      <div className="flex min-h-screen w-full" style={{ backgroundColor: A.panelBg }}>
        <AuthVisualPanel
          tag="Request Access"
          headline="Every member starts with a request."
          subtext="Create an account to request access to reserved inventory, dealer-direct pricing, and listings that never reach the public site."
          stats={[
            { value: "Free", label: "To request access" },
            { value: "24H", label: "Verification time" },
            { value: "100%", label: "Verified members" },
          ]}
        />

        <div className="flex w-full flex-1 items-center justify-center px-6 py-16 sm:px-10 lg:w-[54%]">
          <div className="w-full max-w-[380px]">
            <div className="mb-10 lg:hidden">
              <BrandMark tone="form" />
            </div>

            <h2 className="text-[26px] font-light tracking-tight" style={{ color: A.text, fontFamily: "var(--font-geist)" }}>
              Create an account
            </h2>
            <p className="mt-2 text-[13px]" style={{ color: A.textMuted }}>
              Takes a minute — verification usually completes within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
              <Field id={`${uid}-name`} label="Full name" type="text" icon={User} value={name} onChange={setName} autoComplete="name" placeholder="Your name" />

              <Field
                id={`${uid}-email`}
                label="Email"
                type="email"
                icon={Mail}
                value={email}
                onChange={setEmail}
                autoComplete="email"
                placeholder="you@example.com"
              />

              <div>
                <Field
                  id={`${uid}-password`}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  icon={Lock}
                  value={password}
                  onChange={setPassword}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
                      style={{ color: A.textFaint }}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.6} /> : <Eye className="h-4 w-4" strokeWidth={1.6} />}
                    </button>
                  }
                />
                <PasswordStrength password={password} />
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-[12px] leading-relaxed" style={{ color: A.textMuted }}>
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-200"
                  style={{ borderColor: agreed ? ACCENT : A.fieldBorder, backgroundColor: agreed ? ACCENT : "transparent" }}
                >
                  {agreed && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                      <path d="M2.5 6.2L4.7 8.4L9.5 3.4" stroke={PAPER} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input type="checkbox" className="sr-only" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                I agree to the{" "}
                <Link href="/terms" className="underline underline-offset-2" style={{ color: A.text }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2" style={{ color: A.text }}>
                  Privacy Policy
                </Link>
              </label>

              <IgnitionButton label={status === "starting" ? "Creating account…" : "Create account"} pulsing={status === "starting"} disabled={!canSubmit} />
            </form>

            <SocialAuthRow dividerLabel="Or sign up with" />

            <p className="mt-9 text-center text-[12px]" style={{ color: A.textMuted }}>
              Already have access?{" "}
              <Link href="/sign-in" className="font-medium" style={{ color: ACCENT }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}