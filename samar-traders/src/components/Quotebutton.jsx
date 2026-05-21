// QuoteButton.jsx - drop-in replacement for any "Get a Quote" Link/button
// Usage: <QuoteButton mobile={bool} />

import { useQuoteModal } from "./QuoteModal";

export default function QuoteButton({ mobile, className = "", children }) {
  const { open } = useQuoteModal();

  return (
    <button
      type="button"
      onClick={open}
      className={[
        "inline-flex items-center gap-[5px] whitespace-nowrap rounded-full border-0",
        "bg-black text-white",
        "font-sans font-medium no-underline",
        "shadow-[0_4px_16px_rgba(160,120,64,0.28)]",
        "cursor-pointer transition-all duration-200",
        "hover:scale-[1.04] hover:shadow-[0_6px_22px_rgba(160,120,64,0.42)]",
        "active:scale-100",
        mobile ? "px-[18px] py-2.5 text-[0.8rem]" : "px-[26px] py-3 text-[0.875rem]",
        className,
      ].join(" ")}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>

      {children ?? "Get a Quote"}
    </button>
  );
}