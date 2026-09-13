"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Car,
  Clock3,
  Gauge,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

import type {
  ChatMessage as ChatMessageType,
  VehicleCardData,
} from "@/lib/ai-concierge/engine";

/* ---------- Vehicle Card ---------- */

export function VehicleCard({
  vehicle,
  onAction,
  onNavigate,
}: {
  vehicle: VehicleCardData;
  onAction: (value: string) => void;
  onNavigate?: () => void;
}) {
  const isAvailable =
    vehicle.status.toLowerCase() === "available";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.045] shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover transition-transform duration-700 hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

        {/* Status */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isAvailable
                ? "bg-emerald-400"
                : "bg-amber-400"
            }`}
          />

          {vehicle.status}
        </div>

        {/* Match */}
        {vehicle.match ? (
          <div className="absolute right-3 top-3 rounded-full border border-[#CBA36B]/25 bg-black/60 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E6C78F] backdrop-blur-md">
            {vehicle.match}% match
          </div>
        ) : null}

        {/* Image content */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/55">
            {vehicle.reason ?? "Current inventory"}
          </p>

          <h4 className="mt-1 text-base font-semibold tracking-[-0.02em] text-white">
            {vehicle.name}
          </h4>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
              Starting from
            </p>

            <p className="mt-1 text-xl font-semibold text-white">
              {vehicle.priceLabel}
            </p>

            {vehicle.emiLabel ? (
              <p className="mt-0.5 text-[9px] text-[#CBA36B]/80">
                {vehicle.emiLabel}
              </p>
            ) : null}
          </div>

          <Link
            href={vehicle.href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#CBA36B]"
          >
            View vehicle
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat
            icon={<Clock3 size={12} />}
            value={vehicle.mileageLabel}
            label="Mileage"
          />

          <Stat
            icon={<Gauge size={12} />}
            value={vehicle.transmission}
            label="Gearbox"
          />

          <Stat
            icon={<Car size={12} />}
            value={vehicle.fuelType}
            label="Fuel"
          />
        </div>

        {/* Ask */}
        <button
          type="button"
          onClick={() =>
            onAction(
              `Tell me more about the ${vehicle.name}`,
            )
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#CBA36B]/20 bg-[#CBA36B]/[0.07] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E8D4AA] transition hover:bg-[#CBA36B]/[0.12]"
        >
          Ask about this vehicle
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
}

/* ---------- Stat ---------- */

function Stat({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-2.5 py-2.5">
      <div className="flex items-center gap-1.5 text-[#CBA36B]">
        {icon}
      </div>

      <p className="mt-1 truncate text-[10px] font-medium text-white/75">
        {value}
      </p>

      <p className="mt-0.5 text-[8px] uppercase tracking-[0.1em] text-white/35">
        {label}
      </p>
    </div>
  );
}

/* ---------- Typing Indicator ---------- */

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <div className="flex items-center gap-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-3">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            animate={{
              y: [0, -3, 0],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.14,
            }}
            className="h-1.5 w-1.5 rounded-full bg-[#CBA36B]"
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- Message Bubble ---------- */

export function MessageBubble({
  message,
  onSuggestion,
  onNavigate,
}: {
  message: ChatMessageType;
  onSuggestion: (value: string) => void;
  onNavigate?: () => void;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
        x: isUser ? 10 : -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[90%] flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Sender */}
        <div className="mb-1.5 flex items-center gap-2 px-1">
          {!isUser ? (
            <>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CBA36B]/10 text-[#CBA36B]">
                <Bot size={10} />
              </div>

              <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/45">
                AutoStock AI
              </span>
            </>
          ) : (
            <>
              <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/35">
                You
              </span>

              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.07] text-white/60">
                <User size={10} />
              </div>
            </>
          )}
        </div>

        {/* Message */}
        <div
          className={`rounded-[18px] px-4 py-3.5 text-[12px] leading-[1.65] sm:text-[13px] ${
            isUser
              ? "rounded-tr-[5px] border border-[#CBA36B]/20 bg-[#CBA36B]/[0.10] text-white"
              : "rounded-tl-[5px] border border-white/[0.07] bg-white/[0.035] text-white/78"
          }`}
        >
          {message.content}
        </div>

        {/* Vehicle */}
        {!isUser && message.vehicle ? (
          <div className="w-full">
            <VehicleCard
              vehicle={message.vehicle}
              onAction={onSuggestion}
              onNavigate={onNavigate}
            />
          </div>
        ) : null}

        {/* Suggestions */}
        {!isUser && message.suggestions?.length ? (
          <div className="mt-3 flex w-full flex-wrap gap-2">
            {message.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSuggestion(suggestion)}
                className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-left text-[9px] font-medium uppercase tracking-[0.08em] text-white/55 transition hover:border-[#CBA36B]/25 hover:bg-[#CBA36B]/[0.07] hover:text-[#E8D4AA]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}

        {/* Timestamp */}
        <span className="mt-1.5 px-1 text-[8px] text-white/25">
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  );
}