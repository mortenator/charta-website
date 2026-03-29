import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm font-normal">Charta</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-sm transition-colors"
            style={{ color: "#9281F7" }}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm transition-colors"
            style={{ color: "#9281F7" }}
          >
            Terms
          </Link>
          <Link
            href="/developers"
            className="text-sm transition-colors"
            style={{ color: "#9281F7" }}
          >
            Developers
          </Link>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Charta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
