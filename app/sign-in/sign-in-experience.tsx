"use client";

import { useId, useState } from "react";
import Link from "next/link";


import { A, AuthVars, AuthVisualPanel, BrandMark, Field, IgnitionButton, SocialAuthRow } from "@/components/auth/shared";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { ACCENT } from "@/components/ui/tokens";

export function SignInExperience() {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<"idle" | "starting">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("starting");
    // TODO: wire to real auth — this local state only drives the button's
    // ignition animation; replace with your sign-in call and route on success.
  };

  return (
    <>
      <AuthVars />
      <div className="flex min-h-screen w-full" style={{ backgroundColor: A.panelBg }}>
        <AuthVisualPanel
          tag="Member Access"
          headline="Some collections aren't browsed. They're unlocked."
          subtext="Sign in to view reserved inventory, saved vehicles, and private listings curated for verified members."
          stats={[
            { value: "3,400+", label: "Vehicles listed" },
            { value: "182", label: "Verified dealers" },
            { value: "24H", label: "Concierge response" },
          ]}
        />

        <div className="flex w-full flex-1 items-center justify-center px-6 py-16 sm:px-10 lg:w-[54%]">
          <div className="w-full max-w-[380px]">
            <div className="mb-10 lg:hidden">
              <BrandMark tone="form" />
            </div>

            <h2 className="text-[26px] font-light tracking-tight" style={{ color: A.text, fontFamily: "var(--font-geist)" }}>
              Sign in
            </h2>
            <p className="mt-2 text-[13px]" style={{ color: A.textMuted }}>
              Enter your credentials to access your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
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

              <Field
                id={`${uid}-password`}
                label="Password"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                value={password}
                onChange={setPassword}
                autoComplete="current-password"
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

              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-2.5 text-[12px]" style={{ color: A.textMuted }}>
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-[5px] border transition-colors duration-200"
                    style={{ borderColor: remember ? ACCENT : A.fieldBorder, backgroundColor: remember ? ACCENT : "transparent" }}
                  >
                    {remember && (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                        <path d="M2.5 6.2L4.7 8.4L9.5 3.4" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <input type="checkbox" className="sr-only" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Keep me signed in
                </label>
                <Link href="/forgot-password" className="text-[12px] transition-colors hover:opacity-80" style={{ color: ACCENT }}>
                  Forgot password?
                </Link>
              </div>

              <IgnitionButton label={status === "starting" ? "Signing in…" : "Sign in"} pulsing={status === "starting"} />
            </form>

            <SocialAuthRow dividerLabel="Or continue with" />

            <p className="mt-9 text-center text-[12px]" style={{ color: A.textMuted }}>
              New to AutoStock?{" "}
              <Link href="/sign-up" className="font-medium" style={{ color: ACCENT }}>
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}