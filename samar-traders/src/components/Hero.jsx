import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const STATS = [
  { value: "25+",  label: "Years Experience" },
  { value: "800+", label: "Projects Done" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const statsRef   = useRef(null);
  const card1Ref   = useRef(null);
  const card2Ref   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, 0.35)
        .fromTo(headingRef.current,
          { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75 }, 0.5)
        .fromTo(subRef.current,
          { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, 0.75)
        .fromTo(ctaRef.current,
          { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9)
        .fromTo(statsRef.current,
          { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 1.05)
        .fromTo(card1Ref.current,
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0,  scale: 1, duration: 0.75, ease: "power2.out" }, 0.55)
        .fromTo(card2Ref.current,
          { opacity: 0, x: 30, scale: 0.94 },
          { opacity: 1, x: 0,  scale: 1, duration: 0.65, ease: "power2.out" }, 0.8);

      // Gentle float
      gsap.to(card1Ref.current, {
        y: -8, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.4,
      });
      gsap.to(card2Ref.current, {
        y: -5, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.9,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#f5f3ee",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Background blobs ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "-5%", right: "-5%",
          width: "45vw", height: "45vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(252,195,148,0.55) 0%, transparent 68%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "25%",
          width: "38vw", height: "38vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,230,200,0.45) 0%, transparent 68%)",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "30%",
          width: "28vw", height: "28vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,185,255,0.3) 0%, transparent 68%)",
        }} />
      </div>

      {/* ── Main grid ─────────────────────────────────────── */}
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: "100%",
          padding: "0 4vw",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4vw",
            alignItems: "center",
            minHeight: "calc(100vh - 80px)",
          }}
        >

          {/* ── Left ────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2.2vh, 28px)", justifyContent: "center" }}>

            {/* Eyebrow */}
            <div ref={eyebrowRef}>
              <span
                className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 tracking-widest uppercase"
                style={{
                  padding: "8px 16px",
                  borderRadius: "99px",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(200,190,170,0.5)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "#4ade80" }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                Premium Interiors · Est. 1998
              </span>
            </div>

            {/* Heading */}
            <div ref={headingRef}>
              <h1
                className="font-serif font-normal text-stone-900"
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Premium doors &amp;{" "}
                <em style={{ fontStyle: "italic", color: "#44403c" }}>windows,</em>
                <br />designed for
                <em style={{ fontStyle: "italic", color: "#78716c" }}> you.</em>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              ref={subRef}
              style={{
                color: "#78716c",
                fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                lineHeight: 1.7,
                maxWidth: "440px",
                margin: 0,
              }}
            >
              Samar Traders delivers high-quality aluminium, glass and wooden
              solutions — crafted with the calm precision and warmth of a family
              workshop.
            </p>

            {/* CTA */}
            <div ref={ctaRef} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                to="/products"
                style={{
                  padding: "12px 28px",
                  borderRadius: "99px",
                  background: "#1c1917",
                  color: "#fff",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#44403c"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1c1917"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                Explore Products
              </Link>
              <Link
                to="/projects"
                style={{
                  padding: "12px 28px",
                  borderRadius: "99px",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(200,190,170,0.55)",
                  color: "#44403c",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.85)"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.6)"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                View Projects
              </Link>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              style={{ display: "flex", gap: "clamp(20px, 3vw, 48px)", paddingTop: "4px" }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p
                    className="font-serif"
                    style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", fontWeight: 600, color: "#1c1917", margin: 0, lineHeight: 1 }}
                  >
                    {s.value}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "#a8a29e", marginTop: "4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Cards ───────────────────────────── */}
          <div
            style={{
              position: "relative",
              height: "clamp(340px, 55vh, 560px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Soft glow behind cards */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(circle at 55% 45%, rgba(168,213,245,0.22) 0%, transparent 65%)",
              borderRadius: "50%",
              transform: "scale(1.1)",
              pointerEvents: "none",
            }} />

            {/* Main card — Aluminium Series 90 */}
            <div
              ref={card1Ref}
              style={{
                position: "absolute",
                top: "2%",
                left: "4%",
                width: "clamp(240px, 28vw, 320px)",
                borderRadius: "24px",
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.82)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.95)",
                padding: "clamp(14px, 1.8vw, 22px)",
              }}
            >
              {/* 2x3 pane grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, rgba(205,232,245,0.75) 0%, rgba(185,218,238,0.45) 100%)",
                      border: "1px solid rgba(195,225,242,0.65)",
                    }}
                  />
                ))}
              </div>
              {/* Handle */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                <div style={{ width: "40px", height: "4px", borderRadius: "99px", background: "rgba(180,170,155,0.5)" }} />
              </div>
              <p style={{ fontSize: "0.68rem", color: "#a8a29e", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", margin: 0 }}>
                Aluminium · Series 90
              </p>
            </div>

            {/* Secondary card — Casement Glass */}
            <div
              ref={card2Ref}
              style={{
                position: "absolute",
                bottom: "4%",
                right: "2%",
                width: "clamp(160px, 18vw, 210px)",
                borderRadius: "22px",
                background: "rgba(220,210,255,0.42)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.75)",
                boxShadow: "0 6px 28px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
                padding: "clamp(12px, 1.4vw, 18px)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: "clamp(44px, 6vh, 60px)",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(220,210,255,0.65) 0%, rgba(200,185,255,0.35) 100%)",
                      border: "1px solid rgba(200,185,255,0.5)",
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: "0.65rem", color: "#78716c", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", margin: 0 }}>
                Casement Glass
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}