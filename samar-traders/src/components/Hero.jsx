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
  { value: "9+", label: "Years Experience" },
  { value: "150+", label: "Projects Delivered" },
  { value: "5000+", label: "Installs" },
  { value: "100%", label: "Client Satisfaction" },
];

function StatItem({ stat, startCount, mobile }) {
  const count = useCountUp(stat.value, 2.0, startCount);

  return (
    <div>
      <p
        className={[
          "font-serif font-semibold text-[#1c1917] m-0 leading-none",
          mobile
            ? "text-[1.4rem]"
            : "text-[clamp(1.4rem,2.2vw,2rem)]",
        ].join(" ")}
      >
        {startCount ? count : "0"}
      </p>
      <p className="text-[0.68rem] text-stone-400 mt-[3px] tracking-[0.06em] uppercase">
        {stat.label}
      </p>
    </div>
  );
}

/* ── shimmer image pane ────────────────────────────────────── */
function ImagePane({ imageSrc, style }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[12px]",
        imageSrc ? "bg-transparent" : "bg-black/[0.12]",
      ].join(" ")}
      style={style}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            objectPosition: imageSrc?.includes("show1.JPG") ? "center 70%" : "center",
          }}
        />
      )}
      {/* shimmer overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.05)_55%,rgba(255,255,255,0.15)_100%)]" />
      {/* top-left glow */}
      <div className="absolute top-0 left-0 w-[55%] h-[48%] z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_25%_25%,rgba(255,255,255,0.38)_0%,transparent_70%)]" />
    </div>
  );
}

/* ── glass card shell ──────────────────────────────────────── */
function GlassCard({ cardRef, bg, shadow, style, children }) {
  return (
    <div
      ref={cardRef}
      className="absolute rounded-[22px] overflow-hidden backdrop-blur-[22px] border border-white/[0.82]"
      style={{
        background: bg,
        boxShadow:
          shadow ||
          "0 8px 40px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset",
        WebkitBackdropFilter: "blur(22px)",
        ...style,
      }}
    >
      {/* top-left glow */}
      <div className="absolute top-0 left-0 w-[65%] h-[40%] z-10 pointer-events-none rounded-tl-[22px] bg-[radial-gradient(ellipse_at_28%_22%,rgba(255,255,255,0.55)_0%,transparent_68%)]" />
      {/* content */}
      <div className="relative z-[5] p-3 h-full flex flex-col box-border">
        {children}
      </div>
    </div>
  );
}

function CardLabel({ text }) {
  return (
    <p className="text-[0.58rem] text-stone-500 tracking-[0.14em] uppercase text-center mt-2 font-semibold shrink-0">
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
      { text: "&", extraClass: "italic text-stone-700" },
      { text: "interiors" },
      { text: "designed", extraClass: "italic text-stone-700" },
      { text: "for" },
      { text: "you.", extraClass: "italic text-stone-500" },
    ],
  ];

  return (
    <h1
      className={[
        "font-serif font-normal text-stone-900 m-0 leading-[1.06] tracking-[-0.02em]",
        mobile
          ? "text-[clamp(2rem,8vw,2.8rem)]"
          : "text-[clamp(2.4rem,4.5vw,5rem)]",
      ].join(" ")}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.map((word, wordIndex) => (
            <span key={word.text}>
              {/* mask wrapper — clips the word during GSAP yPercent animation */}
              <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                <span
                  data-hero-word
                  className={[
                    "inline-block will-change-[transform,opacity,filter]",
                    word.extraClass ?? "",
                  ].join(" ")}
                >
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
        willChange: "auto",
      });

      gsap.set(
        [eyebrowRef.current, subRef.current, ctaRef.current, statsRef.current].filter(Boolean),
        { opacity: 0, y: 40, filter: "blur(8px)" }
      );

      gsap.set(wordEls, { opacity: 0, yPercent: 85, filter: "blur(6px)" });

      if (reduceMotion) {
        gsap.set(allCards, {
          opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)",
          clearProps: "willChange",
        });
        gsap.set(
          [eyebrowRef.current, subRef.current, ctaRef.current, statsRef.current].filter(Boolean),
          { opacity: 1, y: 0, filter: "blur(0px)" }
        );
        gsap.set(wordEls, {
          opacity: 1, yPercent: 0, filter: "blur(0px)", clearProps: "filter",
        });
        setStartCount(true);
        return;
      }

      const introTl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out" },
      });

      introTl
        .to(
          [dCard1.current, mCard1.current].filter(Boolean),
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.85 },
          0.05
        )
        .to(
          [dCard2.current, mCard2.current].filter(Boolean),
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.78 },
          0.2
        )
        .to(
          [dCard3.current, mCard3.current].filter(Boolean),
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.78 },
          0.34
        )
        .to(
          eyebrowRef.current,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65 },
          0.5
        )
        .to(
          wordEls,
          {
            opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.95,
            ease: "power4.out", stagger: 0.045, clearProps: "filter",
          },
          0.08
        )
        .to(
          subRef.current,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
          1.15
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55 },
          1.3
        )
        .to(
          statsRef.current,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, ease: "power4.out" },
          0.08
        )
        .call(() => setStartCount(true), [], 0.08);

      const floatTl = gsap.timeline({
        paused: true,
        repeat: -1,
        defaults: { ease: "sine.inOut" },
      });

      floatTl
        .to([dCard1.current, mCard1.current].filter(Boolean), { y: -5, duration: 2.8, yoyo: true, repeat: 1 }, 0)
        .to([dCard2.current, mCard2.current].filter(Boolean), { y: -4, duration: 2.6, yoyo: true, repeat: 1 }, 1.05)
        .to([dCard3.current, mCard3.current].filter(Boolean), { y: -4, x: 1.5, duration: 2.7, yoyo: true, repeat: 1 }, 2.05);

      let introPlayed = false;

      const setFloatingActive = (active) => {
        gsap.set(allCards, { willChange: active ? "transform" : "auto" });

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
        ([entry]) => { setFloatingActive(entry.isIntersecting); },
        { threshold: 0.18 }
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
    "/images/win5.png",
    "/images/door2.jpg",
    "/images/door1.jpg",
    "/images/door3.png",
    "/images/win2.webp",
  ];
  const wideImage = "/images/kitchen.webp";
  const stackImages = ["/images/wardrobe.jpg", "/images/interior.jpg"];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-screen bg-[#f5f3ee] flex items-start"
    >
      {/* ── Background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[5%] -right-[5%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(252,195,148,0.5)_0%,transparent_68%)]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(180,230,200,0.4)_0%,transparent_68%)]" />
        <div className="absolute top-[30%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle,rgba(200,185,255,0.28)_0%,transparent_68%)]" />
      </div>

      <div className="relative z-10 w-full pt-[88px] pb-10">

        {/* ═══ DESKTOP ═══ */}
        <div className="hidden md:grid w-full grid-cols-2 gap-[4vw] items-center min-h-[calc(100vh-128px)] px-[4vw]">

          {/* Left copy column */}
          <div className="flex flex-col gap-[clamp(14px,2vh,26px)] justify-center">
            <CopyBlock
              eyebrowRef={eyebrowRef}
              subRef={subRef}
              ctaRef={ctaRef}
              statsRef={statsRef}
              startCount={startCount}
              statsData={STATS_DATA}
            />
          </div>

          {/* Right card panel */}
          <div className="relative h-[clamp(380px,64vh,600px)]">
            {/* ambient glow */}
            <div className="absolute inset-0 pointer-events-none rounded-full scale-110 bg-[radial-gradient(circle_at_55%_45%,rgba(168,213,245,0.18)_0%,transparent_65%)]" />

            {/* Card 1 — 2×3 image grid */}
            <GlassCard
              cardRef={dCard1}
              bg="rgba(205,232,245,0.55)"
              shadow="0 8px 40px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset"
              style={{ top: "0%", left: "0%", width: "52%", bottom: "0%", zIndex: 1 }}
            >
              <div className="grid grid-cols-2 gap-[7px] flex-1 min-h-0">
                {gridImages.map((src, i) => (
                  <ImagePane key={i} imageSrc={src} style={{ minHeight: 0 }} />
                ))}
              </div>
              <div className="flex justify-center mt-2 mb-[3px]">
                <div className="w-[34px] h-[3px] rounded-full bg-[rgba(180,170,155,0.4)]" />
              </div>
              <CardLabel text="uPVC · Series 90" />
            </GlassCard>

            {/* Card 2 — wide kitchen image */}
            <GlassCard
              cardRef={dCard2}
              bg="rgba(220,210,255,0.52)"
              shadow="0 8px 36px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.92) inset"
              style={{ top: "3%", left: "38%", right: "0%", height: "44%", zIndex: 2 }}
            >
              <ImagePane imageSrc={wideImage} style={{ flex: 1, minHeight: 0, width: "100%" }} />
              <CardLabel text="Modular Kitchens" />
            </GlassCard>

            {/* Card 3 — wardrobe + interior stack */}
            <GlassCard
              cardRef={dCard3}
              bg="rgba(252,220,170,0.55)"
              shadow="0 8px 36px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.90) inset"
              style={{ top: "49%", left: "44%", right: "0%", bottom: "0%", zIndex: 3 }}
            >
              <div className="flex flex-col gap-[7px] flex-1 min-h-0">
                {stackImages.map((src, i) => (
                  <ImagePane key={i} imageSrc={src} style={{ flex: 1, minHeight: 0 }} />
                ))}
              </div>
              <CardLabel text="Wardrobes & Interiors" />
            </GlassCard>
          </div>
        </div>

        {/* ═══ MOBILE ═══ */}
        <div className="md:hidden flex flex-col px-[5vw] gap-9">
          <div className="flex flex-col gap-5">
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

          <div className="relative h-[340px] mb-2">
            {/* ambient glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(168,213,245,0.18)_0%,transparent_70%)]" />

            {/* Card 1 — 2×3 image grid */}
            <GlassCard
              cardRef={mCard1}
              bg="rgba(205,232,245,0.60)"
              shadow="0 6px 28px rgba(0,0,0,0.09),0 1.5px 0 rgba(255,255,255,0.95) inset"
              style={{ top: "0%", left: "0%", width: "54%", bottom: "0%", zIndex: 1 }}
            >
              <div className="grid grid-cols-2 gap-[6px] flex-1 min-h-0">
                {gridImages.map((src, i) => (
                  <ImagePane key={i} imageSrc={src} style={{ minHeight: 0 }} />
                ))}
              </div>
              <div className="flex justify-center mt-[6px] mb-[2px]">
                <div className="w-7 h-[3px] rounded-full bg-[rgba(180,170,155,0.4)]" />
              </div>
              <CardLabel text="uPVC · Series 90" />
            </GlassCard>

            {/* Card 2 — wide kitchen image */}
            <GlassCard
              cardRef={mCard2}
              bg="rgba(220,210,255,0.58)"
              shadow="0 6px 24px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.92) inset"
              style={{ top: "4%", left: "40%", right: "0%", height: "43%", zIndex: 2 }}
            >
              <ImagePane imageSrc={wideImage} style={{ flex: 1, minHeight: 0, width: "100%" }} />
              <CardLabel text="Modular Kitchens" />
            </GlassCard>

            {/* Card 3 — wardrobe + interior stack */}
            <GlassCard
              cardRef={mCard3}
              bg="rgba(252,220,170,0.60)"
              shadow="0 6px 24px rgba(0,0,0,0.08),0 1.5px 0 rgba(255,255,255,0.90) inset"
              style={{ top: "50%", left: "46%", right: "0%", bottom: "0%", zIndex: 3 }}
            >
              <div className="flex flex-col gap-[6px] flex-1 min-h-0">
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
      {/* Eyebrow */}
      <div ref={eyebrowRef}>
        <span
          className={[
            "inline-flex items-center gap-2 font-medium text-stone-600 tracking-widest uppercase",
            "rounded-full bg-white/60 backdrop-blur-[12px] border border-[rgba(200,190,170,0.5)]",
            "py-[7px] px-[14px]",
            mobile ? "text-[0.65rem]" : "text-[0.75rem]",
          ].join(" ")}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-green-400"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Leading Provider · Est. 2017
        </span>
        <p
          className={[
            "text-stone-400 mt-[6px] tracking-[0.04em] italic pl-[2px]",
            mobile ? "text-[0.6rem]" : "text-[0.68rem]",
          ].join(" ")}
        >
          Years of industry experience behind every product we deliver
        </p>
      </div>

      {/* Heading */}
      <AnimatedHeading mobile={mobile} />

      {/* Sub */}
      <p
        ref={subRef}
        className={[
          "text-stone-500 leading-[1.7] max-w-[440px] m-0",
          mobile ? "text-[0.9rem]" : "text-[clamp(0.95rem,1.2vw,1.1rem)]",
        ].join(" ")}
      >
        Samar Trading delivers premium uPVC doors &amp; windows, modular kitchens, wardrobes and
        complete interior solutions — crafted with precision, tailored to your space.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex gap-2 flex-wrap">
        <Link
          to="/services"
          className={[
            "rounded-full bg-[#1c1917] text-white font-medium no-underline",
            "transition-all duration-200 inline-block whitespace-nowrap",
            mobile ? "text-[0.8rem] py-[10px] px-[18px]" : "text-[0.875rem] py-3 px-[26px]",
          ].join(" ")}
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
          className={[
            "rounded-full bg-white/60 backdrop-blur-[12px] border border-[rgba(200,190,170,0.55)]",
            "text-stone-700 font-medium no-underline",
            "transition-all duration-200 inline-block whitespace-nowrap",
            mobile ? "text-[0.8rem] py-[10px] px-[18px]" : "text-[0.875rem] py-3 px-[26px]",
          ].join(" ")}
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
          className={[
            "rounded-full bg-[linear-gradient(135deg,#c8a96e_0%,#a07840_100%)] text-white",
            "font-medium border-0 cursor-pointer transition-all duration-200",
            "inline-flex items-center gap-[5px] whitespace-nowrap",
            "shadow-[0_4px_16px_rgba(160,120,64,0.28)]",
            mobile ? "text-[0.8rem] py-[10px] px-[18px]" : "text-[0.875rem] py-3 px-[26px]",
          ].join(" ")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 6px 22px rgba(160,120,64,0.42)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(160,120,64,0.28)";
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Get a Quote
        </button>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className={[
          "flex pt-[2px]",
          mobile
            ? "gap-6 flex-wrap"
            : "gap-[clamp(20px,3vw,48px)] flex-nowrap",
        ].join(" ")}
      >
        {statsData.map((s) => (
          <StatItem key={s.label} stat={s} startCount={startCount} mobile={mobile} />
        ))}
      </div>
    </>
  );
}