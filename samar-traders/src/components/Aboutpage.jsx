import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const VALUES = [
  {
    num: "01",
    title: "Precision Craftsmanship",
    desc: "Every cut, every seal, every fitting is executed to exacting standards. We treat your home with the same care we would our own.",
    accent: "#2a7a6a",
    accentBg: "rgba(42,122,106,0.08)",
    accentBorder: "rgba(42,122,106,0.2)",
  },
  {
    num: "02",
    title: "Honest Consultation",
    desc: "We recommend what's right for your space, budget, and lifestyle — not what carries the highest margin. Always.",
    accent: "#a07840",
    accentBg: "rgba(200,169,110,0.1)",
    accentBorder: "rgba(200,169,110,0.25)",
  },
  {
    num: "03",
    title: "End-to-End Ownership",
    desc: "From the first site visit to the final snag — our team owns the entire process. No subcontracting, no handoffs, no excuses.",
    accent: "#7a5c8a",
    accentBg: "rgba(122,92,138,0.08)",
    accentBorder: "rgba(122,92,138,0.2)",
  },
  {
    num: "04",
    title: "Long-Term Thinking",
    desc: "We use materials and systems that outlast trends. Our clients return for new projects because the first one stood the test.",
    accent: "#8a4a3a",
    accentBg: "rgba(138,74,58,0.08)",
    accentBorder: "rgba(138,74,58,0.2)",
  },
];

const STATS = [
  { value: "150+", label: "Projects Delivered" },
  { value: "5000+", label: "Installs" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "2yr+", label: "In Business" },];

const PILLARS = [
  {
    title: "Large-Scale Execution",
    desc: "From individual homes to institutional campuses — our team scales seamlessly without compromising quality.",
  },
  {
    title: "In-House Expertise",
    desc: "Every consultation, design, fabrication and installation is handled internally by our trained specialists.",
  },
  {
    title: "Client-First Process",
    desc: "We listen before we recommend. Our process is built around your requirements, not a catalogue.",
  },
];

/* ─── Section: Hero ─── */
function HeroSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero-el",
        { opacity: 0, y: 28, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.1, ease: "expo.out", delay: 0.1 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden flex items-center"
      style={{ background: "linear-gradient(160deg, #faf7f2 0%, #f5f0e8 40%, #ede8de 100%)" }}>

      <div className="pointer-events-none absolute -top-24 right-[10%] h-[520px] w-[520px] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.22) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-0 left-[5%] h-[420px] w-[420px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(168,213,200,0.2) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[320px] w-[320px] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(220,190,150,0.18) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 mx-auto  w-full max-w-[860px] px-6 py-14 md:px-12 flex flex-col items-center text-center">

        

        {/* Eyebrow */}
        <div className="about-hero-el mb-6 inline-flex items-center gap-3 opacity-0">
          <div className="h-px w-10 bg-gradient-to-r from-[#c8b99a] to-transparent" />
          <span className="font-sans text-[0.6rem] font-extrabold uppercase tracking-[0.28em] text-[#6b6560]">Our Story</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c8b99a]" />
        </div>

        {/* Heading */}
        <h1 className="about-hero-el opacity-0 m-0 mb-5 font-serif text-stone-900 leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)" }}>
          Built on{" "}
          <em className="bg-gradient-to-r from-[#a07840] via-[#c8a96e] to-[#2a7a6a] bg-clip-text italic text-transparent">
            trust.
          </em>
        </h1>

        {/* Description */}
        <p className="about-hero-el opacity-0 mb-10 max-w-8xl font-sans leading-relaxed text-stone-500"
          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}>
          Since 2024, Samar Trading has delivered premium uPVC doors and windows, modular kitchens, wardrobes and interior solutions across Lucknow — driven by a team with an obsession for
          precision and zero tolerance for mediocrity.
        </p>

        {/* CTAs */}
        <div className="about-hero-el opacity-0 flex flex-wrap justify-center gap-3 mb-14">
          <Link to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#c8a96e] to-[#a07840] px-7 py-3.5 font-sans text-[0.82rem] font-semibold text-white no-underline shadow-[0_8px_28px_rgba(160,120,64,0.3)] transition-all duration-200 hover:scale-[1.04]">
            Our Services
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(180,165,140,0.5)] bg-white/60 px-7 py-3.5 font-sans text-[0.82rem] font-semibold text-stone-700 no-underline backdrop-blur-xl transition-all duration-200 hover:bg-white/80">
            Get in Touch
          </Link>
        </div>

        {/* Stats */}
        <div className="about-hero-el opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[640px]">
          {STATS.map((s) => (
            <div key={s.label}
              className="rounded-[20px] border border-[rgba(200,185,155,0.4)] bg-white/55 p-5 backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.05)] flex flex-col items-center gap-1">
              <p className="m-0 font-serif text-[2.2rem] font-semibold leading-none tracking-[-0.04em] text-stone-900">{s.value}</p>
              <p className="m-0 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-stone-400 text-center">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        
      </div>

      <style>{`
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}

/* ─── Section: Our Approach (replaces FounderSection) ─── */
function ApproachSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".approach-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 78%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-24 flex flex-col items-center"
      style={{ background: "linear-gradient(180deg, #f0ede7 0%, #f5f2ec 100%)" }}>

      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.15) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[350px] w-[350px] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(168,213,200,0.14) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto w-full max-w-[860px] px-6 md:px-12 flex flex-col items-center text-center gap-8">

        {/* Eyebrow */}
        <div className="approach-el opacity-0 flex items-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-[#c8b99a] to-transparent" />
          <span className="font-sans text-[0.6rem] font-extrabold uppercase tracking-[0.28em] text-[#6b6560]">How We Work</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c8b99a]" />
        </div>

        {/* Heading */}
        <h2 className="approach-el opacity-0 m-0 font-serif font-normal text-stone-900 leading-[1.04] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          A team built around{" "}
          <em className="italic text-[#a07840]">your project.</em>
        </h2>

        {/* Para */}
        <p className="approach-el opacity-0 m-0 max-w-[1240px] font-sans text-stone-500 leading-relaxed"
          style={{ fontSize: "0.92rem" }}>
          Samar Trading was founded with a clear conviction — that Lucknow's homeowners and
          institutions deserve the same premium materials and installation standards found in
          India's largest cities, delivered by a team that genuinely cares about the outcome.
          Our professionals lead every consultation personally, ensuring nothing is lost between
          the idea and the installation.
        </p>

        {/* Pillars */}
        <div className="approach-el opacity-0 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          {PILLARS.map((p) => (
            <div key={p.title}
              className="rounded-[22px] border border-[rgba(200,185,155,0.4)] bg-white/60 px-6 py-7 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1">
              <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-[#c8a96e] to-[#a07840]" />
              <h3 className="m-0 font-serif text-[1rem] font-semibold text-stone-900 leading-snug">{p.title}</h3>
              <p className="m-0 font-sans text-[0.8rem] text-stone-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Feature rows */}
        <div className="approach-el opacity-0 w-full text-left mt-2">
          {[
            { label: "Custom-tailored designs", desc: "Every solution shaped to your style, dimensions & needs." },
            { label: "End-to-end service",       desc: "Consultation, design, installation and finishing — all in-house." },
            { label: "Strict quality standards", desc: "Premium materials, skilled craftsmen, zero compromise." },
          ].map((f, i, arr) => (
            <div key={f.label}
              className={`flex items-start gap-4 py-4 transition-colors duration-200 hover:bg-[rgba(200,185,155,0.08)] cursor-default ${i < arr.length - 1 ? "border-b border-[rgba(180,170,155,0.25)]" : ""}`}>
              <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a96e]" />
              <div>
                <p className="m-0 font-serif text-[0.95rem] font-semibold text-stone-800">{f.label}</p>
                <p className="m-0 mt-0.5 font-sans text-[0.78rem] text-stone-500 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Section: Values ─── */
function ValuesSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".value-heading",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" } });

      gsap.utils.toArray(".value-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 90%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #f5f2ec 0%, #ede8df 100%)" }}>

      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(168,213,200,0.16) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.14) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">

        {/* Header — centered */}
        <div className="value-heading opacity-0 mb-14 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-[#c8b99a] to-transparent" />
            <span className="font-sans text-[0.6rem] font-extrabold uppercase tracking-[0.28em] text-[#6b6560]">What We Stand For</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c8b99a]" />
          </div>
          <h2 className="m-0 font-serif font-normal text-stone-900 leading-[1.02] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>
            Our values,{" "}
            <em className="italic text-[#2a7a6a]">non-negotiable.</em>
          </h2>
          <p className="m-0 font-sans text-stone-500 max-w-[1240px] leading-relaxed"
            style={{ fontSize: "0.85rem" }}>
            These aren't mission statement filler. They're the decisions our team makes every day on site.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {VALUES.map((v) => (
            <div key={v.num}
              className="value-card group relative overflow-hidden rounded-[24px] border p-7 md:p-8 opacity-0 transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                background: "rgba(255,255,255,0.65)",
                borderColor: "rgba(200,190,170,0.45)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle, ${v.accent}18 0%, transparent 70%)` }} />
              <div className="flex items-start justify-between mb-5">
                <span className="font-sans text-[0.56rem] tracking-[0.14em] text-stone-400">{v.num}</span>
                <div className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{ background: v.accent }} />
              </div>
              <h3 className="m-0 mb-3 font-serif text-stone-900 leading-tight tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}>
                {v.title}
              </h3>
              <p className="m-0 font-sans text-stone-500 leading-relaxed" style={{ fontSize: "0.86rem" }}>
                {v.desc}
              </p>
              <div className="mt-6 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: `linear-gradient(to right, ${v.accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Showroom CTA ─── */
function ShowroomCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #1c1714 0%, #241e18 100%)" }}>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(200,169,110,0.14) 0%, rgba(42,122,106,0.1) 60%, transparent 100%)" }} />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <img src="/images/show1.JPG" alt="" className="h-full w-full object-cover opacity-[0.08]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(28,23,20,0.95) 0%, rgba(28,23,20,0.88) 100%)" }} />
      </div>
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12 text-center flex flex-col items-center gap-6">

        <div className="cta-el opacity-0 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c8b99a]/60" />
          <span className="font-sans text-[0.6rem] font-extrabold uppercase tracking-[0.28em] text-[#c8b99a]">Visit Us</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c8b99a]/60" />
        </div>

        <h2 className="cta-el opacity-0 m-0 font-serif font-normal text-white leading-[0.96] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}>
          See it. Touch it.<br />
          <em className="bg-gradient-to-r from-[#c8a96e] via-[#e0c890] to-[#9ecfbf] bg-clip-text italic text-transparent">
            Decide with confidence.
          </em>
        </h2>

        <p className="cta-el opacity-0 m-0 font-sans text-white/45 leading-relaxed max-w-[1240px]"
          style={{ fontSize: "0.92rem" }}>
          Our showroom in Gomti Nagar, Lucknow is open Monday to Sunday, 11 AM to 8 PM.
          Walk in — no appointment needed. Our team will guide you through every option.
        </p>

        <div className="cta-el opacity-0 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-sans text-[0.85rem] font-semibold text-stone-900 no-underline transition-all duration-200 hover:scale-[1.04]"
            style={{ background: "linear-gradient(135deg, #c8a96e 0%, #a07840 100%)", boxShadow: "0 12px 40px rgba(200,169,110,0.3)" }}>
            Get in Touch
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link to="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 font-sans text-[0.85rem] font-semibold text-white/70 no-underline backdrop-blur-xl transition-all duration-200 hover:bg-white/8 hover:text-white"
            style={{ borderColor: "rgba(200,185,155,0.25)" }}>
            Explore Services
          </Link>
        </div>

        {/* Address strip */}
        <div className="cta-el opacity-0 flex flex-wrap items-center justify-center gap-8 mt-4">
          {[
            { icon: "📍", text: "Gomti Nagar, Lucknow" },
            { icon: "🕐", text: "Mon–Sun · 11AM–8PM" },
            { icon: "📞", text: "+91 84291 53343" },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <span className="font-sans text-[0.72rem] text-white/35">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ─── */
export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f5f3ee" }}>
      <HeroSection />
      <ApproachSection />
      <ValuesSection />
      <ShowroomCTA />
    </div>
  );
}