"use client";

import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1e1e22 0%, #0b0b0e 100%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* Top edge highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />
        {/* Purple rim glow at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, rgba(146,129,247,0.3), transparent)",
          }}
        />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <defs>
            <linearGradient id="navBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CBC2FF" />
              <stop offset="100%" stopColor="#9281F7" />
            </linearGradient>
          </defs>
          <rect x="1" y="6" width="3.5" height="9" rx="0.75" fill="url(#navBarGrad)" />
          <rect x="6.25" y="2" width="3.5" height="13" rx="0.75" fill="url(#navBarGrad)" />
          <rect x="11.5" y="4" width="3.5" height="11" rx="0.75" fill="url(#navBarGrad)" />
        </svg>
      </div>
      <span className="text-white font-normal text-lg tracking-tight">
        Charta
      </span>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Charta home">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
            Pricing
          </a>
          <Link href="/developers" className="text-sm text-white/60 hover:text-white transition-colors">
            Developers
          </Link>
        </div>

        <a
          href="#hero"
          className="glass-button-purple px-5 py-2.5 rounded-2xl text-sm font-medium transition-all hover:scale-[1.02]"
        >
          Get early access
        </a>
      </div>
    </nav>
  );
}
