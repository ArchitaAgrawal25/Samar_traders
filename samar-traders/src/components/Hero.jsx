import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useQuoteModal } from "./QuoteModal";

// ── Count-up hook — smooth ease-in-out cubic ─────────────────
function useCountUp(target, duration = 2.0, start = false) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!start) return;

    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    const suffix = String(target).replace(/[0-9.]/g, "");
    let startTime = null;
    let raf;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = easeInOutCubic(progress);

      setDisplay(Math.round(eased * numericTarget) + suffix);

      if (progress < 1) raf = requestAnimationFrame(step);
      else setDisplay(target);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return display;
}

const STATS_DATA = [
  { value: "2+", label: "Years Experience" },
  { value: "150+", label: "Projects Delivered" },
  { value: "5000+", label: "Installs" },
  { value: "100%", label: "Client Satisfaction" },
];

function StatItem({ stat, startCount, mobile }) {
  const count = useCountUp(stat.value, 2.0, startCount);

  return (
    <div>
      <p
        className="font-serif"
        style={{
          fontSize: mobile ? "1.4rem" : "clamp(1.4rem,2.2vw,2rem)",
          fontWeight: 600,
          color: "#1c1917",
          margin: 0,
          lineHeight: 1,
        }}
      >
        {startCount ? count : "0"}
      </p>
      <p
        style={{
          fontSize: "0.68rem",
          color: "#a8a29e",
          marginTop: "3px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

/* ── shimmer image pane ────────────────────────────────────── */
function ImagePane({ imageSrc, style }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        background: imageSrc ? "transparent" : "rgba(0,0,0,0.12)",
        ...style,
      }}
    >
      {imageSrc && (
        // The wideImage is passed as imageSrc to ImagePane
// In ImagePane, change the img style:
<img
  src={imageSrc}
  style={{
    position: "absolute",
    inset: 0,
    
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: imageSrc?.includes("show1.JPG") ? "center 70%" : "center",
    zIndex: 0,
  }}
/>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.05) 55%,rgba(255,255,255,0.15) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "55%",
          height: "48%",
          zIndex: 2,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 25% 25%,rgba(255,255,255,0.38) 0%,transparent 70%)",
        }}
      />
    </div>
  );
}

/* ── glass card shell ──────────────────────────────────────── */
function GlassCard({ cardRef, bg, shadow, style, children }) {
  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        borderRadius: "22px",
        overflow: "hidden",
        background: bg,
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        border: "1px solid rgba(255,255,255,0.82)",
        boxShadow:
          shadow ||
          "0 8px 40px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "65%",
          height: "40%",
          zIndex: 10,
          pointerEvents: "none",
          borderRadius: "22px 0 0 0",
          background:
            "radial-gradient(ellipse at 28% 22%,rgba(255,255,255,0.55) 0%,transparent 68%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 5,
          padding: "12px",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function CardLabel({ text }) {
  return (
    <p
      style={{
        fontSize: "0.58rem",
        color: "#78716c",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        textAlign: "center",
        margin: "8px 0 0",
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {text}
    </p>
  );
}

/* ── Masked staggered heading ───────────────────────────────── */
function AnimatedHeading({ mobile }) {
  const lines = [
    [
      { text: "Premium" },
      { text: "doors," },
      { text: "windows" },
      { text: "&", style: { fontStyle: "italic", color: "#44403c" } },
      { text: "interiors" },
      { text: "designed", style: { fontStyle: "italic", color: "#44403c" } },
      { text: "for" },
      { text: "you.", style: { fontStyle: "italic", color: "#78716c" } },
    ],
  ];

  const maskStyle = {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom",
    paddingBottom: "0.08em",
    marginBottom: "-0.08em",
  };

  const wordStyle = {
    display: "inline-block",
    willChange: "transform, opacity, filter",
  };

  return (
    <h1
      className="font-serif font-normal text-stone-900"
      style={{
        fontSize: mobile ? "clamp(2rem,8vw,2.8rem)" : "clamp(2.4rem,4.5vw,5rem)",
        lineHeight: 1.06,
        letterSpacing: "-0.02em",
        margin: 0,
      }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: "block" }}>
          {line.map((word, wordIndex) => (
            <span key={word.text}>
              <span style={maskStyle}>
                <span data-hero-word style={{ ...wordStyle, ...word.style }}>
                  {word.text}
                </span>
              </span>
              {wordIndex < line.length - 1 && <span> </span>}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  const dCard1 = useRef(null);
  const dCard2 = useRef(null);
  const dCard3 = useRef(null);
  const mCard1 = useRef(null);
  const mCard2 = useRef(null);
  const mCard3 = useRef(null);

  const [startCount, setStartCount] = useState(false);

 // src/components/Hero.jsx
// Replace the full useLayoutEffect inside Hero() with this:

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray("[data-hero-word]");

      const allCards = [dCard1, dCard2, dCard3, mCard1, mCard2, mCard3]
        .map((r) => r.current)
        .filter(Boolean);

      gsap.set(allCards, {
        opacity: 0,
        y: 60,
        scale: 0.88,
        filter: "blur(12px)",
        willChange: "auto", // do not keep extra GPU layers alive while idle
      });

      gsap.set(
        [eyebrowRef.current, subRef.current, ctaRef.current, statsRef.current].filter(Boolean),
        {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
        }
      );

      gsap.set(wordEls, {
        opacity: 0,
        yPercent: 85,
        filter: "blur(6px)",
      });

      if (reduceMotion) {
        gsap.set(allCards, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          clearProps: "willChange",
        });

        gsap.set(
          [eyebrowRef.current, subRef.current, ctaRef.current, statsRef.current].filter(Boolean),
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }
        );

        gsap.set(wordEls, {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          clearProps: "filter",
        });

        setStartCount(true);
        return;
      }

      const introTl = gsap.timeline({
        paused: true, // starts only when Hero is actually visible
        defaults: {
          ease: "expo.out",
        },
      });

      introTl
        .to(
          [dCard1.current, mCard1.current].filter(Boolean),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
          },
          0.05
        )
        .to(
          [dCard2.current, mCard2.current].filter(Boolean),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.78,
          },
          0.2
        )
        .to(
          [dCard3.current, mCard3.current].filter(Boolean),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.78,
          },
          0.34
        )
        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
          },
          0.5
        )
        .to(
          wordEls,
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power4.out",
            stagger: 0.045,
            clearProps: "filter",
          },
          0.08
        )
        .to(
          subRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
          },
          1.15
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
          },
          1.3
        )
        .to(
          statsRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power4.out",
          },
          0.08
        )
        .call(() => setStartCount(true), [], 0.08);

      const floatTl = gsap.timeline({
        paused: true,
        repeat: -1,
        defaults: {
          ease: "sine.inOut",
        },
      });

      // Staggered transform-only motion: fewer cards move at the same instant.
      floatTl
        .to([dCard1.current, mCard1.current].filter(Boolean), { y: -5, duration: 2.8, yoyo: true, repeat: 1 }, 0)
        .to([dCard2.current, mCard2.current].filter(Boolean), { y: -4, duration: 2.6, yoyo: true, repeat: 1 }, 1.05)
        .to([dCard3.current, mCard3.current].filter(Boolean), { y: -4, x: 1.5, duration: 2.7, yoyo: true, repeat: 1 }, 2.05);

      let introPlayed = false;

      const setFloatingActive = (active) => {
        gsap.set(allCards, {
          willChange: active ? "transform" : "auto", // only promote while motion is active
        });

        if (active) {
          if (!introPlayed) {
            introPlayed = true;
            introTl.play(0);
          }

          floatTl.play();
        } else {
          floatTl.pause();
        }
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          setFloatingActive(entry.isIntersecting);
        },
        {
          threshold: 0.18,
        }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);

      return () => {
        observer.disconnect();
        introTl.kill();
        floatTl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const gridImages = [
     "/images/door4.jpg",
    "/images/show3.JPG",
    "/images/door2.jpg",
    "/images/door1.jpg",
      "/images/show6.JPG",
      "/images/show5.JPG",
   
  ];
  const wideImage = "/images/show1.JPG";
  const stackImages = ["/images/wardrobe.jpg", "/images/interior.jpg"];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#f5f3ee",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "-5%",
            right: "-5%",
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(252,195,148,0.5) 0%,transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "20%",
            width: "45vw",
            height: "45vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(180,230,200,0.4) 0%,transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "30%",
            width: "30vw",
            height: "30vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(200,185,255,0.28) 0%,transparent 68%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full" style={{ paddingTop: "88px", paddingBottom: "40px" }}>
        {/* ═══ DESKTOP ═══ */}
        <div
          className="hidden md:grid w-full"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "4vw",
            alignItems: "center",
            minHeight: "calc(100vh - 128px)",
            padding: "0 4vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(14px,2vh,26px)",
              justifyContent: "center",
            }}
          >
            <CopyBlock
              eyebrowRef={eyebrowRef}
              subRef={subRef}
              ctaRef={ctaRef}
              statsRef={statsRef}
              startCount={startCount}
              statsData={STATS_DATA}
            />
          </div>

          <div style={{ position: "relative", height: "clamp(380px,64vh,600px)" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(circle at 55% 45%,rgba(168,213,245,0.18) 0%,transparent 65%)",
                borderRadius: "50%",
                transform: "scale(1.1)",
              }}
            />

            <GlassCard
              cardRef={dCard1}
              bg="rgba(205,232,245,0.55)"
              shadow="0 8px 40px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset"
              style={{ top: "0%", left: "0%", width: "52%", bottom: "0%", zIndex: 1 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "7px",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {gridImages.map((src, i) => (
                  <ImagePane key={i} imageSrc={src} style={{ minHeight: 0 }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 3px" }}>
                <div
                  style={{
                    width: "34px",
                    height: "3px",
                    borderRadius: "99px",
                    background: "rgba(180,170,155,0.4)",
                  }}
                />
              </div>
              <CardLabel text="uPVC · Series 90" />
            </GlassCard>

            <GlassCard
              cardRef={dCard2}
              bg="rgba(220,210,255,0.52)"
              shadow="0 8px 36px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.92) inset"
              style={{ top: "3%", left: "38%", right: "0%", height: "44%", zIndex: 2 }}
            >
              <ImagePane imageSrc={wideImage} style={{ flex: 1, minHeight: 0, width: "100%" }} />
              <CardLabel text="Modular Kitchens" />
            </GlassCard>

            <GlassCard
              cardRef={dCard3}
              bg="rgba(252,220,170,0.55)"
              shadow="0 8px 36px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.90) inset"
              style={{ top: "49%", left: "44%", right: "0%", bottom: "0%", zIndex: 3 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {stackImages.map((src, i) => (
                  <ImagePane key={i} imageSrc={src} style={{ flex: 1, minHeight: 0 }} />
                ))}
              </div>
              <CardLabel text="Wardrobes & Interiors" />
            </GlassCard>
          </div>
        </div>

        {/* ═══ MOBILE ═══ */}
        <div className="md:hidden flex flex-col" style={{ padding: "0 5vw", gap: "36px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <CopyBlock
              eyebrowRef={eyebrowRef}
              subRef={subRef}
              ctaRef={ctaRef}
              statsRef={statsRef}
              mobile
              startCount={startCount}
              statsData={STATS_DATA}
            />
          </div>

          <div style={{ position: "relative", height: "340px", marginBottom: "8px" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(circle at 50% 50%,rgba(168,213,245,0.18) 0%,transparent 70%)",
              }}
            />

            <GlassCard
              cardRef={mCard1}
              bg="rgba(205,232,245,0.60)"
              shadow="0 6px 28px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset"
              style={{ top: "0%", left: "0%", width: "54%", bottom: "0%", zIndex: 1 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6px",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {gridImages.map((src, i) => (
                  <ImagePane key={i} imageSrc={src} style={{ minHeight: 0 }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", margin: "6px 0 2px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "3px",
                    borderRadius: "99px",
                    background: "rgba(180,170,155,0.4)",
                  }}
                />
              </div>
              <CardLabel text="uPVC · Series 90" />
            </GlassCard>

            <GlassCard
              cardRef={mCard2}
              bg="rgba(220,210,255,0.58)"
              shadow="0 6px 24px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.92) inset"
              style={{ top: "4%", left: "40%", right: "0%", height: "43%", zIndex: 2 }}
            >
              <ImagePane imageSrc={wideImage} style={{ flex: 1, minHeight: 0, width: "100%" }} />
              <CardLabel text="Modular Kitchens" />
            </GlassCard>

            <GlassCard
              cardRef={mCard3}
              bg="rgba(252,220,170,0.60)"
              shadow="0 6px 24px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.90) inset"
              style={{ top: "50%", left: "46%", right: "0%", bottom: "0%", zIndex: 3 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {stackImages.map((src, i) => (
                  <ImagePane key={i} imageSrc={src} style={{ flex: 1, minHeight: 0 }} />
                ))}
              </div>
              <CardLabel text="Wardrobes & Interiors" />
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Copy block ─────────────────────────────────────────────── */
function CopyBlock({
  eyebrowRef,
  subRef,
  ctaRef,
  statsRef,
  mobile,
  startCount,
  statsData,
}) {
  
  const { open } = useQuoteModal();
  return (
    
    <>
      <div ref={eyebrowRef}>
        <span
          className="inline-flex items-center gap-2 font-medium text-stone-600 tracking-widest uppercase"
          style={{
            fontSize: mobile ? "0.65rem" : "0.75rem",
            padding: "7px 14px",
            borderRadius: "99px",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200,190,170,0.5)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ color: "#4ade80" }}
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Leading Provider · Est. 2024
        </span>
        <p
          style={{
            fontSize: mobile ? "0.6rem" : "0.68rem",
            color: "#a8a29e",
            marginTop: "6px",
            letterSpacing: "0.04em",
            fontStyle: "italic",
            paddingLeft: "2px",
          }}
        >
          Years of industry experience behind every product we deliver
        </p>
      </div>

      <AnimatedHeading mobile={mobile} />

      <p
        ref={subRef}
        style={{
          color: "#78716c",
          fontSize: mobile ? "0.9rem" : "clamp(0.95rem,1.2vw,1.1rem)",
          lineHeight: 1.7,
          maxWidth: "440px",
          margin: 0,
        }}
      >
        Samar Trading delivers premium uPVC doors &amp; windows, modular kitchens, wardrobes and
        complete interior solutions — crafted with precision, tailored to your space.
      </p>

      <div ref={ctaRef} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Link
          to="/services"
          style={{
            padding: mobile ? "10px 18px" : "12px 26px",
            borderRadius: "99px",
            background: "#1c1917",
            color: "#fff",
            fontSize: mobile ? "0.8rem" : "0.875rem",
            fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.2s",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#44403c";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1c1917";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Explore Products
        </Link>

        <Link
          to="/projects"
          style={{
            padding: mobile ? "10px 18px" : "12px 26px",
            borderRadius: "99px",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200,190,170,0.55)",
            color: "#44403c",
            fontSize: mobile ? "0.8rem" : "0.875rem",
            fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.2s",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.85)";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.6)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          View Projects
        </Link>

        <button
  onClick={open}
  style={{
    padding: mobile ? "10px 18px" : "12px 26px",
    borderRadius: "99px",
    background: "linear-gradient(135deg,#c8a96e 0%,#a07840 100%)",
    color: "#fff",
    fontSize: mobile ? "0.8rem" : "0.875rem",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 16px rgba(160,120,64,0.28)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.04)";
    e.currentTarget.style.boxShadow = "0 6px 22px rgba(160,120,64,0.42)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 16px rgba(160,120,64,0.28)";
  }}
>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
  Get a Quote
  
</button>
      </div>

      <div
        ref={statsRef}
        style={{
          display: "flex",
          gap: mobile ? "24px" : "clamp(20px,3vw,48px)",
          paddingTop: "2px",
          flexWrap: mobile ? "wrap" : "nowrap",
        }}
      >
        {statsData.map((s) => (
          <StatItem key={s.label} stat={s} startCount={startCount} mobile={mobile} />
        ))}
      </div>
    </>
  );
}