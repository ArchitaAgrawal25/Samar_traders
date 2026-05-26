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
    category: "Maintenance",
    question: "What is the maintenance cost of uPVC windows and doors?",
    answer:
      "uPVC windows and doors generally have very low maintenance costs compared to traditional wooden systems. They do not require regular polishing, painting, or termite treatment, which helps homeowners save on long-term upkeep expenses. In most cases, simple cleaning and occasional servicing of hardware is enough to keep them functioning smoothly for years.",
    tag: "Low Upkeep",
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

const DESKTOP_DEFAULT = 3;
const MOBILE_DEFAULT = 2;

// ─── Individual FAQ accordion row ────────────────────────────
function FAQRow({ faq, isOpen, onToggle, rowRef, isLast }) {
  const answerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!answerRef.current || !contentRef.current) return;

    if (isOpen) {
      const height = contentRef.current.scrollHeight;
      gsap.fromTo(
        answerRef.current,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.42, ease: "power3.out" }
      );
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={rowRef}
      onClick={onToggle}
      className={[
        "group cursor-pointer opacity-0 transition-[background,border-radius,margin,box-shadow] duration-300 ease-out",
        isLast ? "border-b-0" : "border-b border-[rgba(150,138,120,0.3)]",
        isOpen
          ? "my-1 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(248,244,236,0.88)_45%,rgba(241,234,223,0.82)_100%)] shadow-[0_10px_35px_rgba(120,110,90,0.08),0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[10px]"
          : "my-0 rounded-none bg-[linear-gradient(135deg,rgba(255,240,245,0.22)_0%,rgba(238,244,255,0.16)_45%,rgba(235,255,245,0.12)_100%)]",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center gap-4 transition-[padding] duration-300 md:gap-8",
          isOpen ? "px-4 py-4" : "px-0 py-4",
        ].join(" ")}
      >
        <span
          className={[
            "hidden w-[100px] shrink-0 font-sans text-[0.6rem] uppercase tracking-[0.15em] transition-colors md:block",
            isOpen ? "text-stone-500" : "text-[#6b6560]",
          ].join(" ")}
        >
          {faq.category}
        </span>

        <p
          className={[
            "m-0 flex-1 font-serif text-[clamp(1rem,1.6vw,1.35rem)] font-normal leading-tight tracking-[-0.01em] transition-colors",
            isOpen ? "text-[#0f0d0b]" : "text-stone-900",
          ].join(" ")}
        >
          {faq.question}
        </p>

        <span
          className={[
            "hidden w-[130px] shrink-0 text-right font-sans text-[0.58rem] uppercase tracking-[0.12em] transition-colors lg:block",
            isOpen ? "text-[#6b6560]" : "text-stone-500",
          ].join(" ")}
        >
          {faq.tag}
        </span>

        <div
          className={[
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full backdrop-blur-lg transition-all duration-300",
            isOpen
              ? "border-0 bg-stone-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
              : "border border-[rgba(180,168,148,0.6)] bg-white/75 text-stone-700",
          ].join(" ")}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={["transition-transform duration-300", isOpen ? "rotate-45" : "rotate-0"].join(" ")}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>

      <div ref={answerRef} className="h-0 overflow-hidden opacity-0">
        <div ref={contentRef} className="pb-5">
          <div className="flex gap-4 md:gap-8">
            <span className="hidden w-[100px] shrink-0 md:block" />
            <div className="flex-1">
              <p className="pl-4 m-0 max-w-[580px] font-sans text-[clamp(0.82rem,1vw,0.92rem)] leading-relaxed text-stone-700">
                {faq.answer}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  to="/contact"
                  onClick={(e) => e.stopPropagation()}
                  className="pl-4 inline-flex items-center gap-1.5 font-sans text-[0.72rem] tracking-[0.04em] text-stone-700 no-underline transition-all duration-200 hover:text-stone-900"
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Ask us more →
                </Link>
              </div>
            </div>
            <span className="hidden w-[130px] shrink-0 lg:block" />
            <span className="w-8 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Animated expand / collapse container ────────────────────
// FIX: Removed onCollapseDone / scrollIntoView callback entirely.
// The isFirstRender guard ensures no animation or scroll side-effects
// fire on initial mount / page refresh.
function ExtraRowsContainer({ visible, children }) {
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on initial mount — prevents scroll behavior on refresh
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!containerRef.current) return;

    if (visible) {
      // ── EXPAND ──────────────────────────────────────────────
      gsap.set(containerRef.current, { height: 0, opacity: 0, overflow: "hidden" });

      const id = setTimeout(() => {
        if (!containerRef.current) return;
        const naturalHeight = containerRef.current.scrollHeight;
        gsap.to(containerRef.current, {
          height: naturalHeight,
          opacity: 1,
          duration: 0.55,
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
      // ── COLLAPSE ── (no scroll side-effect)
      const liveHeight = containerRef.current.scrollHeight;

      gsap.fromTo(
        containerRef.current,
        { height: liveHeight, opacity: 1, overflow: "hidden" },
        {
          height: 0,
          opacity: 0,
          duration: 0.52,
          ease: "power3.inOut",
          // No onComplete scroll callback — that was causing the refresh scroll bug
        }
      );
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      style={visible ? {} : { height: 0, overflow: "hidden", opacity: 0 }}
    >
      {children}
    </div>
  );
}

// ─── Main FAQ component ───────────────────────────────────────
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const footerRef = useRef(null);
  const rowRefs = useRef([]);
  const buttonRef = useRef(null);

  // ── Entrance animations ───────────────────────────────────
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
          duration: 0.1,
          ease: "power1.in",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Accordion toggle ─────────────────────────────────────
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  // ── Show All / Show Less toggle ──────────────────────────
  const handleToggleShowAll = () => {
    const isMobile = window.innerWidth < 768;
    const defaultCount = isMobile ? MOBILE_DEFAULT : DESKTOP_DEFAULT;

    // When collapsing, close any open accordion that would be hidden
    if (showAll && openIndex !== null && openIndex >= defaultCount) {
      setOpenIndex(null);
    }

    setShowAll((prev) => !prev);

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.96 },
        { scale: 1, duration: 0.35, ease: "back.out(1.7)" }
      );
    }
  };

  // ── Row visibility splits ────────────────────────────────
  const alwaysVisible      = FAQS.slice(0, MOBILE_DEFAULT);
  const mobileExtra        = FAQS.slice(MOBILE_DEFAULT, DESKTOP_DEFAULT);
  const remaining          = FAQS.slice(DESKTOP_DEFAULT);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(168,213,200,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(200,185,155,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(220,210,255,0.12),transparent_28%),linear-gradient(180deg,#f8f6f1_0%,#f5f1ea_45%,#f2ede5_100%)] py-16 md:py-24"
    >
      {/* Background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] -top-[8%] h-[38vw] w-[38vw] rounded-full bg-[radial-gradient(circle,rgba(200,185,155,0.28)_0%,rgba(200,185,155,0.08)_45%,transparent_72%)] blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[8%] h-[34vw] w-[34vw] rounded-full bg-[radial-gradient(circle,rgba(168,213,200,0.22)_0%,rgba(168,213,200,0.05)_45%,transparent_72%)] blur-3xl" />
        <div className="absolute left-1/2 top-[32%] h-[28vw] w-[28vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,210,255,0.12)_0%,transparent_72%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.7)_0.5px,transparent_0.5px)] bg-[length:6px_6px] opacity-[0.035]" />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-5 md:px-3 lg:px-2">

        {/* ── Section header ── */}
        <div className="mb-10 md:mb-14">
          <div ref={eyebrowRef} className="mb-4 flex items-center gap-3 opacity-0">
            <span className="font-sans text-[0.9rem] font-extrabold uppercase tracking-[0.18em] text-[#6b6560]">
              Frequently Asked Questions
            </span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              ref={headingRef}
              className="m-0 font-serif text-[clamp(2rem,4vw,2.8rem)] font-normal leading-[1.04] tracking-[-0.025em] text-stone-900 opacity-0"
            >
              Answered,{" "}
              <em className="bg-[linear-gradient(135deg,#2a7a6a_0%,#7a8f6a_45%,#b8956a_100%)] bg-clip-text italic text-transparent">
                honestly.
              </em>
            </h2>

            <p className="m-0 mb-1 self-start font-sans text-[0.92rem] tracking-[0.08em] text-[#6b6560] md:self-end">
              {FAQS.length} questions answered
            </p>
          </div>
        </div>

        {/* ── Column headers (desktop only) ── */}
        <div className="mb-0 hidden items-center gap-4 border-b border-[rgba(180,170,155,0.3)] pb-3 md:flex md:gap-8">
          <span className="w-[100px] shrink-0 font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-stone-500">
            Category
          </span>
          <span className="flex-1 font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-stone-500">
            Question
          </span>
          <span className="hidden w-[130px] shrink-0 text-right font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-stone-500 lg:block">
            Topic
          </span>
          <span className="w-8 shrink-0" />
        </div>

        {/* ── FAQ rows ── */}
        <div>
          {/* Always visible: first 2 (mobile & desktop) */}
          {alwaysVisible.map((faq, i) => (
            <FAQRow
              key={faq.question}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              rowRef={(el) => { rowRefs.current[i] = el; }}
              isLast={false}
            />
          ))}

          {/* Item index 2: hidden on mobile by default, always visible md+ */}
          {mobileExtra.map((faq, i) => {
            const globalIndex = MOBILE_DEFAULT + i;
            return (
              <div
                key={faq.question}
                className={!showAll ? "hidden md:block" : "block"}
              >
                <FAQRow
                  faq={faq}
                  isOpen={openIndex === globalIndex}
                  onToggle={() => toggle(globalIndex)}
                  rowRef={(el) => { rowRefs.current[globalIndex] = el; }}
                  isLast={false}
                />
              </div>
            );
          })}

          {/* Remaining items (3–7): hidden by default, shown when showAll */}
          <ExtraRowsContainer visible={showAll}>
            {remaining.map((faq, i) => {
              const globalIndex = DESKTOP_DEFAULT + i;
              return (
                <FAQRow
                  key={faq.question}
                  faq={faq}
                  isOpen={openIndex === globalIndex}
                  onToggle={() => toggle(globalIndex)}
                  rowRef={(el) => { rowRefs.current[globalIndex] = el; }}
                  isLast={globalIndex === FAQS.length - 1}
                />
              );
            })}
          </ExtraRowsContainer>
        </div>

        {/* ── View All / Show Less button ── */}
        <div className="mt-6 flex justify-center">
          <button
            ref={buttonRef}
            onClick={handleToggleShowAll}
            className="group inline-flex items-center gap-2.5 rounded-full border border-[rgba(180,168,148,0.55)] bg-white/70 px-6 py-3 font-sans text-[0.78rem] font-semibold text-stone-700 backdrop-blur-xl shadow-[0_4px_18px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:border-[rgba(180,168,148,0.8)] hover:text-stone-900 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)]"
          >
            <span>{showAll ? "Show Less" : "View All Questions"}</span>
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

        {/* ── Footer strip ── */}
        <div
          ref={footerRef}
          className="mt-6 flex flex-col gap-4 border-t border-[rgba(180,170,155,0.25)] pt-5 opacity-0 md:flex-row md:items-center md:justify-between"
        >
          <p className="m-0 font-sans text-[0.8rem] font-extrabold uppercase tracking-[0.06em] text-[#6b6560]">
            Still curious? We reply within 24 hours.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 self-start rounded-full border border-white/20 bg-gradient-to-br from-[#b8956a] to-[#8b6b45] px-6 py-3 text-base font-semibold tracking-wide text-white no-underline shadow-[0_10px_30px_rgba(139,107,69,0.35)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:from-[#c8a57a] hover:to-[#9b774d] hover:shadow-[0_16px_40px_rgba(139,107,69,0.5)] md:self-auto"
          >
            Ask Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.7">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}