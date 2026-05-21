import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    category: "Windows",
    question: "What are the different types of uPVC windows?",
    answer:
      "You can get tilt and turn windows, fixed windows, casement windows, glass to glass and bay windows made from uPVC. Our team can also help you pick the best window type for your home based on your space and ventilation needs.",
    tag: "Tilt · Casement · Bay",
  },
  {
    category: "Pricing",
    question: "Is uPVC expensive?",
    answer:
      "uPVC is cheaper than wood. However, installation may cost a little more upfront, but it is easy to maintain and highly durable — making it a smart long-term investment.",
    tag: "Cost-effective",
  },
  {
    category: "Location",
    question: "Where can I get uPVC windows in Lucknow?",
    answer:
      "Samar Trading provides uPVC windows and doors in Gomti Nagar, Lucknow. We are located close to Mantri Awas and serve clients across the entire Lucknow region.",
    tag: "Gomti Nagar",
  },
  {
    category: "Custom",
    question: "Can I get a customised size for the window?",
    answer:
      "Absolutely. You can ask us to provide a customised size as per your window or door dimensions. We offer custom-designed solutions for all configurations — from standard apartments to bespoke villa projects.",
    tag: "Heritage · Bespoke",
  },
  {
    category: "Materials",
    question: "Can I use uPVC material for sliding windows?",
    answer:
      "Yes, uPVC material frames come in a range of options for both doors and windows, including sliding configurations. Reach out to us to confirm availability and see samples in person.",
    tag: "Sliding · Fixed",
  },
  {
    category: "Benefits",
    question: "What are the benefits of using uPVC windows?",
    answer:
      "uPVC is durable, cost-effective and easy to maintain. It does not absorb heat, which helps keep your room cooler — ideal for Lucknow's warm climate. It is also resistant to termites, rust and weathering.",
    tag: "Durable · Thermal",
  },
  {
    category: "Comparison",
    question: "Is uPVC better than wood?",
    answer:
      "uPVC is cheaper than wood and a strong alternative for most residential uses. It is available in various sizes and designs for apartments, flats, villas and more. Wood offers a warmer aesthetic, while uPVC gives you lower maintenance and better thermal performance.",
    tag: "uPVC vs Wood",
  },
];

function FAQRow({ faq, index, isOpen, onToggle, rowRef, isLast }) {
  const answerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!answerRef.current || !contentRef.current) return;

    if (isOpen) {
      const height = contentRef.current.scrollHeight;
      gsap.fromTo(
        answerRef.current,
        { height: 0, opacity: 0 },
        { height: height, opacity: 1, duration: 0.42, ease: "power3.out" }
      );
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={rowRef}
      className="group cursor-pointer"
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(150,138,120,0.3)",
        opacity: 0,
        borderRadius: isOpen ? "12px" : "0",
        margin: isOpen ? "4px 0" : "0",
        background: isOpen
          ? "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(245,238,224,0.6) 100%)"
          : "transparent",
        backdropFilter: isOpen ? "blur(10px)" : "none",
        boxShadow: isOpen ? "0 2px 18px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9) inset" : "none",
        transition: "background 0.3s ease, border-radius 0.3s ease, margin 0.3s ease, box-shadow 0.3s ease",
      }}
      onClick={onToggle}
    >
      <div
        className="flex items-center gap-4 md:gap-8"
        style={{
          padding: isOpen ? "18px 16px" : "18px 0",
          transition: "padding 0.3s ease",
        }}
      >
        {/* Category tag */}
        <span
          className="font-sans uppercase tracking-[0.14em] shrink-0 hidden md:block"
          style={{
            fontSize: "0.6rem",
            color: isOpen ? "#78716c" : "#6b6560",
            width: "100px",
            letterSpacing: "0.15em",
            transition: "color 0.2s",
          }}
        >
          {faq.category}
        </span>

        {/* Question */}
        <p
          className="font-serif flex-1 m-0"
          style={{
            fontSize: "clamp(1rem,1.6vw,1.35rem)",
            fontWeight: 400,
            color: isOpen ? "#0f0d0b" : "#1c1917",
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            transition: "color 0.2s",
          }}
        >
          {faq.question}
        </p>

        {/* Tag — desktop */}
        <span
          className="font-sans shrink-0 hidden lg:block"
          style={{
            fontSize: "0.58rem",
            color: isOpen ? "#6b6560" : "#78716c",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            width: "130px",
            textAlign: "right",
            transition: "color 0.2s",
          }}
        >
          {faq.tag}
        </span>

        {/* Toggle button */}
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? "#1c1917" : "rgba(255,255,255,0.75)",
            border: isOpen ? "none" : "1px solid rgba(180,168,148,0.6)",
            backdropFilter: "blur(8px)",
            boxShadow: isOpen ? "0 4px 14px rgba(0,0,0,0.18)" : "none",
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "#fff" : "#44403c"}
            strokeWidth="2.5"
            style={{
              transition: "transform 0.3s ease",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>

      {/* Expandable answer */}
      <div
        ref={answerRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <div ref={contentRef} style={{ paddingBottom: "20px" }}>
          <div className="flex gap-4 md:gap-8" style={{ paddingLeft: 0 }}>
            {/* Spacer to align with question on desktop */}
            <span className="hidden md:block shrink-0" style={{ width: "100px" }} />
            <div className="flex-1" style={{ paddingLeft: isOpen ? "0" : "0" }}>
              <p
                className="font-sans m-0 leading-relaxed"
                style={{
                  fontSize: "clamp(0.82rem,1vw,0.92rem)",
                  maxWidth: "580px",
                  color: "#44403c",
                }}
              >
                {faq.answer}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Link
                  to="/contact"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-sans no-underline transition-all duration-200 hover:text-stone-900"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.04em", color: "#44403c" }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Ask us more →
                </Link>
              </div>
            </div>
            {/* Right spacer */}
            <span className="hidden lg:block shrink-0" style={{ width: "130px" }} />
            <span className="shrink-0" style={{ width: "32px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(3); // warranty open by default like reference
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const footerRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current].filter(Boolean),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 92%" },
            delay: i * 0.04,
          }
        );
      });

      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ background: "#f5f3ee" }}
    >
      {/* Subtle blobs */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          right: "-6%",
          width: "36vw",
          height: "36vw",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(200,185,155,0.13) 0%,transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: "5%",
          left: "-5%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(168,213,200,0.1) 0%,transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8">

        {/* ── Header ── */}
        <div className="mb-10 md:mb-14">
          <div ref={eyebrowRef} className="opacity-0 flex items-center gap-3 mb-4">
            <span
              className="font-sans tracking-[0.18em] uppercase"
              style={{ fontSize: "0.7rem", fontWeight: 500, color: "#6b6560" }}
            >
              Frequently Asked Questions
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              ref={headingRef}
              className="opacity-0 font-serif font-normal text-stone-900 m-0"
              style={{
                fontSize: "clamp(2rem,4.5vw,3.8rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
              }}
            >
              Answered,{" "}
              <em style={{ fontStyle: "italic", color: "#2a7a6a" }}>honestly.</em>
            </h2>

            <p
              className="font-sans m-0 self-start md:self-end mb-1"
              style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: "#6b6560" }}
            >
              {FAQS.length} questions answered
            </p>
          </div>
        </div>

        {/* Column headers — desktop */}
        <div
          className="hidden md:flex items-center gap-4 md:gap-8 border-b pb-3 mb-0"
          style={{ borderColor: "rgba(180,170,155,0.3)" }}
        >
          <span
            className="font-sans uppercase tracking-[0.14em] shrink-0"
            style={{ fontSize: "0.55rem", width: "100px", color: "#78716c" }}
          >
            Category
          </span>
          <span
            className="font-sans uppercase tracking-[0.14em] flex-1"
            style={{ fontSize: "0.55rem", color: "#78716c" }}
          >
            Question
          </span>
          <span
            className="font-sans uppercase tracking-[0.14em] shrink-0 hidden lg:block"
            style={{ fontSize: "0.55rem", width: "130px", textAlign: "right", color: "#78716c" }}
          >
            Topic
          </span>
          <span className="shrink-0" style={{ width: "32px" }} />
        </div>

        {/* ── FAQ rows ── */}
        <div>
          {FAQS.map((faq, i) => (
            <FAQRow
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              rowRef={(el) => (rowRefs.current[i] = el)}
              isLast={i === FAQS.length - 1}
            />
          ))}
        </div>

        {/* ── Footer bar ── */}
        <div
          ref={footerRef}
          className="opacity-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 pt-6"
          style={{ borderTop: "1px solid rgba(180,170,155,0.25)" }}
        >
          <p
            className="font-sans m-0"
            style={{ fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#6b6560" }}
          >
            Still curious? We reply within 24 hours.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-sans font-medium no-underline transition-all duration-200 self-start md:self-auto"
            style={{
              fontSize: "0.8rem",
              padding: "10px 22px",
              borderRadius: "99px",
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(180,168,148,0.6)",
              letterSpacing: "0.03em",
              color: "#1c1917",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.92)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.7)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Write to us
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}