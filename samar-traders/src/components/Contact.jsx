import { useEffect, useState, useRef } from "react";
import { Mail, MapPin, Phone, Clock, ExternalLink, UserRound, FileText } from "lucide-react";
import { gsap } from "gsap";

const CONTACT = {
  owner: "Satendra Tiwari",
  phone: "+91 84291 53343",
  email: "contact@samartrading.in",
  location:
    "4/117, Fims College Rd, Vibhav Khand -4, Vibhav Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
  hours: "Mon – Sun · 11:00 AM to 8:00 PM",
  mapsQuery: "Samar Trading Gomti Nagar Lucknow",
};

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  CONTACT.mapsQuery
)}`;

const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  CONTACT.mapsQuery
)}&output=embed`;

const DETAILS = [
  { icon: UserRound, label: "Owner",   value: CONTACT.owner,    href: null },
  { icon: Phone,     label: "Phone",   value: CONTACT.phone,    href: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
  { icon: Mail,      label: "Email",   value: CONTACT.email,    href: `mailto:${CONTACT.email}` },
  { icon: Clock,     label: "Hours",   value: CONTACT.hours,    href: null },
  { icon: MapPin,    label: "Address", value: CONTACT.location, href: directionsUrl },
];

/* ── Contact detail card ── */
function DetailCard({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="group flex flex-col gap-3 rounded-[22px] border border-[#e6d7c7] bg-white/90 p-5 shadow-[0_8px_28px_rgba(0,0,0,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] h-full">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#d6b58a] to-[#9d6f42] text-white shadow-[0_6px_16px_rgba(214,181,138,0.22)]">
        <Icon size={16} strokeWidth={2.2} />
      </span>
      <div>
        <p className="font-sans text-[0.52rem] font-bold uppercase tracking-[0.18em] text-[#9a9188] mb-1">{label}</p>
        <p className="font-sans text-[0.95rem] font-semibold leading-snug text-[#241c16] m-0 break-words">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a key={label} href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="block no-underline">
        {inner}
      </a>
    );
  }
  return <div key={label}>{inner}</div>;
}

/* ── Inline Quote Form ── */
const inputClass =
  "w-full rounded-full border-[1.5px] border-transparent bg-[#faf6ec] px-4 py-[11px] font-sans text-[0.85rem] text-stone-900 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-stone-400 focus:border-[rgba(200,185,155,0.8)] focus:shadow-[0_0_0_3px_rgba(200,185,155,0.15)] disabled:cursor-not-allowed disabled:opacity-70";

const inputErrorClass =
  "border-amber-300 shadow-[0_0_0_3px_rgba(251,191,36,0.12)] focus:border-amber-300";

const INTERESTS = [
  "uPVC Windows & Doors",
  "Modular Kitchen",
  "Wardrobe",
  "Interior designs",
  "Other / Not sure",
];

const COUNTRY_CODES = [
  { code: "+91", label: "India" },
  { code: "+1",  label: "US / Canada" },
  { code: "+44", label: "UK" },
  { code: "+971", label: "UAE" },
  { code: "+61", label: "Australia" },
];

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#9a9188]">
        {label}{required && <span className="ml-0.5 text-[#c8822a]">*</span>}
      </label>
      {children}
      {error && <span className="font-sans text-[0.65rem] text-amber-600">{error}</span>}
    </div>
  );
}

function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-400/50 bg-emerald-100">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" />
        </svg>
      </div>
      <h3 className="m-0 font-serif text-[1.6rem] font-normal tracking-[-0.02em] text-stone-900">Thank you.</h3>
      <p className="m-0 max-w-[260px] font-sans text-[0.85rem] leading-relaxed text-stone-500">
        Your enquiry has reached us. We'll write back within a working day, often sooner.
      </p>
    </div>
  );
}

function QuoteForm() {
  const [step, setStep] = useState("form");
  const [fields, setFields] = useState({
    name: "", email: "", countryCode: "+91", phone: "", interest: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Please enter your name";
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      e.email = "Please enter a valid email address";
    if (!fields.countryCode.trim()) e.countryCode = "Please select a country code";
    const digits = fields.phone.replace(/\D/g, "");
    if (!fields.phone.trim()) e.phone = "Please enter a phone number";
    else if (digits.length !== 10) e.phone = "Phone number must be exactly 10 digits";
    if (!fields.interest.trim()) e.interest = "Please choose what you are interested in";
    if (!fields.message.trim()) e.message = "Please tell us a bit more";
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
    if (!sheetUrl) { setStep("done"); return; }
    try {
      await fetch(sheetUrl, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setStep("done");
    } catch { setStep("done"); }
  };

  const set = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  if (step === "done") return <ThankYou />;

  return (
    <div ref={formRef}>
      {/* Header */}
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block h-px w-7 shrink-0 bg-[#c8b99a]" />
          <span className="font-sans text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-stone-700">Get a Quote</span>
        </div>
        <h3 className="m-0 mb-1 font-serif text-[clamp(1.3rem,2.5vw,1.9rem)] font-normal leading-[1.12] tracking-[-0.02em] text-stone-900">
          Tell us your doubts.
        </h3>
        <p className="m-0 font-sans text-[0.82rem] leading-[1.55] text-stone-500">
          We'll come back with a rough estimate and a calm plan.
        </p>
      </div>

      {/* Fields */}
      <div className="mb-3.5 grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
        <Field label="Your Name" required error={errors.name}>
          <input type="text" value={fields.name} onChange={set("name")} placeholder="John Doe"
            disabled={step === "sending"} className={`${inputClass} ${errors.name ? inputErrorClass : ""}`} />
        </Field>

        <Field label="Email" error={errors.email}>
          <input type="email" value={fields.email} onChange={set("email")} placeholder="you@home.com"
            disabled={step === "sending"} className={inputClass} />
        </Field>

        <Field label="Phone" required error={errors.phone || errors.countryCode}>
          <div className="grid grid-cols-[72px_1fr] gap-2">
            <select value={fields.countryCode} onChange={set("countryCode")} disabled={step === "sending"}
              aria-label="Country code"
              className={`${inputClass} appearance-none px-1 text-center ${errors.countryCode ? inputErrorClass : ""}`}>
              {COUNTRY_CODES.map((item) => (
                <option key={item.code} value={item.code}>{item.code}</option>
              ))}
            </select>
            <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="98765 43210"
              disabled={step === "sending"} className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`} />
          </div>
        </Field>

        <Field label="Interested In" required error={errors.interest}>
          <div className="relative">
            <select value={fields.interest} onChange={set("interest")} disabled={step === "sending"}
              className={`${inputClass} appearance-none pr-9 ${fields.interest ? "text-stone-900" : "text-stone-400"} ${errors.interest ? inputErrorClass : ""}`}>
              <option value="" disabled>Choose one</option>
              {INTERESTS.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9188" strokeWidth="2.2"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </Field>
      </div>

      <div className="mb-5">
        <Field label="Tell Us More" required error={errors.message}>
          <textarea value={fields.message} onChange={set("message")}
            placeholder="The room, the vibe, the deadline - whatever helps."
            rows={4} disabled={step === "sending"}
            className={`${inputClass} min-h-[108px] resize-y rounded-xl leading-relaxed ${errors.message ? inputErrorClass : ""}`} />
        </Field>
      </div>

      <button onClick={handleSubmit} disabled={step === "sending"}
        className="flex w-full items-center justify-center gap-2.5 rounded-full border-0 bg-gradient-to-br from-stone-900 to-[#3a3632] p-[15px] font-sans text-[0.9rem] font-medium text-white shadow-[0_4px_20px_rgba(28,25,23,0.2)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(28,25,23,0.3)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100">
        {step === "sending" ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="animate-spin">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Sending...
          </>
        ) : "Send enquiry"}
      </button>

      <p className="m-0 mt-3 text-center font-sans text-[0.68rem] leading-normal text-stone-400">
        Your details stay private. We only use them to reply to your enquiry.
      </p>
    </div>
  );
}

/* ── Main Page ── */
export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ee]">

      {/* ── Hero ── */}
      <div className="pt-28 pb-12 px-5 text-center">
        <p className="font-sans text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-[#9a9188] mb-3">
          Samar Trading · Gomti Nagar
        </p>
        <h1 className="font-serif font-normal text-stone-900 m-0"
          style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", lineHeight: 0.98, letterSpacing: "-0.04em" }}>
          Get in{" "}
          <em className="italic" style={{
            background: "linear-gradient(135deg, #a07840 0%, #c8a96e 45%, #2a7a6a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>touch.</em>
        </h1>
        <p className="mt-4 font-sans text-stone-500 leading-relaxed max-w-md mx-auto" style={{ fontSize: "0.9rem" }}>
          Visit our showroom, call us, or send an email — we reply within one working day.
        </p>
      </div>

      <div className="max-w-5xl text-stone-800 mx-auto px-5 pb-20 flex flex-col gap-6">

        {/* ── Contact detail cards ── */}
        {/* First row: Owner, Phone, Email (3 cols). Second row: Hours + Address centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {DETAILS.slice(0, 3).map((d) => <DetailCard key={d.label} {...d} />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-2/3 lg:mx-auto">
          {DETAILS.slice(3).map((d) => <DetailCard key={d.label} {...d} />)}
        </div>

        {/* ── Map + Quote form side by side ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Map */}
          <div className="relative overflow-hidden rounded-[26px] border border-stone-200 shadow-[0_18px_50px_rgba(0,0,0,0.08)]" style={{ minHeight: "480px" }}>
            <iframe title="Samar Traders map" src={embedUrl} loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <a href={directionsUrl} target="_blank" rel="noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.75rem] font-semibold text-[#241c16] shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] no-underline">
              Open Directions <ExternalLink size={13} />
            </a>
          </div>

          {/* Inline quote form */}
          <div className="relative overflow-hidden rounded-[26px] border border-[#e6d7c7] bg-white/90 px-6 py-7 shadow-[0_8px_28px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            style={{ backgroundImage: "radial-gradient(ellipse at 80% 10%, rgba(252,195,148,0.18) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(167,243,208,0.14) 0%, transparent 55%)" }}>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#d6b58a]/20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 left-0 h-32 w-32 rounded-full bg-[#b88b63]/10 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <QuoteForm />
            </div>
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[22px] bg-gradient-to-br from-[#1c1917] to-[#2f2820] px-6 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
          <div>
            <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#c8b99a] mb-1">
              Not sure what you need?
            </p>
            <p className="font-serif text-[1.2rem] text-white m-0 leading-tight">
              Tell us your space.{" "}
              <em className="italic text-[#d6b58a]">We'll handle the rest.</em>
            </p>
          </div>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[0.82rem] font-semibold text-white no-underline transition-all duration-200 hover:bg-white/10 whitespace-nowrap">
            <Phone size={13} />
            Call Now
          </a>
        </div>

      </div>
    </div>
  );
}