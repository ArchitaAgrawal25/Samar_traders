import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

const WINDOW_TYPES = [
  {
    id: "01",
    name: "Sliding Windows",
    tagline: "Smooth. Silent. Sealed.",
    desc: "Low-maintenance uPVC sliding windows with stainless steel mosquito mesh and UV-stabilised profiles. Glide effortlessly on precision rollers and lock securely with multi-point handles — ideal for apartments and compact spaces.",
    highlights: ["No swing clearance needed", "SS mosquito mesh included", "UV & termite resistant", "Easy clean track"],
    accent: "#2a7a6a",
    accentLight: "#ddf0e8",
    tag: "Apartment · Compact",
    image: "/images/win1.jpg",
    featured: true,
  },
  {
    id: "02",
    name: "Casement Windows",
    tagline: "Hinged for maximum ventilation.",
    desc: "Side-hinged uPVC casement windows that open fully outward for unobstructed airflow. ROTO Germany hardware with triple EPDM gasket sealing ensures weather-tight performance in every season.",
   
    highlights: ["Full-perimeter sealing", "German ROTO hardware", "100% opening area", "Secure restrict-and-open mode"],
    accent: "#3a6a8a",
    accentLight: "#ddeaf5",
    tag: "Residential · Ventilation",
    image: "/images/win2.webp",
    featured: false,
  },
  {
    id: "03",
    name: "Tilt & Turn Windows",
    tagline: "Two functions. One premium window.",
    desc: "The most versatile uPVC window — tilt inward at the top for secure background ventilation, or turn fully open for cleaning and maximum airflow. German engineering at its finest for modern urban homes.",
    highlights: ["Secure tilt ventilation", "Full-turn for easy cleaning", "Burglar-resistant mechanism", "Thermal break insulation"],
    accent: "#c8822a",
    accentLight: "#f5e9d8",
    tag: "Premium · Dual-mode",
    image: "/images/win3.png",
    featured: false,
  },
  {
    id: "04",
    name: "Fixed Windows",
    tagline: "Frame the view. That's it.",
    desc: "Non-operable uPVC fixed windows designed purely to maximise light and frame beautiful views. Minimal sightlines, maximum glass area — perfect as architectural feature windows, skylights or picture windows.",

    highlights: ["Maximum glass-to-frame ratio", "Excellent thermal performance", "Any shape — arch, triangle, trapeze", "No hardware = no maintenance"],
    accent: "#6a5acd",
    accentLight: "#ece9ff",
    tag: "Feature · Skylight",
    image: "/images/win4.png",
    featured: true,
  },
  {
    id: "05",
    name: "Combination Windows",
    tagline: "Fixed light. Operable ventilation.",
    desc: "Smart window systems combining fixed and operable panels in one frame — a fixed lower or centre panel for maximum light, paired with casement or sliding vents where ventilation is needed. Flexible, architectural, beautiful.",

    highlights: ["Best of both worlds", "Single-frame clean look", "Custom panel configurations", "Architectural flexibility"],
    accent: "#2f6f6a",
    accentLight: "#ddf0e8",
    tag: "Bespoke · Architectural",
    image: "/images/win5.png",
    featured: false,
  },
];

function WindowCard({ win, index }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (index % 3) * 0.08,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.6, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
  };

  return (
    <article
      ref={cardRef}
      id={`window-${win.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative scroll-mt-24 overflow-hidden rounded-[28px] border border-[#d6e2dc]/80 bg-white/80 opacity-0 shadow-[0_18px_55px_rgba(28,25,23,0.08)] backdrop-blur-xl"
    >
      <div className="grid min-h-full lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[260px] overflow-hidden sm:min-h-[310px] lg:min-h">
          <div
            ref={imgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${win.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-stone-950/10 to-white/10" />

          <div
            className="absolute left-4 top-4 rounded-full border px-3 py-1.5 font-sans text-[0.52rem] font-bold uppercase tracking-[0.18em]"
            style={{
              background: win.accentLight,
              color: win.accent,
              borderColor: `${win.accent}30`,
            }}
          >
            {win.tag}
          </div>

          <div className="pointer-events-none absolute bottom-3 right-4 select-none font-serif text-[5rem] font-bold leading-none text-white/20">
            {win.id}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="m-0 font-serif text-[clamp(1.55rem,4vw,2.25rem)] font-normal leading-tight tracking-[-0.02em] text-white">
              {win.name}
            </h3>
            <p className="m-0 mt-1 font-sans text-[0.75rem] italic text-white/75">
              {win.tagline}
            </p>
          </div>
        </div>

        <div className="flex flex-col p-5 sm:p-6 lg:p-7">
          <p className="m-0 mb-5 font-sans text-[0.88rem] leading-relaxed text-stone-600">
            {win.desc}
          </p>

          <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {win.highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-2 rounded-full bg-stone-50 px-3 py-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: win.accent }} />
                <span className="font-sans text-[0.74rem] font-medium text-stone-600">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Windows() {
  const heroRef = useRef(null);
  const { open } = useQuoteModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-windows",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power4.out",
          delay: 0.05,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <header
        ref={heroRef}
        className="relative overflow-hidden border-b border-[#b9d6cc]/45 bg-[linear-gradient(160deg,#fbfffb_0%,#eef8f4_48%,#fff5e8_100%)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(120,170,150,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(120,170,150,0.07)_1px,transparent_1px)] bg-[length:44px_44px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#cdeee3]/70 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-52 w-52 rounded-full bg-[#f0d9b8]/55 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-4 pb-12 pt-28 sm:px-5 md:px-3 md:pt-32 lg:px-2">
         

          <div className="mx-auto max-w-4xl text-center">
            <div className="hero-windows mb-3 flex items-center justify-center gap-3 opacity-0">
              <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-[#9ecfbf] to-[#2a7a6a]" />
              <span className="font-sans text-[0.62rem] font-extrabold uppercase tracking-[0.28em] text-[#2a7a6a]">
                uPVC Window Collection
              </span>
            </div>

            <h1 className="hero-windows m-0 font-serif text-[clamp(2.55rem,7vw,5.5rem)] font-normal leading-[0.94] tracking-[-0.045em] text-stone-900 opacity-0">
              Windows that frame
              <br />
              <em className="bg-[linear-gradient(135deg,#2a7a6a_0%,#6aafa0_50%,#c8a96e_100%)] bg-clip-text italic text-transparent">
                better living.
              </em>
            </h1>

            <p className="hero-windows mx-auto mt-5 max-w-[620px] font-sans text-[clamp(0.86rem,1.25vw,1rem)] leading-relaxed text-stone-500 opacity-0">
              Five premium uPVC window systems engineered for Indian climates, from sleek sliding
              frames to precision tilt-and-turn mechanisms. Your view, your ventilation, your choice.
            </p>
          </div>

          <div className="hero-windows mt-10 flex flex-wrap justify-center gap-2 opacity-0">
            {WINDOW_TYPES.map((win) => (
              <button
                key={win.id}
                type="button"
                onClick={() =>
                  document.getElementById(`window-${win.id}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="rounded-full border border-[#8bbcab]/40 bg-white/65 px-4 py-2 font-sans text-[0.66rem] font-medium text-[#2f6f6a] backdrop-blur-lg transition-all duration-200 hover:border-[#2a7a6a]/50 hover:bg-white/95"
              >
                {win.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 py-12 sm:px-5 md:px-3 md:py-16 lg:px-2">
        <div className="mb-9 flex items-center gap-4">
          <span className="h-px flex-1 bg-stone-200" />
          <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] text-stone-400">
            All window types · {WINDOW_TYPES.length} products
          </span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="grid gap-12">
          {WINDOW_TYPES.map((win, index) => (
            <WindowCard key={win.id} win={win} index={index} />
          ))}
        </div>
      </main>

      <section className="mx-auto mb-14 max-w-[1240px] px-4 sm:px-5 md:px-3 lg:px-2">
        <div className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#10211d_0%,#18342e_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
          <div className="grid md:grid-cols-[1fr_1px_1fr]">
            <div className="p-7 md:p-10">
              <p className="mb-1 font-sans text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#9ecfbf]">
                Not sure which window?
              </p>

              <h3 className="m-0 mb-3 font-serif text-[1.65rem] font-normal leading-tight tracking-[-0.02em] text-white">
                We visit, measure, <em className="italic text-[#9ecfbf]">then advise.</em>
              </h3>

              <p className="m-0 font-sans text-[0.82rem] leading-relaxed text-white/55">
                Free in-home consultation. We bring samples, measure your openings, and recommend
                the right window system for each room.
              </p>
            </div>

            <div className="hidden bg-white/10 md:block" />

            <div className="flex flex-col items-start justify-center gap-3 p-7 md:p-10">
              <button
                type="button"
                onClick={open}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#9ecfbf] to-[#6aafa0] px-7 py-3.5 font-sans text-[0.82rem] font-semibold text-[#10211d] shadow-[0_8px_24px_rgba(158,207,191,0.25)] transition-all duration-200 hover:scale-[1.03]"
              >
                Get a free quote
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium text-white/60 no-underline transition-colors hover:text-white/90"
              >
                Or talk to us directly →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}