import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const THRESHOLD = 300;

    const onScroll = () => {
      const shouldShow = window.scrollY > THRESHOLD;

      if (shouldShow === visible) return;

      setVisible(shouldShow);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [visible]);

  useEffect(() => {
    const el = btnRef.current;

    if (!el) return;

    if (visible) {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 18,
          scale: 0.82,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.6)",
          onComplete: () => {
            el.style.pointerEvents = "auto";
          },
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

  const handleClick = () => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    gsap
      .timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      })
      .to(btnRef.current, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.in",
      })
      .to(btnRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
      });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMouseEnter = () => {
    if (!visible) return;

    gsap.to(btnRef.current, {
      y: -3,
      scale: 1.08,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Go to top"
      className="sm:bottom-8 sm:right-6 md:right-8"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "20px",
        zIndex: 9998,
        opacity: 0,
        pointerEvents: "none",

        width: "48px",
        height: "48px",
        borderRadius: "9999px",

        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(135deg, rgba(18,18,18,0.96) 0%, rgba(32,32,32,0.94) 100%)",

        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.45), 0 0 18px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",

        cursor: "pointer",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        userSelect: "none",
        WebkitUserSelect: "none",

        overflow: "hidden",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-4px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 72%)",
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />

      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f5f5f5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}