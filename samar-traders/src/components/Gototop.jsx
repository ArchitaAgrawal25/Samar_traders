import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef(null);
  const tooltipRef = useRef(null);
  const isAnimating = useRef(false);

  // ── Scroll visibility ──────────────────────────────────────
  useEffect(() => {
    const THRESHOLD = 300;

    const onScroll = () => {
      const shouldShow = window.scrollY > THRESHOLD;
      if (shouldShow === visible) return;
      setVisible(shouldShow);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  // ── Button appear / disappear animation ───────────────────
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    if (visible) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18, scale: 0.82, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.6)",
          onComplete: () => { el.style.pointerEvents = "auto"; },
        }
      );
    } else {
      el.style.pointerEvents = "none";
      gsap.to(el, {
        opacity: 0,
        y: 14,
        scale: 0.85,
        duration: 0.28,
        ease: "power2.in",
      });
    }
  }, [visible]);

  // ── Tooltip show / hide animation ────────────────────────
  useEffect(() => {
    const tip = tooltipRef.current;
    if (!tip) return;

    if (hovered) {
      gsap.fromTo(
        tip,
        { opacity: 0, y: 6, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          ease: "power2.out",
          onComplete: () => { tip.style.pointerEvents = "auto"; },
        }
      );
    } else {
      tip.style.pointerEvents = "none";
      gsap.to(tip, {
        opacity: 0,
        y: 6,
        duration: 0.16,
        ease: "power2.in",
      });
    }
  }, [hovered]);

  // ── Click ─────────────────────────────────────────────────
  const handleClick = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap
      .timeline({ onComplete: () => { isAnimating.current = false; } })
      .to(btnRef.current, { scale: 0.9, duration: 0.1, ease: "power2.in" })
      .to(btnRef.current, { scale: 1, duration: 0.3, ease: "back.out(2)" });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Hover ─────────────────────────────────────────────────
  const handleMouseEnter = () => {
    if (!visible) return;
    setHovered(true);
    gsap.to(btnRef.current, { y: -3, scale: 1.08, duration: 0.25, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(btnRef.current, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
  };

  return (
    /* Anchor wrapper — fixed position, groups tooltip above button */
    <div
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-6 md:right-8 z-[9998] flex flex-col items-center gap-2"
      style={{ pointerEvents: "none" }} /* let children manage pointer-events individually */
    >
      {/* ── Tooltip ─────────────────────────────────────────── */}
      <div
        ref={tooltipRef}
        role="tooltip"
        aria-hidden={!hovered}
        className={[
          /* layout */
          "flex items-center gap-1.5 opacity-0",
          /* shape */
          "rounded-full px-3.5 py-2",
          /* dark luxury glass */
          "bg-[rgba(18,18,18,0.92)] border border-white/[0.07]",
          "backdrop-blur-xl",
          /* shadow */
          "shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]",
          /* text */
          "font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-white/80",
          /* no pointer interaction until shown */
          "pointer-events-none select-none whitespace-nowrap",
        ].join(" ")}
      >
        {/* tiny chevron-up icon */}
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/50 shrink-0"
          aria-hidden="true"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
        Go to top
      </div>

      {/* ── Button ──────────────────────────────────────────── */}
      <button
        ref={btnRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Go to top"
        className={[
          /* size & shape */
          "relative w-12 h-12 rounded-full shrink-0",
          /* dark luxury glass */
          "bg-[linear-gradient(135deg,rgba(18,18,18,0.96)_0%,rgba(32,32,32,0.94)_100%)]",
          "border border-white/[0.08]",
          "backdrop-blur-[18px]",
          /* shadow */
          "shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_18px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.06)]",
          /* layout */
          "flex items-center justify-center",
          /* pointer */
          "cursor-pointer pointer-events-auto",
          /* a11y focus ring */
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          /* overflow for pseudo-glow */
          "overflow-hidden",
          /* prevent text selection */
          "select-none",
        ].join(" ")}
      >
        {/* radial inner glow */}
        <span
          aria-hidden="true"
          className="absolute inset-[-4px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 72%)",
            filter: "blur(6px)",
          }}
        />

        {/* arrow icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f5f5f5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}