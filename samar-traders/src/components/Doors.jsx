import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuoteModal } from "./QuoteModal";

gsap.registerPlugin(ScrollTrigger);

const DOOR_TYPES = [
  {
    id: "01",
    name: "Sliding Doors",
    tagline: "Smooth, silent, and space-saving.",
    desc: "These uPVC sliding doors offer superior resistance to heat and sound, making them ideal for balconies, patios, and corporate spaces. Built with precision rollers and multi-point locking, they maximise daylight while minimizing space usage.",
    highlights: [
      "Heat & sound resistant",
      "Effortless gliding mechanism",
      "Ideal for balconies & offices",
      "Low maintenance uPVC"
    ],
    accent: "#7a5c3a",
    accentLight: "#f5e9d8",
    tag: "Balcony · Corporate",
    image: "/images/door3.png",
    featured: true,
  },

  {
    id: "02",
    name: "Casement Doors",
    tagline: "Elegance meets engineering excellence.",
    desc: "Casement doors blend elegance with functionality. With a diverse range of designs and colours, they offer durable, weather-sealed, and stylish door solutions suitable for entrances, service areas, and room dividers.",
    highlights: [
      "Full-perimeter weather sealing",
      "Durable uPVC engineering",
      "Wide design & colour options",
      "Superior security hardware"
    ],
    accent: "#3d6457",
    accentLight: "#ddf0e8",
    tag: "Entry · Service",
    image: "/images/door1.jpg",
    featured: false,
  },

  {
    id: "03",
    name: "French Doors",
    tagline: "Timeless beauty. Seamless transitions.",
    desc: "French doors are known for their classic elegance and ability to create a smooth indoor-outdoor connection. Ideal for gardens, terraces, and interior linking spaces—combining premium aesthetics with high-performance glazing.",
    highlights: [
      "Wide & clear opening",
      "Timeless heritage style",
      "Thermal insulation profiles",
      "Custom glazing options"
    ],
    accent: "#6b4c6e",
    accentLight: "#f3e8f5",
    tag: "Garden · Terrace",
    image: "/images/door2.jpg",
    featured: false,
  },

  {
    id: "04",
    name: "Lift & Slide Doors",
    tagline: "Effortless movement for large openings.",
    desc: "Lift & slide systems offer premium engineering for large spans. Panels lift off their seals before sliding, enabling feather-light movement even for heavy 300–400 kg sashes—ideal for villas, penthouses, and luxury interiors.",
    highlights: [
      "Ultra-smooth heavy-sash operation",
      "Minimal visible frame",
      "Energy-efficient engineering",
      "Panoramic unobstructed views"
    ],
    accent: "#3a5a7a",
    accentLight: "#ddeaf5",
    tag: "Villa · Penthouse",
    image: "/images/door5.webp",
    featured: true,
  },

  {
    id: "05",
    name: "Sliding Folding Doors",
    tagline: "Complete openness. Total flexibility.",
    desc: "Sliding folding door systems offer unmatched versatility. Designed to fold and stack neatly, they create wide-open expanses while maintaining an elegant appearance—perfect for outdoor living and large interior spaces.",
    highlights: [
      "Full-width opening mechanism",
      "2–8 panel configurations",
      "Secure anti-lift hardware",
      "Space-transforming flexibility"
    ],
    accent: "#6b5a3a",
    accentLight: "#f5ede0",
    tag: "Outdoor Living",
    image: "/images/door4.jpg",
    featured: false,
  },
];

function DoorCard({ door, index }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const { open } = useQuoteModal();
  const [expanded, setExpanded] = useState(false);

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
      id={`door-${door.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative scroll-mt-24 overflow-hidden rounded-[28px] border border-[#dccfbd]/70 bg-white/80 opacity-0 shadow-[0_18px_55px_rgba(28,25,23,0.08)] backdrop-blur-xl"
    >
      <div className="grid min-h-full lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[260px] overflow-hidden sm:min-h-[310px] lg:min-h">
          <div
            ref={imgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${door.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-stone-950/10 to-white/10" />

          <div
            className="absolute left-4 top-4 rounded-full border px-3 py-1.5 font-sans text-[0.52rem] font-bold uppercase tracking-[0.18em]"
            style={{
              background: door.accentLight,
              color: door.accent,
              borderColor: `${door.accent}30`,
            }}
          >
            {door.tag}
          </div>

          <div className="pointer-events-none absolute bottom-3 right-4 select-none font-serif text-[5rem] font-bold leading-none text-white/20">
            {door.id}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="m-0 font-serif text-[clamp(1.55rem,4vw,2.25rem)] font-normal leading-tight tracking-[-0.02em] text-white">
              {door.name}
            </h3>
            <p className="m-0 mt-1 font-sans text-[0.75rem] italic text-white/75">
              {door.tagline}
            </p>
          </div>
        </div>

        <div className="flex flex-col p-5 sm:p-6 lg:p-7">
          <p className="m-0 mb-5 font-sans text-[0.88rem] leading-relaxed text-stone-600">
            {door.desc}
          </p>

          <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {door.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 rounded-full bg-stone-50 px-3 py-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: door.accent }} />
                <span className="font-sans text-[0.74rem] font-medium text-stone-600">{h}</span>
              </div>
            ))}
          </div>


       
         
        </div>
      </div>
    </article>
  );
}

export default function Doors() {
  const heroRef = useRef(null);
  const { open } = useQuoteModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-doors-el",
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
  className="relative overflow-hidden border-b border-[#d9c7a8]/45 bg-[linear-gradient(160deg,#fffaf3_0%,#f8efe0_48%,#eef6f1_100%)]"
>
  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(180,160,130,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(180,160,130,0.07)_1px,transparent_1px)] bg-[length:44px_44px]" />
  <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#ead7b8]/55 blur-3xl" />
  <div className="pointer-events-none absolute bottom-0 left-10 h-52 w-52 rounded-full bg-[#cfeee5]/55 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-[1240px] px-4 pb-12 pt-28 sm:px-5 md:px-3 md:pt-32 lg:px-2">
    <div className="hero-doors-el mb-8 flex items-center justify-center gap-2 opacity-0">
      <Link
        to="/"
        className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-stone-400 no-underline transition-colors hover:text-stone-700"
      >
        Home
      </Link>
      <span className="text-stone-300">›</span>
      <Link
        to="/services"
        className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-stone-400 no-underline transition-colors hover:text-stone-700"
      >
        Services
      </Link>
      <span className="text-stone-300">›</span>
      <span className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#7a5c3a]">
        Doors
      </span>
    </div>

    <div className="mx-auto max-w-4xl text-center">
      <div className="hero-doors-el mb-3 flex items-center justify-center gap-3 opacity-0">
        <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-[#c8a96e] to-[#7a5c3a]" />
        <span className="font-sans text-[0.62rem] font-extrabold uppercase tracking-[0.28em] text-[#9a8060]">
          uPVC Door Collection
        </span>
      </div>

      <h1 className="hero-doors-el m-0 font-serif text-[clamp(2.55rem,7vw,5.5rem)] font-normal leading-[0.94] tracking-[-0.045em] text-stone-900 opacity-0">
        Doors that make
        <br />
        <em className="bg-[linear-gradient(135deg,#7a5c3a_0%,#c8a96e_50%,#3d6457_100%)] bg-clip-text italic text-transparent">
          space feel larger.
        </em>
      </h1>

      <p className="hero-doors-el mx-auto mt-5 max-w-[620px] font-sans text-[clamp(0.86rem,1.25vw,1rem)] leading-relaxed text-stone-500 opacity-0">
        Premium uPVC door systems built for India's climate, from effortless sliding panels
        to architectural folding walls. Every door is engineered for daily use, clean lines,
        and almost zero maintenance.
      </p>
    </div>

    <div className="hero-doors-el mt-10 flex flex-wrap justify-center gap-2 opacity-0">
      {DOOR_TYPES.map((door) => (
        <button
          key={door.id}
          type="button"
          onClick={() =>
            document.getElementById(`door-${door.id}`)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="rounded-full border border-[#b4a082]/40 bg-white/65 px-4 py-2 font-sans text-[0.66rem] font-medium text-[#6b5a40] backdrop-blur-lg transition-all duration-200 hover:border-[#7a5c3a]/50 hover:bg-white/95"
        >
          {door.name}
        </button>
      ))}
    </div>
  </div>
</header>

      <main className="mx-auto max-w-[1240px] px-4 py-12 sm:px-5 md:px-3 md:py-16 lg:px-2">
        <div className="mb-9 flex items-center gap-4">
          <span className="h-px flex-1 bg-stone-200" />
          <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] text-stone-400">
            All door types · {DOOR_TYPES.length} products
          </span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="grid gap-12 ">
          {DOOR_TYPES.map((door, index) => (
            <DoorCard key={door.id} door={door} index={index} />
          ))}
        </div>
      </main>

      <section className="mx-auto mb-14 max-w-[1240px] px-4 sm:px-5 md:px-3 lg:px-2">
        <div className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#1c1917_0%,#2d2318_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
          <div className="grid md:grid-cols-[1fr_1px_1fr]">
            <div className="p-7 md:p-10">
              <p className="mb-1 font-sans text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#c8a96e]">
                Not sure which door?
              </p>

              <h3 className="m-0 mb-3 font-serif text-[1.65rem] font-normal leading-tight tracking-[-0.02em] text-white">
                We visit, measure, <em className="italic text-[#d6b58a]">then advise.</em>
              </h3>

              <p className="m-0 font-sans text-[0.82rem] leading-relaxed text-white/55">
                Free in-home consultation. We bring samples, measure your openings, and recommend
                exactly the right door for each space.
              </p>
            </div>

            <div className="hidden bg-white/10 md:block" />

            <div className="flex flex-col items-start justify-center gap-3 p-7 md:p-10">
              <button
                type="button"
                onClick={open}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#c8a96e] to-[#d6b58a] px-7 py-3.5 font-sans text-[0.82rem] font-semibold text-stone-900 shadow-[0_8px_24px_rgba(200,169,110,0.3)] transition-all duration-200 hover:scale-[1.03]"
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