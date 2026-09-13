"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, Minus, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ChatMessage,
  ConciergeContext,
  getConciergeReply,
  getInitialGreeting,
} from "@/lib/ai-concierge/engine";

import { MessageBubble, TypingIndicator } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

const EASE = [0.22, 1, 0.36, 1] as const;

const triggerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const now = () => timeFormatter.format(new Date());

type Greeting = Awaited<ReturnType<typeof getInitialGreeting>>;

export default function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [booting, setBooting] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quickPrompts, setQuickPrompts] = useState<string[]>([]);

  const contextRef = useRef<ConciergeContext>({});
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const nextId = (role: "user" | "assistant") => {
    idRef.current += 1;
    return `${role}-${idRef.current}`;
  };

  const applyGreeting = useCallback((g: Greeting) => {
    setMessages([
      {
        id: nextId("assistant"),
        role: "assistant",
        content: g.content,
        timestamp: now(),
        suggestions: g.suggestions,
      },
    ]);

    setQuickPrompts(g.suggestions);
    setBooting(false);
  }, []);

  // Boot: load a real greeting + suggestions from actual inventory once.
  useEffect(() => {
    let cancelled = false;

    getInitialGreeting().then((g) => {
      if (!cancelled) {
        applyGreeting(g);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [applyGreeting]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const submitMessage = async (raw: string) => {
    const value = raw.trim();

    if (!value || typing) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: nextId("user"),
        role: "user",
        content: value,
        timestamp: now(),
      },
    ]);

    setInput("");
    setTyping(true);

    const [reply] = await Promise.all([
      getConciergeReply(value, contextRef.current),
      new Promise((resolve) => setTimeout(resolve, 500)),
    ]);

    if (reply.nextVehicleId) {
      contextRef.current.lastVehicleId = reply.nextVehicleId;
    }

    setMessages((current) => [
      ...current,
      {
        id: nextId("assistant"),
        role: "assistant",
        content: reply.content,
        timestamp: now(),
        vehicle: reply.vehicle,
        suggestions: reply.suggestions,
        showActions: reply.showActions,
      },
    ]);

    setTyping(false);
  };

  const resetConversation = async () => {
    contextRef.current = {};
    setTyping(false);
    setBooting(true);

    const greeting = await getInitialGreeting();

    applyGreeting(greeting);
  };

  const openChat = () => {
    setOpen(true);
    setMinimized(false);

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 250);
  };

  // Close the concierge when navigating to a vehicle page.
  const closeOnNavigate = () => {
    setOpen(false);
  };

  const unread = !open && messages.length > 1;

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            variants={triggerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={openChat}
            className="fixed bottom-5 right-4 z-[80] flex items-center gap-3 rounded-full border border-[#CBA36B]/25 bg-[#0B0907]/90 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:bottom-6 sm:right-6"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#CBA36B]/10 text-[#DCC18B]">
              <Bot size={16} />

              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [1, 0.4, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0B0907] bg-emerald-400"
              />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#CBA36B]">
                AutoStock
              </p>

              <p className="mt-0.5 text-[11px] font-medium text-white/75">
                AI Concierge
              </p>
            </div>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E5453E] px-1 text-[7px] font-bold text-white">
              {unread ? "1" : "✦"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: 0.3,
              ease: EASE,
            }}
            className="fixed inset-x-4 bottom-4 z-[90] mx-auto flex max-h-[70dvh] w-auto max-w-[400px] flex-col overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#090806]/95 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[640px] sm:w-[400px] sm:max-h-[calc(100dvh-48px)]"
          >
            {/* Header */}
            <div className="shrink-0 border-b border-white/[0.07] bg-white/[0.025]">
              <div className="flex items-center justify-between px-4 py-3.5 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#CBA36B]/20 bg-[#CBA36B]/[0.07] text-[#DCC18B]">
                    <Bot size={17} />

                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#090806] bg-emerald-400" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-[12px] font-semibold tracking-[-0.01em] text-white">
                        AutoStock Concierge
                      </h3>

                      <span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.1em] text-emerald-300 sm:inline-flex">
                        Online
                      </span>
                    </div>

                    <p className="mt-0.5 text-[9px] text-white/35">
                      AI-powered vehicle advisor
                    </p>
                  </div>
                </div>

                {/* Header actions */}
                <div className="flex items-center gap-1">
                  {/* Reset */}
                  <button
                    type="button"
                    onClick={resetConversation}
                    aria-label="Reset conversation"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/30 transition hover:bg-white/[0.05] hover:text-white/65"
                  >
                    <RotateCcw size={14} />
                  </button>

                  {/* Minimize / Expand */}
                  <button
                    type="button"
                    onClick={() => setMinimized((current) => !current)}
                    aria-label={
                      minimized ? "Expand chat" : "Minimize chat"
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/30 transition hover:bg-white/[0.05] hover:text-white/65"
                  >
                    {minimized ? (
                      <ChevronDown size={14} />
                    ) : (
                      <Minus size={14} />
                    )}
                  </button>

                  {/* Close */}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/30 transition hover:bg-white/[0.05] hover:text-white/65"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {!minimized && (
                <div className="flex items-center gap-2 border-t border-white/[0.05] px-4 py-2.5 sm:px-5">
                  <Bot size={11} className="shrink-0 text-[#CBA36B]" />

                  <p className="truncate text-[8px] uppercase tracking-[0.12em] text-white/30">
                    Live inventory • Vehicle matching • Financing
                  </p>

                  <span className="ml-auto flex shrink-0 items-center gap-1 text-[8px] text-emerald-300/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Ready
                  </span>
                </div>
              )}
            </div>

            {/* Minimized state */}
            {minimized ? (
              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="flex items-center justify-between px-5 py-4 text-left"
              >
                <div>
                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/35">
                    Conversation
                  </p>

                  <p className="mt-1 text-[11px] text-white/65">
                    {messages.length} messages
                  </p>
                </div>

                <ChevronDown size={15} className="text-[#CBA36B]" />
              </button>
            ) : (
              <>
                {/* Messages */}
                <div
                  ref={messagesRef}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-5 sm:px-4 sm:py-6 [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-width:thin]"
                >
                  <div className="mb-5 flex items-center justify-center gap-3">
                    <div className="h-px flex-1 bg-white/[0.045]" />

                    <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-white/20">
                      Today
                    </span>

                    <div className="h-px flex-1 bg-white/[0.045]" />
                  </div>

                  {booting ? (
                    <div className="animate-pulse space-y-3">
                      <div className="h-16 rounded-2xl bg-white/[0.04]" />
                      <div className="h-16 w-2/3 rounded-2xl bg-white/[0.04]" />
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {messages.map((message) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          onSuggestion={submitMessage}
                          onNavigate={closeOnNavigate}
                        />
                      ))}

                      {typing && <TypingIndicator />}
                    </div>
                  )}
                </div>

                {/* Input */}
                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSubmit={submitMessage}
                  disabled={typing || booting}
                  inputRef={inputRef}
                  quickPrompts={quickPrompts}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}