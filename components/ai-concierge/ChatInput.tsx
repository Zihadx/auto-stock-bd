"use client";

import { Bot, Paperclip, Send } from "lucide-react";
import { FormEvent, KeyboardEvent, RefObject } from "react";

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
  inputRef,
  quickPrompts,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  quickPrompts: string[];
}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  return (
    <div className="shrink-0 border-t border-white/[0.06] bg-[#090806]/90 px-3 pb-2 pt-3">
      <div className="mb-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onSubmit(prompt)}
            className="shrink-0 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[8px] font-medium text-white/40 transition hover:border-[#CBA36B]/20 hover:bg-[#CBA36B]/[0.05] hover:text-[#E4CCA0] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-1.5 transition focus-within:border-[#CBA36B]/25 focus-within:bg-white/[0.045]"
      >
        <button
          type="button"
          aria-label="Attach"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white/25 transition hover:bg-white/[0.05] hover:text-white/55 sm:flex"
        >
          <Paperclip size={14} />
        </button>

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "AutoStock is thinking..." : "Ask about a vehicle..."}
          aria-label="Message the AutoStock concierge"
          disabled={disabled}
          className="w-full min-w-0 flex-1 bg-transparent px-2 py-2.5 text-[11px] text-white outline-none placeholder:text-white/25 disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={!value.trim() || disabled}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#CBA36B] text-[#17120B] transition hover:bg-[#D8B97F] disabled:cursor-not-allowed disabled:opacity-25"
        >
          <Send size={14} />
        </button>
      </form>

      <div className="flex items-center justify-between px-1 pt-2">
        <div className="flex items-center gap-1.5">
          <Bot size={9} className="text-[#CBA36B]/70" />
          <span className="text-[7px] uppercase tracking-[0.1em] text-white/20">AI concierge</span>
        </div>
        <span className="text-[7px] text-white/20">Live inventory-backed</span>
      </div>
    </div>
  );
}