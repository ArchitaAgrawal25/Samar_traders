import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { num: "01", title: "Hand-measured",        desc: "Every site, every time. No assumptions." },
  { num: "02", title: "In-house fabrication", desc: "From raw material to polished frame, under one roof." },
  { num: "03", title: "Quality warranty",     desc: "Every structural install backed by our commitment." },
];

export default function About() {
  const sectionRef    = useRef(null);
  const imgRef        = useRef(null);
  const badgeAwardRef = useRef(null);
  const badgeEstRef   = useRef(null);
  const eyebrowRef    = useRef(null);
  const headingRef    = useRef(null);
  const paraRef       = useRef(null);
  const featuresRef   = useRef(null);
  const founderRef    = useRef(null);
  const sidebarRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sidebarRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });

      gsap.fromTo(imgRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });

      gsap.fromTo([badgeAwardRef.current, badgeEstRef.current],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.4)", delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });

      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, paraRef.current, featuresRef.current, founderRef.current].filter(Boolean),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f3ee] py-20 md:py-0"
    >
      {/* bg blobs */}
      <div aria-hidden="true" className="absolute pointer-events-none rounded-full -top-[10%] -left-[8%] w-[42vw] h-[42vw]"
        style={{ background: "radial-gradient(circle,rgba(200,185,155,0.18) 0%,transparent 70%)" }} />
      <div aria-hidden="true" className="absolute pointer-events-none rounded-full -bottom-[8%] -right-[6%] w-[36vw] h-[36vw]"
        style={{ background: "radial-gradient(circle,rgba(168,213,200,0.14) 0%,transparent 70%)" }} />

      {/*
        Layout:
        - Mobile:  flex-col  →  eyebrow / image / heading / para / features / founder
        - Desktop: grid 2col →  image left, all copy right
      */}
<div className="w-full max-w-[1200px] mx-auto px-[1vw] flex flex-col md:grid md:grid-cols-2 md:items-center gap-5 md:gap-x-[clamp(32px,5vw,80px)] md:gap-y-4">
        {/* ── EYEBROW — visible above image on mobile, first in copy col on desktop ── */}
        <div
          ref={eyebrowRef}
          className="opacity-0 text-center order-1 md:order-none md:col-start-2 md:row-start-1"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="flex-1 max-w-[48px] h-px bg-[#c8b99a]" />
            <span className="font-serif text-[clamp(1.5rem,2.4vw,2.2rem)] font-semibold uppercase tracking-wider text-stone-900">
              Our Story
            </span>
            <span className="flex-1 max-w-[48px] h-px bg-[#c8b99a]" />
          </div>
        </div>

        {/* ── IMAGE COLUMN ── */}
        <div className="relative order-2 md:order-none md:col-start-1 md:row-start-1 md:row-span-5">
          {/* sidebar label — desktop only */}
          <div
            ref={sidebarRef}
            className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 items-center gap-2 opacity-0"
            style={{ transformOrigin: "center center" }}
          >
            <span className="w-5 h-px bg-[#c8b99a] inline-block" />
            <span className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-[#a8a29e] whitespace-nowrap">About</span>
            <span className="w-px h-8 bg-[#c8b99a] inline-block" />
            <span className="font-sans text-[0.55rem] tracking-[0.1em] text-[#c8b99a] whitespace-nowrap">01 / 03</span>
          </div>

          {/* award badge */}
          <div
            ref={badgeAwardRef}
            className="absolute -top-3 right-5 z-[4] opacity-0 rounded-2xl px-3 py-1.5 border border-[rgba(200,185,155,0.5)]"
            style={{ background: "rgba(252,237,210,0.92)", backdropFilter: "blur(10px)", boxShadow: "0 4px 18px rgba(0,0,0,0.08)" }}
          >
            <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-[#9a7a4a] mb-0.5">Trusted Dealer</p>
            <p className="font-serif text-[0.82rem] text-stone-700 italic m-0">Gomti Nagar, Lucknow</p>
          </div>

          {/* main image */}
          <div
            ref={imgRef}
            className="relative rounded-[18px] overflow-hidden opacity-0"
            style={{ aspectRatio: "4/5", maxHeight: "calc(100vh - 140px)", background: "#d4c9b5", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
          >
            <img
              src="/images/hero3.jpeg"
              alt="Samar Trading workshop"
              className="w-full h-full object-cover block"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="absolute bottom-0 left-0 right-0 z-[2] px-5 pt-2 pb-2"
              style={{ background: "linear-gradient(to top,rgba(20,16,12,0.72) 0%,transparent 100%)" }}>
              <p className="font-serif italic text-[0.9rem] text-white/90 m-0">Workshop · crafting every door.</p>
            </div>
          </div>

          {/* est. badge */}
          <div
            ref={badgeEstRef}
            className="absolute -bottom-4 -left-3 z-[4] opacity-0 rounded-full w-[72px] h-[72px] flex flex-col items-center justify-center border-[1.5px] border-[rgba(200,185,155,0.45)]"
            style={{ background: "rgba(245,243,238,0.95)", backdropFilter: "blur(14px)", boxShadow: "0 8px 28px rgba(0,0,0,0.1)" }}
          >
            <span className="font-sans text-[0.48rem] tracking-[0.12em] uppercase text-[#a8a29e]">Est.</span>
            <span className="font-serif text-[1.2rem] font-semibold text-stone-900 leading-none">2024</span>
          </div>
        </div>

        {/* ── HEADING ── */}
        <h2
          ref={headingRef}
          className="about-heading opacity-0 font-serif font-normal leading-tight tracking-tight text-stone-900 m-0 order-3 md:order-none md:col-start-2"
          style={{ fontSize: "clamp(1.6rem,2.8vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
        >
          A business that{" "}
          <em className="not-italic" style={{ color: "#2a7a6a", fontStyle: "italic" }}>listens first,</em>
          <br />
          then builds{" "}
          <em className="not-italic" style={{ color: "#c8822a", fontStyle: "italic" }}>for you.</em>
        </h2>

        {/* ── PARA ── */}
        <p
          ref={paraRef}
          className="opacity-0 font-sans leading-relaxed text-stone-500 m-0 max-w-[440px] order-4 md:order-none md:col-start-2"
          style={{ fontSize: "clamp(0.8rem,1vw,0.92rem)" }}
        >
          Established in 2017, Samar Trading is a one-stop destination for premium aluminium,
          uPVC, glass and wooden solutions in Gomti Nagar, Lucknow. Every window, door and
          partition we deliver is measured, fabricated and installed by our own team — under one roof.
        </p>

        {/* ── FEATURES ── */}
        <div ref={featuresRef} className="opacity-0 order-5 md:order-none md:col-start-2">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              className="grid items-center py-3 border-t border-[rgba(180,170,155,0.25)] transition-colors duration-200 hover:bg-[rgba(200,185,155,0.07)] cursor-default"
              style={{ gridTemplateColumns: "32px 1fr auto 18px", gap: "10px 14px",
                borderBottom: i === FEATURES.length - 1 ? "1px solid rgba(180,170,155,0.25)" : "none" }}
            >
              <span className="font-sans text-[0.6rem] text-[#c8b99a] tracking-[0.05em]">{f.num}</span>
              <span className="font-serif text-[0.95rem] font-semibold text-stone-900">{f.title}</span>
              <span className="font-sans text-[0.78rem] text-[#9a9188] leading-snug">{f.desc}</span>
              <span className="text-[#c8b99a] text-[0.85rem]">→</span>
            </div>
          ))}
        </div>

        {/* ── FOUNDER ── */}
        <div
          ref={founderRef}
          className="opacity-0 flex items-center justify-between gap-4 order-6 md:order-none md:col-start-2"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg,#9ecfbf 0%,#6aafa0 100%)", boxShadow: "0 4px 14px rgba(106,175,160,0.3)" }}
            >
              <span className="font-serif text-base font-semibold text-white">S</span>
            </div>
            <div>
              <p className="font-serif italic text-[0.88rem] text-stone-900 m-0 mb-0.5">— Satendra Tiwari</p>
              <p className="font-sans text-[0.55rem] tracking-[0.14em] uppercase text-[#a8a29e] m-0">
                Founder · Gomti Nagar, Lucknow
              </p>
            </div>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 font-sans text-[0.75rem] text-stone-700 no-underline border-b border-[rgba(180,170,155,0.5)] pb-px whitespace-nowrap transition-colors duration-200 hover:text-stone-900 hover:border-stone-900"
          >
            Read the full story <span className="text-[0.85rem]">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}