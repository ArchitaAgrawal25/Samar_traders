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
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-14 md:py-20"
      style={{ background: "#f5f3ee" }}
    >
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          right: "-8%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(168,213,200,0.12) 0%,transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: "5%",
          left: "-6%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(252,220,170,0.14) 0%,transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <div
              ref={eyebrowRef}
              className="opacity-0 flex items-center gap-3 mb-2"
            >
              <span
                className="font-sans tracking-[0.18em] uppercase text-[#9a9188]"
                style={{ fontSize: "0.9rem", fontWeight: 900 }}
              >
                Services
              </span>
            </div>

            <h2
              ref={headingRef}
              className="opacity-0 font-serif font-normal text-stone-900 m-0"
              style={{
                fontSize: "clamp(2rem,4.2vw,3.2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              What we{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "#2a7a6a",
                }}
              >
                make.
              </em>
            </h2>
          </div>

          <Link
            ref={linkRef}
            to="/products"
            className="opacity-0 inline-flex items-center gap-2 font-sans text-md text-stone-700 no-underline border-b border-[rgba(180,170,155,0.5)] pb-px transition-all duration-200 hover:text-stone-900 hover:border-stone-900 self-start md:self-auto mb-1"
          >
            See all{" "}
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.2s",
              }}
            >
              →
            </span>
          </Link>
        </div>

        <div
          className="grid gap-4 md:gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          }}
        >
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
      className="relative rounded-[20px] overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: "4/3.2",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
        border: "1px solid rgba(255,255,255,0.7)",
        opacity: 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url(${service.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: service.color,
          opacity: 0.78,
          backdropFilter: "blur(1px)",
          zIndex: 1,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.35) 0%, transparent 60%)",
          zIndex: 2,
        }}
      />

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-end p-5 md:p-6"
        style={{ zIndex: 3 }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <h3
              className="font-serif text-stone-950 m-0 mb-2"
              style={{
                fontSize: "clamp(1.3rem,2.4vw,1.6rem)",
                lineHeight: 1.08,
                fontWeight: 2000,
                letterSpacing: "-0.02em",
              }}
            >
              {service.name}
            </h3>

            <p
              className="font-sans text-stone-800 m-0 leading-snug"
              style={{
                fontSize: "clamp(0.82rem,1.1vw,0.95rem)",
                fontWeight: 1000,
              }}
            >
              {service.desc}
            </p>
          </div>

          <Link
            ref={btnRef}
            to={service.path}
            className="inline-flex items-center gap-2 font-sans text-stone-900 no-underline self-start"
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: "99px",
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              opacity: 0,
              transform: "translateY(6px)",
              transition: "box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
            }}
          >
            Explore
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}