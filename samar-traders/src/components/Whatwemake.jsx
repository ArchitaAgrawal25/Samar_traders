import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    name: "uPVC Doors & Windows",
    desc: "Premium sliding, casement, and French-style uPVC solutions for modern spaces.",
    bg: "/images/hero1.jpg",
    color: "rgba(168,213,200,0.85)",
    path: "/products/upvc",
  },
  {
    id: "02",
    name: "Modular Kitchen Solutions",
    desc: "Customized modular kitchens with smart layouts, cabinets, and accessories.",
    bg: "/images/hero2.jpg",
    color: "rgba(200,185,155,0.85)",
    path: "/products/kitchen",
  },
  {
    id: "03",
    name: "Custom Wardrobes",
    desc: "Stylish sliding, hinged, and walk-in wardrobes designed for maximum storage.",
    bg: "/images/hero3.jpeg",
    color: "rgba(220,210,255,0.82)",
    path: "/products/wardrobe",
  },
  {
    id: "04",
    name: "Residential Interior Design",
    desc: "Complete home interior solutions for elegant and functional living spaces.",
    bg: "/images/hero1.jpg",
    color: "rgba(252,220,170,0.85)",
    path: "/products/residential-interior",
  },
  {
    id: "05",
    name: "Commercial Interior Design",
    desc: "Professional interior designs for offices, showrooms, and commercial spaces.",
    bg: "/images/hero2.jpg",
    color: "rgba(205,232,245,0.85)",
    path: "/products/commercial-interior",
  },
  {
    id: "06",
    name: "Furniture & Space Planning",
    desc: "Smart furniture layouts and space optimization for modern interiors.",
    bg: "/images/hero3.jpeg",
    color: "rgba(200,240,200,0.82)",
    path: "/products/space-planning",
  },
];

export default function WhatWeMake() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);
  const linkRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, linkRef.current],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
            delay: (i % 3) * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#f5f3ee] py-14 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[5%] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(168,213,200,0.12)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] left-[-6%] h-[35vw] w-[35vw] rounded-full bg-[radial-gradient(circle,rgba(252,220,170,0.14)_0%,transparent_70%)]"
      />

      <div className="relative z-10  max-w-7xl mx-1 md:mx-32 px-3 sm:px-4 md:px-3 lg:px-1">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div ref={eyebrowRef} className="mb-2 flex items-center gap-3 opacity-0">
              <span className="font-sans text-[0.9rem] font-extrabold uppercase tracking-[0.18em] text-[#6b6560]">
                Services
              </span>
            </div>

            <h2
              ref={headingRef}
              className="m-0 font-serif text-[clamp(2rem,4.2vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.025em] text-stone-900 opacity-0"
            >
              What we <em className="italic text-[#2a7a6a]">make.</em>
            </h2>
          </div>

          <Link
            ref={linkRef}
            to="/services"
            className="mb-1 inline-flex items-center gap-2 self-start border-b border-[rgba(180,170,155,0.5)] pb-px font-sans text-base text-stone-700 no-underline opacity-0 transition-all duration-200 hover:border-stone-900 hover:text-stone-900 md:self-auto"
          >
            See all <span className="inline-block transition-transform duration-200">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-4 md:gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              cardRef={(el) => {
                cardsRef.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, cardRef }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const btnRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 0.92,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(contentRef.current, {
      y: -6,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(btnRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      opacity: 0.78,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(btnRef.current, {
      opacity: 0,
      y: 6,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative aspect-[4/3.2] cursor-pointer overflow-hidden rounded-[20px] border border-white/70 opacity-0 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.8)_inset]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${service.bg})` }}
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] opacity-[0.78] backdrop-blur-[1px]"
        style={{ background: service.color }}
      />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.35)_0%,transparent_60%)]" />

      <div ref={contentRef} className="absolute inset-0 z-[3] flex flex-col justify-end p-5 md:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="m-0 mb-2 font-serif text-[clamp(1.3rem,2.4vw,1.6rem)] font-black leading-[1.08] tracking-[-0.02em] text-stone-950">
              {service.name}
            </h3>

            <p className="m-0 font-sans text-[clamp(0.82rem,1.1vw,0.95rem)] font-extrabold leading-snug text-stone-800">
              {service.desc}
            </p>
          </div>

          <Link
            ref={btnRef}
            to={service.path}
            className="inline-flex translate-y-1.5 items-center gap-2 self-start rounded-full border border-white/90 bg-white/75 px-[18px] py-2 font-sans text-[0.78rem] font-semibold text-stone-900 no-underline opacity-0 shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-shadow duration-200 hover:shadow-[0_4px_18px_rgba(0,0,0,0.14)]"
          >
            Explore
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}