import {
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
  UserRound,
  FileText,
} from "lucide-react";

import { useQuoteModal } from "./QuoteModal";

const CONTACT = {
  owner: "Satendra Tiwari",
  phone: "+91 84291 53343",
  email: "contact@samartrading.in",
  location:
    "4/117, Fims College Rd, Vibhav Khand -4, Vibhav Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
  mapsQuery: "Samar Trading Gomti Nagar Lucknow",
};

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  CONTACT.mapsQuery
)}`;

const locationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.mapsQuery
)}`;

const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  CONTACT.mapsQuery
)}&output=embed`;

function ContactLine({ icon: Icon, label, value, href }) {
  const content = (
    <div className="group flex items-center gap-3 rounded-[18px] border border-[#e6d7c7] bg-white/90 p-3 shadow-[0_10px_28px_rgba(0,0,0,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white">
      
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#d6b58a] to-[#9d6f42] text-white shadow-[0_8px_18px_rgba(214,181,138,0.18)]">
        <Icon size={15} strokeWidth={2.2} />
      </span>

      <span className="min-w-0">
        <span className="block font-sans text-[0.54rem] font-bold uppercase tracking-[0.18em] text-[#8d7b6d]">
          {label}
        </span>

        <span className="mt-0.5 block break-words font-sans text-[0.92rem] font-semibold leading-tight text-[#241c16]">
          {value}
        </span>
      </span>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block no-underline">
      {content}
    </a>
  );
}

export default function FindUs() {
  const { open } = useQuoteModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#111111] via-[#1a1714] to-[#221c17] px-5 py-12 md:px-6 md:py-16">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,168,120,0.14),transparent_28%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_30%)]" />

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#c69d68]/10 blur-3xl" />

      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#8f6a47]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        
        {/* ───────── Heading ───────── */}
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#b89062]" />

              <span className="font-sans text-[0.8rem] font-extrabold uppercase tracking-[0.24em] text-[#c8b49d]">
                Visit & Contact
              </span>
            </div>

            <h2 className="m-0 max-w-[620px] font-serif text-[clamp(1.9rem,4.5vw,3.7rem)] font-normal leading-[0.98] tracking-[-0.04em] text-white">
              Find us, then{" "}
              <em className="italic text-[#d6b58a]">
                walk in.
              </em>
            </h2>
          </div>

          <p className="m-0 font-sans text-[0.82rem] leading-relaxed text-[#b8aea5]">
            Visit the showroom, compare finishes in person,
            and discuss your project directly with us.
          </p>
        </div>

        {/* ───────── Main Grid ───────── */}
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          
          {/* ───────── LEFT COLUMN ───────── */}
          <div className="grid gap-4">
            
            {/* MAP */}
            <div className="group relative min-h-[270px] overflow-hidden rounded-[26px] border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
              <iframe
                title="Samar Traders map"
                src={embedUrl}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.08]"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5 pointer-events-none" />

              {/* ── Two map action buttons ── */}
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 px-4">
                
                {/* View Location — pin only */}
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/90 px-4 py-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#4e392b] shadow-[0_8px_18px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white"
                >
                  <MapPin size={12} strokeWidth={2.3} />
                  View Location
                </a>

                {/* Open Directions */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#1c1917]/80 px-4 py-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#1c1917]"
                >
                  <Navigation size={12} strokeWidth={2.3} />
                  Open Directions
                </a>
              </div>
            </div>

            {/* SHOWROOM IMAGE */}
            <div className="group relative min-h-[250px] overflow-hidden rounded-[26px] border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
              
              <img
                src="/images/show.JPG"
                alt="Samar Traders showroom"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                style={{ objectPosition: "center " }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-white/5" />

              {/* SHOWROOM TAG */}
              <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-white px-3 py-1.5 font-sans text-[0.55rem] font-extrabold uppercase tracking-[0.18em] text-[#4e392b] shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
                Showroom
              </div>
            </div>
          </div>

          {/* ───────── RIGHT CONTACT CARD ───────── */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/40 bg-gradient-to-br from-[#f8f4ee] via-[#f2ebe2] to-[#ece2d6] p-2 shadow-[0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6">
            
            {/* Background Blurs */}
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#d6b58a]/30 blur-3xl" />

            <div className="absolute -bottom-16 left-0 h-52 w-52 rounded-full bg-[#b88b63]/20 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col">
              
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d8c5ae] bg-white px-3 py-1.5 font-sans text-[0.56rem] font-extrabold uppercase tracking-[0.18em] text-[#8c6844] shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                    Contact Us
                  </div>

                  <h3 className="m-0 max-w-[340px] font-serif text-[clamp(1.7rem,4vw,2.8rem)] leading-[1] tracking-[-0.03em] text-[#241c16]">
                    Speak directly with{" "}
                    <em className="italic text-[#9d6f42]">
                      the owner.
                    </em>
                  </h3>
                </div>
              </div>

              <div className="grid gap-3">


                <ContactLine
                  icon={Phone}
                  label="Phone"
                  value={CONTACT.phone}
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                />

                <ContactLine
                  icon={Mail}
                  label="Email"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                />

                <ContactLine
                  icon={MapPin}
                  label="Location"
                  value={CONTACT.location}
                  href={locationUrl}
                />
              </div>

              {/* BUTTONS */}
              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                
                {/* VIEW LOCATION */}
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8c5ae] bg-white px-5 py-3.5 font-sans text-[0.82rem] font-semibold text-[#241c16] shadow-[0_14px_34px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f8f1e8] sm:w-auto"
                >
                  <MapPin size={15} />
                  View Location
                </a>

                {/* OPEN DIRECTIONS */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#d6b58a] to-[#9d6f42] px-5 py-3.5 font-sans text-[0.82rem] font-semibold text-white shadow-[0_14px_34px_rgba(214,181,138,0.2)] transition duration-300 hover:-translate-y-0.5 hover:opacity-95 sm:w-auto"
                >
                  Open Directions
                  <Navigation size={15} />
                </a>

                {/* GET A QUOTE */}
                <button
                  onClick={open}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8c5ae] bg-white px-5 py-3.5 font-sans text-[0.82rem] font-semibold text-[#241c16] shadow-[0_14px_34px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f8f1e8] sm:w-auto"
                >
                  Get a Quote
                  <FileText size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}