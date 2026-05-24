import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    id: "01",
    title: "Superior Weather Protection",
    desc: "Our uPVC windows and doors withstand harsh sunlight, rain, dust, and humidity without warping or rusting. They maintain their strength and finish through every season.",
    tag: "All-season",
    bg: "bg-emerald-50/70",
    border: "border-emerald-200/80",
    accent: "text-emerald-700",
    tagBg: "bg-emerald-100/80 text-emerald-700",
    dot: "bg-emerald-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10"/><path d="M12 2a14.5 14.5 0 0 1 4 10 14.5 14.5 0 0 1-4 10 14.5 14.5 0 0 1-4-10 14.5 14.5 0 0 1 4-10"/><path d="M2 12h20"/>
      </svg>
    ),
  },
  {
    id: "02",
    title: "Energy Efficient Comfort",
    desc: "Multi-chamber uPVC profiles reduce heat transfer and improve insulation. Keeps interiors cooler in summers and helps reduce electricity consumption significantly.",
    tag: "Eco-smart",
    bg: "bg-sky-50/70",
    border: "border-sky-200/80",
    accent: "text-sky-700",
    tagBg: "bg-sky-100/80 text-sky-700",
    dot: "bg-sky-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Noise Reduction Technology",
    desc: "Advanced sealing systems reduce outside noise significantly. Perfect for homes near roads, markets, or busy city areas — enjoy true indoor peace.",
    tag: "Acoustic seal",
    bg: "bg-violet-50/70",
    border: "border-violet-200/80",
    accent: "text-violet-700",
    tagBg: "bg-violet-100/80 text-violet-700",
    dot: "bg-violet-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Water & Leak Resistant",
    desc: "Precision sealing and durable framing prevent water seepage during heavy rainfall. Our installations keep your interiors dry and protected year-round.",
    tag: "Zero seepage",
    bg: "bg-blue-50/70",
    border: "border-blue-200/80",
    accent: "text-blue-700",
    tagBg: "bg-blue-100/80 text-blue-700",
    dot: "bg-blue-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
      </svg>
    ),
  },
  {
    id: "05",
    title: "Low Maintenance & Long Life",
    desc: "uPVC does not require frequent polishing or repainting. Termite-proof, corrosion-resistant, and easy to clean — years of truly hassle-free use.",
    tag: "Termite-proof",
    bg: "bg-amber-50/70",
    border: "border-amber-200/80",
    accent: "text-amber-700",
    tagBg: "bg-amber-100/80 text-amber-700",
    dot: "bg-amber-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    id: "06",
    title: "Elegant Modern Designs",
    desc: "Choose from premium finishes, sliding systems, and contemporary styles that enhance your home's appearance — functionality meets modern aesthetics.",
    tag: "Custom styles",
    bg: "bg-rose-50/70",
    border: "border-rose-200/80",
    accent: "text-rose-700",
    tagBg: "bg-rose-100/80 text-rose-700",
    dot: "bg-rose-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    id: "07",
    title: "Fire Retardant",
    desc: "Premium uPVC profiles have self-extinguishing properties that slow the spread of flames. Unlike wood, they do not easily ignite — an extra layer of safety.",
    tag: "Self-extinguishing",
    bg: "bg-orange-50/70",
    border: "border-orange-200/80",
    accent: "text-orange-700",
    tagBg: "bg-orange-100/80 text-orange-700",
    dot: "bg-orange-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
      </svg>
    ),
  },
  {
    id: "08",
  title: "Dustproof & Airtight Sealing",
  desc: "Advanced gasket sealing helps block dust, wind, and outdoor pollutants while maintaining a cleaner and quieter indoor environment.",
  tag: "Airtight fit",
    bg: "bg-red-50/70",
    border: "border-red-200/80",
    accent: "text-red-700",
    tagBg: "bg-red-100/80 text-red-700",
    dot: "bg-red-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-2-2.5-4-3-4-6a4 4 0 0 1 8 0c0 3-2 3.5-4 6"/><path d="M10 17c0 1.1.9 2 2 2s2-.9 2-2"/><line x1="12" y1="12" x2="12" y2="17"/>
      </svg>
    ),
  },
];

// Bento layout: [2,1], [1,2], [2,1], [1,2]
const GRID_LAYOUT = [
  { col: "md:col-span-2", row: 0 },
  { col: "md:col-span-1", row: 0 },
  { col: "md:col-span-1", row: 1 },
  { col: "md:col-span-2", row: 1 },
  { col: "md:col-span-2", row: 2 },
  { col: "md:col-span-1", row: 2 },
  { col: "md:col-span-1", row: 3 },
  { col: "md:col-span-2", row: 3 },
];

const DESKTOP_DEFAULT = 6;
const MOBILE_DEFAULT = 3;

function Card({ reason, layout, index, isVisible }) {
  const cardRef = useRef(null);
  const iconWrapRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 36, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        ease: "expo.out",
        delay: (index % 3) * 0.08,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 92%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, [index]);

  const onEnter = () => {
    setHovered(true);
    gsap.to(iconWrapRef.current, { rotate: 10, scale: 1.18, duration: 0.32, ease: "back.out(1.7)" });
    gsap.to(cardRef.current, { y: -5, duration: 0.28, ease: "power2.out" });
  };

  const onLeave = () => {
    setHovered(false);
    gsap.to(iconWrapRef.current, { rotate: 0, scale: 1, duration: 0.28, ease: "power2.out" });
    gsap.to(cardRef.current, { y: 0, duration: 0.28, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`
        col-span-3 ${layout.col}
        relative overflow-hidden rounded-[22px] border
        ${reason.bg} ${reason.border}
        p-6 md:p-7
        min-h-[200px] md:min-h-[220px]
        cursor-default opacity-0
        transition-shadow duration-300
        ${hovered ? "shadow-[0_16px_48px_rgba(0,0,0,0.10)]" : "shadow-[0_2px_16px_rgba(0,0,0,0.04)]"}
      `}
      style={{ backdropFilter: "blur(14px)" }}
    >
      {/* Radial glow top-right */}
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)" }}
      />

      {/* Number watermark */}
      <span
        className={`absolute bottom-3 right-5 font-serif ${reason.accent} opacity-[0.07] pointer-events-none select-none`}
        style={{ fontSize: "6rem", lineHeight: 1, fontWeight: 700 }}
      >
        {reason.id}
      </span>

      <div className="relative z-10 flex flex-col h-full gap-5">
        {/* Top: icon + tag */}
        <div className="flex items-start justify-between gap-2">
          <div
            ref={iconWrapRef}
            className={`
              flex items-center justify-center w-11 h-11 rounded-2xl shrink-0
              bg-white/75 border border-white/90
              shadow-[0_2px_10px_rgba(0,0,0,0.07)]
              ${reason.accent}
            `}
          >
            {reason.icon}
          </div>

          <span
            className={`
              font-sans text-[0.56rem] font-bold uppercase tracking-[0.15em]
              px-3 py-1.5 rounded-full shrink-0
              bg-white/60 border border-white/80
              ${reason.accent}
            `}
          >
            {reason.tag}
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2 flex-1 justify-end">
          <div className="flex items-center gap-2">
            <span className={`w-4 h-px ${reason.dot} opacity-60`} />
            <span
              className={`font-sans text-[0.58rem] tracking-[0.12em] uppercase font-semibold opacity-60 ${reason.accent}`}
            >
              {reason.id}
            </span>
          </div>

          <h3
            className="font-serif font-normal text-stone-900 m-0 leading-tight"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)", letterSpacing: "-0.02em" }}
          >
            {reason.title}
          </h3>

          <p
            className="font-sans text-stone-600 m-0 leading-relaxed"
            style={{ fontSize: "clamp(0.78rem, 1vw, 0.86rem)", maxWidth: "480px" }}
          >
            {reason.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// Animated expand/collapse wrapper for extra cards
function ExtraCardsContainer({ visible, children }) {
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!containerRef.current) return;

    if (visible) {
      gsap.set(containerRef.current, { height: 0, opacity: 0, overflow: "hidden" });
      const id = setTimeout(() => {
        if (!containerRef.current) return;
        const naturalHeight = containerRef.current.scrollHeight;
        gsap.to(containerRef.current, {
          height: naturalHeight,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            if (containerRef.current) {
              gsap.set(containerRef.current, { height: "auto", overflow: "visible" });
            }
          },
        });
      }, 16);
      return () => clearTimeout(id);
    } else {
      const naturalHeight = containerRef.current.scrollHeight;
      gsap.fromTo(
        containerRef.current,
        { height: naturalHeight, opacity: 1, overflow: "hidden" },
        {
          height: 0,
          opacity: 0,
          duration: 0.42,
          ease: "power2.in",
        }
      );
    }
  }, [visible]);

  return (
    <div
      ref={containerRef}
      style={visible ? {} : { height: 0, overflow: "hidden", opacity: 0 }}
    >
      {children}
    </div>
  );
}

export default function WhyChooseUs() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const dividerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, subRef.current].filter(Boolean),
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.95 },
        { scale: 1, duration: 0.38, ease: "back.out(1.7)" }
      );
    }
  };

  // Split cards into three visibility groups:
  // - mobileVisible (0–3): always rendered in grid on all screens
  // - mobileToDesktopExtra (4–5): hidden on mobile by default, visible on md+ by default
  // - remaining (6–7): hidden on all screens by default, shown when showAll
  const mobileVisibleCards = REASONS.slice(0, MOBILE_DEFAULT);           // 0-3
  const mobileToDesktopCards = REASONS.slice(MOBILE_DEFAULT, DESKTOP_DEFAULT); // 4-5
  const remainingCards = REASONS.slice(DESKTOP_DEFAULT);                  // 6-7

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-10 md:py-4"
      style={{ background: "#f5f3ee" }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "-5%", right: "-8%", width: "42vw", height: "42vw",
          background: "radial-gradient(circle, rgba(168,213,200,0.13) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: "0%", left: "-5%", width: "36vw", height: "36vw",
          background: "radial-gradient(circle, rgba(252,220,170,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-8xl mx-8 lg:mx-28 px-0 md:pr-0">
        {/* Header */}
        <div className="mb-10 md:mb-14 max-w-7xl">
          <div ref={eyebrowRef} className="opacity-0 flex items-center gap-3 mb-4">
            <span className="font-sans text-[0.75rem] font-extrabold uppercase tracking-[0.2em] text-stone-500" style={{ fontSize: "0.9rem", fontWeight: 800, color: "#6b6560" }}>
              Why choose us
            </span>
          </div>

          <h2
            ref={headingRef}
            className="opacity-0 font-serif font-normal text-stone-900 m-0"
            style={{ fontSize: "clamp(2rem,4.2vw,3.2rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Why{" "}
            <em style={{ fontStyle: "italic", color: "#2a7a6a" }}>Samar Trading</em>{" "}?
          </h2>

          <p
            ref={subRef}
            className="pt-4 opacity-0 font-sans text-stone-500 m-0 leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)" }}
          >
            Upgrade your space with premium uPVC windows and doors engineered for modern homes. We combine durability, insulation, elegant aesthetics, and low maintenance to deliver solutions built for long-term comfort and performance.
          </p>
        </div>

        {/* Bento grid — always-visible cards (mobile: 0-3, desktop: 0-3) */}
        <div className="grid grid-cols-3 gap-4">
          {mobileVisibleCards.map((reason, i) => (
            <Card
              key={reason.id}
              reason={reason}
              layout={GRID_LAYOUT[i]}
              index={i}
            />
          ))}

          {/* Cards 4-5: hidden on mobile by default, visible on md+ */}
          {mobileToDesktopCards.map((reason, i) => {
            const globalIndex = MOBILE_DEFAULT + i;
            return (
              <div
                key={reason.id}
                className={[
                  // On mobile: hidden unless showAll; on md+: always in grid
                  `col-span-3 ${GRID_LAYOUT[globalIndex].col}`,
                  !showAll ? "hidden md:contents" : "contents",
                ].join(" ")}
              >
                <Card
                  reason={reason}
                  layout={GRID_LAYOUT[globalIndex]}
                  index={globalIndex}
                />
              </div>
            );
          })}
        </div>

        {/* Extra cards (6-7): hidden by default on all screens */}
        <ExtraCardsContainer visible={showAll}>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {remainingCards.map((reason, i) => {
              const globalIndex = DESKTOP_DEFAULT + i;
              return (
                <Card
                  key={reason.id}
                  reason={reason}
                  layout={GRID_LAYOUT[globalIndex]}
                  index={globalIndex}
                />
              );
            })}
          </div>
        </ExtraCardsContainer>

        {/* View All / Show Less button */}
        <div className="mt-8 flex justify-center">
          <button
            ref={buttonRef}
            onClick={handleToggle}
            className="group inline-flex items-center gap-2.5 rounded-full border border-[rgba(180,168,148,0.55)] bg-white/70 px-6 py-3 font-sans text-[0.78rem] font-semibold text-stone-700 backdrop-blur-xl shadow-[0_4px_18px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:border-[rgba(180,168,148,0.8)] hover:text-stone-900 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)]"
          >
            <span>{showAll ? "Show Less" : "View All Features"}</span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={[
                "transition-transform duration-300",
                showAll ? "rotate-180" : "rotate-0",
              ].join(" ")}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6"
          style={{ borderTop: "1px solid rgba(180,170,155,0.25)" }}
        >
          <p className="font-sans text-stone-500 m-0" style={{ fontSize: "0.78rem" }}>
            Every installation backed by in-person consultation · Gomti Nagar, Lucknow
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {["uPVC Windows", "Sliding Doors", "Modular Kitchen", "Wardrobes"].map((l) => (
              <span
                key={l}
                className="font-sans text-stone-500"
                style={{
                  fontSize: "0.58rem", fontWeight: 600,
                  padding: "4px 11px", borderRadius: "99px",
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(200,190,170,0.5)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}