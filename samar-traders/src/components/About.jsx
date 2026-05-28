import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { num: "01", title: "Custom-tailored designs",  desc: "Every solution shaped to your style, dimensions & needs." },
  { num: "02", title: "End-to-end service",        desc: "Consultation, design, installation and finishing — all in-house." },
  { num: "03", title: "Strict quality standards",  desc: "Premium materials, skilled craftsmen, zero compromise." },
];

const STATS = [
  { value: "150+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "5000+",   label: "Installs" },
];

export default function About() {
  const sectionRef    = useRef(null);
  const eyebrowRef    = useRef(null);
  const headingRef    = useRef(null);
  const paraRef       = useRef(null);
  const featuresRef   = useRef(null);
  const statsRef      = useRef(null);
  const closingRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, paraRef.current, featuresRef.current, statsRef.current, closingRef.current].filter(Boolean),
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f3ee] py-16 md:py-0"
    >
      {/* bg blobs */}
      <div aria-hidden="true" className="absolute pointer-events-none rounded-full -top-[10%] -left-[8%] w-[42vw] h-[42vw]"
        style={{ background: "radial-gradient(circle,rgba(200,185,155,0.18) 0%,transparent 70%)" }} />
      <div aria-hidden="true" className="absolute pointer-events-none rounded-full -bottom-[8%] -right-[6%] w-[36vw] h-[36vw]"
        style={{ background: "radial-gradient(circle,rgba(168,213,200,0.14) 0%,transparent 70%)" }} />

      <div className="w-full flex flex-col items-center text-center gap-8 mx-auto px-4" style={{ maxWidth: "780px" }}>

        {/* 1 ── SECTION LABEL ── */}
        <div ref={eyebrowRef} className="opacity-0 flex items-center gap-3">
          <span className="flex-1 max-w-[48px] h-px bg-[#c8b99a]" />
          <span className="font-serif text-[clamp(1.5rem,2.4vw,2.2rem)] font-semibold uppercase tracking-wider text-stone-900">
            Our Story
          </span>
          <span className="flex-1 max-w-[48px] h-px bg-[#c8b99a]" />
        </div>

        {/* 2 ── HEADING ── */}
        <h2
          ref={headingRef}
          className="opacity-0 font-serif font-normal text-stone-900 m-0"
          style={{ fontSize: "clamp(1.8rem,3.4vw,3rem)", letterSpacing: "-0.02em", lineHeight: 1.12 }}
        >
          Premium products,{" "}
          <em style={{ color: "#2a7a6a", fontStyle: "italic" }}>crafted with care,</em>{" "}
          delivered with{" "}
          <em style={{ color: "#c8822a", fontStyle: "italic" }}>precision.</em>
        </h2>

        {/* 3 ── DESCRIPTION ── */}
        <p
          ref={paraRef}
          className="opacity-0 font-sans leading-relaxed text-stone-500 m-0"
          style={{ fontSize: "clamp(0.85rem,1.05vw,0.96rem)" }}
        >
          Samar Trading is a leading provider of high-quality uPVC doors and windows, modular
          kitchens, wardrobes, and interior design solutions. Backed by years of industry
          experience and a team of skilled professionals, we deliver exceptional craftsmanship,
          innovative designs and personalised solutions — tailored to your style, space and budget.
          Every project is handled end-to-end by our in-house team, ensuring consistent quality
          from the first consultation to the final installation.
        </p>

        {/* 4a ── STATS ── */}
        <div ref={statsRef} className="opacity-0 w-full grid grid-cols-3 gap-6 py-2">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span
                className="font-serif font-semibold leading-none text-stone-900"
                style={{ fontSize: "clamp(1.7rem,2.6vw,2.4rem)", letterSpacing: "-0.03em" }}
              >
                {s.value}
              </span>
              <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* 4b ── FEATURES ── */}
        <div ref={featuresRef} className="opacity-0 w-full text-left">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              className="grid items-center py-3 border-t border-[rgba(180,170,155,0.25)] transition-colors duration-200 hover:bg-[rgba(200,185,155,0.07)] cursor-default"
              style={{
                gridTemplateColumns: "32px 1fr auto 18px",
                gap: "10px 14px",
                borderBottom: i === FEATURES.length - 1 ? "1px solid rgba(180,170,155,0.25)" : "none",
              }}
            >
              <span className="font-sans text-[0.6rem] text-[#c8b99a] tracking-[0.05em]">{f.num}</span>
              <span className="font-serif text-[0.95rem] font-semibold text-stone-900">{f.title}</span>
              <span className="font-sans text-[0.78rem] text-[#9a9188] leading-snug">{f.desc}</span>
              <span className="text-[#c8b99a] text-[0.85rem]">→</span>
            </div>
          ))}
        </div>

        {/* 4c ── CLOSING / CTA ── */}
        <div ref={closingRef} className="opacity-0 flex flex-col items-center gap-3">
          <span className="font-sans text-[0.75rem] text-stone-500 italic">
            Serving homes &amp; businesses across Lucknow since 2024.
          </span>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 font-sans text-[0.75rem] text-stone-700 no-underline border-b border-[rgba(180,170,155,0.5)] pb-px whitespace-nowrap transition-colors duration-200 hover:text-stone-900 hover:border-stone-900"
          >
            Our full story <span className="text-[0.85rem]">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}