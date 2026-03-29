"use client";

import { useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type FormState = "idle" | "loading" | "success" | "error" | "duplicate" | "invalid" | "ratelimit";

// Client-side UX guard only — resets on page refresh.
// This is intentional: the goal is to prevent accidental double-submits and
// minor UI spam, not adversarial abuse. Server-side enforcement lives in the
// Supabase schema (UNIQUE constraint on email + DB-level email format CHECK).
const MAX_ATTEMPTS = 5;

// Allowed sources — prevents arbitrary strings from being written to DB
const ALLOWED_SOURCES = ["website", "blog", "developers", "partner"] as const;
type WaitlistSource = (typeof ALLOWED_SOURCES)[number];

// Module-level constant — avoid re-creating on every handleSubmit call
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({
  className,
  source = "website",
}: {
  className?: string;
  source?: WaitlistSource;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const attemptsRef = useRef(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attemptsRef.current >= MAX_ATTEMPTS) {
      setState("ratelimit");
      return;
    }

    const trimmed = email.trim();
    if (!trimmed) return;

    // Defense in depth beyond browser type="email" validation
    if (!EMAIL_REGEX.test(trimmed)) {
      setState("invalid");
      return;
    }

    // Reset any prior error state before loading
    setState("loading");

    attemptsRef.current += 1;

    const { error } = await getSupabase()
      .from("charta_waitlist")
      .insert({ email: trimmed.toLowerCase(), source });

    if (error) {
      if (error.code === "23505") {
        setState("duplicate");
      } else {
        setState("error");
      }
      return;
    }

    // Reset counter on success — a legitimate user correcting a typo
    // shouldn't be penalised by their previous (failed) attempts.
    attemptsRef.current = 0;
    setState("success");
  };

  if (state === "success" || state === "duplicate") {
    const message =
      state === "success"
        ? "You're on the list! We'll be in touch."
        : "You're already on the list!";
    return (
      <div className={className}>
        <p className="text-sm text-white/70">
          <span style={{ color: "#9281F7" }}>✓</span> {message}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch gap-3"
      >
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle" && state !== "loading") setState("idle");
          }}
          className="flex-1 min-w-0 rounded-2xl px-5 py-3.5 text-sm text-white/90 placeholder:text-white/30 outline-none transition-all focus:ring-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(146,129,247,0.4)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="glass-button-purple px-6 py-3.5 rounded-2xl text-sm font-medium transition-all hover:scale-[1.04] disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap"
        >
          {state === "loading" ? "Joining…" : "Get early access"}
        </button>
      </form>
      {state === "invalid" && (
        <p className="text-sm text-red-400/70 mt-2">
          Please enter a valid email address.
        </p>
      )}
      {state === "error" && (
        <p className="text-sm text-red-400/70 mt-2">
          Something went wrong. Try again.
        </p>
      )}
      {state === "ratelimit" && (
        <p className="text-sm text-red-400/70 mt-2">
          Too many attempts. Refresh the page and try again.
        </p>
      )}
    </div>
  );
}
