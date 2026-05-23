import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

const QuoteModalContext = createContext(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used inside QuoteModalProvider");
  return ctx;
}

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const already = sessionStorage.getItem("samar_quote_shown");
    if (!already) {
      const t = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("samar_quote_shown", "1");
      }, 1400);

      return () => clearTimeout(t);
    }
  }, []);

  return (
    <QuoteModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <QuoteModal onClose={close} />}
    </QuoteModalContext.Provider>
  );
}

const inputClass =
  "w-full rounded-full border-[1.5px] border-transparent bg-[#faf6ec] px-4 py-[11px] font-sans text-[0.85rem] text-stone-900 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-stone-400 focus:border-[rgba(200,185,155,0.8)] focus:shadow-[0_0_0_3px_rgba(200,185,155,0.15)] disabled:cursor-not-allowed disabled:opacity-70";

const inputErrorClass =
  "border-amber-300 shadow-[0_0_0_3px_rgba(251,191,36,0.12)] focus:border-amber-300 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.12)]";

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#9a9188]">
        {label}
        {required && <span className="ml-0.5 text-[#c8822a]">*</span>}
      </label>

      {children}

      {error && <span className="font-sans text-[0.65rem] text-amber-600">{error}</span>}
    </div>
  );
}

function ThankYou({ onClose }) {
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      innerRef.current,
      { opacity: 0, y: 18, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "expo.out" }
    );
  }, []);

  return (
    <div
      ref={innerRef}
      className="flex min-h-[320px] flex-col items-center justify-center gap-[18px] px-5 py-10 text-center sm:min-h-[340px] sm:px-9 sm:pb-11 sm:pt-[52px]"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400/50 bg-emerald-200/45">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-5" />
        </svg>
      </div>

      <h2 className="m-0 font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-normal tracking-[-0.02em] text-stone-900">
        Thank you.
      </h2>

      <p className="m-0 max-w-[300px] font-sans text-[0.9rem] leading-relaxed text-stone-500">
        Your enquiry has reached us. We'll write back within a working day, often sooner.
      </p>

      <button
        onClick={onClose}
        className="mt-2.5 inline-flex items-center gap-2 rounded-full border-0 bg-stone-900 px-8 py-[13px] font-sans text-[0.875rem] font-medium text-white shadow-[0_4px_18px_rgba(28,25,23,0.22)] transition duration-200 hover:scale-[1.04] hover:shadow-[0_6px_24px_rgba(28,25,23,0.32)]"
      >
        Close
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

const INTERESTS = [
  "uPVC Windows & Doors",
  "Modular Kitchen",
  "Wardrobe",
  "Interior designs",
  "Other / Not sure",
];

const COUNTRY_CODES = [
  { code: "+91", label: "India" },
  { code: "+1", label: "US / Canada" },
  { code: "+44", label: "UK" },
  { code: "+971", label: "UAE" },
  { code: "+61", label: "Australia" },
];

export function QuoteModal({ onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const formRef = useRef(null);

  const [step, setStep] = useState("form");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useLayoutEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 36, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "expo.out" }
    );
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.22 });
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 24,
      scale: 0.97,
      duration: 0.22,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && step !== "sending") handleClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose, step]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

 const validate = () => {
    const e = {};

    // Name check
    if (!fields.name.trim()) {
      e.name = "Please enter your name";
    }

    // Email check — valid format if provided
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      e.email = "Please enter a valid email address";
    }

    // Country code check
    if (!fields.countryCode.trim()) {
      e.countryCode = "Please select a country code";
    }

    // Phone check — must be exactly 10 digits
    const phoneDigits = fields.phone.replace(/\D/g, "");
    if (!fields.phone.trim()) {
      e.phone = "Please enter a phone number";
    } else if (phoneDigits.length !== 10) {
      e.phone = "Phone number must be exactly 10 digits";
    }

    // Interest check
    if (!fields.interest.trim()) {
      e.interest = "Please choose what you are interested in";
    }

    // Message check
    if (!fields.message.trim()) {
      e.message = "Please tell us a bit more";
    }

    return e;
  };

 const handleSubmit = async () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      gsap.fromTo(formRef.current, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.4)" });
      return;
    }

    setStep("sending");

    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

    if (!sheetUrl) {
      console.error("Sheet URL not configured.");
      setStep("done");
      return;
    }

    try {
      await fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          countryCode: fields.countryCode,
          phone: fields.phone,
          interest: fields.interest,
          message: fields.message,
        }),
      });
      setStep("done");
    } catch (err) {
      console.error("Submission error:", err);
      setStep("done");
    }
  };

  const set = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const overlayClick = (e) => {
    if (e.target === overlayRef.current && step !== "sending") handleClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={overlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(20,18,14,0.45)] p-3 backdrop-blur-[10px] sm:p-4"
    >
      <div
        ref={panelRef}
        className="relative max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-[22px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.22),0_2px_0_rgba(255,255,255,0.8)_inset] sm:rounded-[28px]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 10%, rgba(252,195,148,0.25) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(167,243,208,0.2) 0%, transparent 55%)",
        }}
      >
        {step !== "sending" && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[rgba(200,190,170,0.5)] bg-[#f5f3ee]/90 transition duration-200 hover:scale-110 hover:bg-[#e7e3dc] sm:right-4 sm:top-4"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#44403c" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        {step === "done" ? (
          <ThankYou onClose={handleClose} />
        ) : (
          <div ref={formRef} className="px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-9">
            <div className="mb-6 sm:mb-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="inline-block h-px w-7 shrink-0 bg-[#c8b99a]" />
                <span className="font-sans text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-stone-700">
                  Get a Quote
                </span>
              </div>

              <h2 className="m-0 mb-1.5 pr-8 font-serif text-[clamp(1.45rem,7vw,2.2rem)] font-normal leading-[1.12] tracking-[-0.02em] text-stone-900 sm:pr-0">
                Tell us your doubts.
              </h2>

              <p className="m-0 font-sans text-[0.82rem] leading-[1.55] text-stone-500">
                We'll come back with a rough estimate and a calm plan.
              </p>
            </div>

            <div className="mb-3.5 grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
              <Field label="Your Name" required error={errors.name}>
                <input
                  type="text"
                  value={fields.name}
                  onChange={set("name")}
                  placeholder="John Doe"
                  disabled={step === "sending"}
                  className={`${inputClass} ${errors.name ? inputErrorClass : ""}`}
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={fields.email}
                  onChange={set("email")}
                  placeholder="you@home.com"
                  disabled={step === "sending"}
                  className={inputClass}
                />
              </Field>

              <Field label="Phone" required error={errors.phone || errors.countryCode}>
                <div className="grid grid-cols-[72px_1fr] gap-2">
                  <select
                    value={fields.countryCode}
                    onChange={set("countryCode")}
                    disabled={step === "sending"}
                    className={`${inputClass} appearance-none px-1 text-center ${
                      errors.countryCode ? inputErrorClass : ""
                    }`}
                    aria-label="Country code"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    value={fields.phone}
                    onChange={set("phone")}
                    placeholder="98765 43210"
                    disabled={step === "sending"}
                    className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`}
                  />
                </div>
              </Field>

              <Field label="Interested In" required error={errors.interest}>
                <div className="relative">
                  <select
                    value={fields.interest}
                    onChange={set("interest")}
                    disabled={step === "sending"}
                    className={`${inputClass} appearance-none pr-9 ${
                      fields.interest ? "text-stone-900" : "text-stone-400"
                    } ${errors.interest ? inputErrorClass : ""}`}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {INTERESTS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9a9188"
                    strokeWidth="2.2"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </Field>
            </div>

            <div className="mb-[22px]">
              <Field label="Tell Us More" required error={errors.message}>
                <textarea
                  value={fields.message}
                  onChange={set("message")}
                  placeholder="The room, the vibe, the deadline - whatever helps."
                  rows={4}
                  disabled={step === "sending"}
                  className={`${inputClass} min-h-[108px] resize-y rounded-xl leading-relaxed ${
                    errors.message ? inputErrorClass : ""
                  }`}
                />
              </Field>
            </div>

            <button
              onClick={handleSubmit}
              disabled={step === "sending"}
              className="flex w-full items-center justify-center gap-2.5 rounded-full border-0 bg-gradient-to-br from-stone-900 to-[#3a3632] p-[15px] font-sans text-[0.9rem] font-medium tracking-[0.01em] text-white shadow-[0_4px_20px_rgba(28,25,23,0.2)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(28,25,23,0.3)] disabled:cursor-not-allowed disabled:bg-none disabled:bg-stone-700 disabled:hover:scale-100"
            >
              {step === "sending" ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="animate-spin">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send enquiry"
              )}
            </button>

            <p className="m-0 mt-3 text-center font-sans text-[0.68rem] leading-normal text-stone-400">
              Your details stay private. We only use them to reply to your enquiry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}