import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Share2, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: "ATUL",
    rating: 5,
    text: "I had an excellent experience with Samar Trading. The staff was professional and polite, the products were high quality, and delivery was timely with secure packaging.",
    place: "Gomti Nagar",
    date: "23 Dec 2025",
  },
  {
    name: "Aditya Misra",
    rating: 5,
    text: "I am very happy with the service provided. Very professional approach and professional efficiency of high class. Thanks for the excellent service!",
    place: "Lucknow",
    date: "25 May 2026",
  },
  {
    name: "Ruby",
    rating: 5,
    text: "Excellent customizable options with knowledgeable and experienced staff. The team made the shopping experience easy and enjoyable.",
    place: "Lucknow",
    date: "05 Jun 2024",
  },
  {
    name: "Gaurav Gurjar",
    rating: 5,
    text: "Very satisfied with the service and product quality. Delivery was reliable, the products felt durable, and the entire process was convenient.",
    place: "Lucknow",
    date: "05 Jun 2024",
  },
  {
    name: "Gayatri Tiwari",
    rating: 5,
    text: "Friendly staff and great quality windows. Really good value for money and overall experience.",
    place: "Lucknow",
    date: "21 Dec 2025",
  },
  {
    name: "Dhirendra Tiwari",
    rating: 5,
    text: "Very good services in all Products.Jamex wpc is good brand. Thankyou samar Trading",
    place: "Lucknow",
    date: "16 Jun 2024",
  },
  {
    name: "Satyam Tiwari",
    rating: 5,
    text: "The fitting and service experience were smooth and professionally managed. Really appreciated the support from the team.",
    place: "Lucknow",
    date: "16 Dec 2025",
  },
  {
    name: "Deepali T",
    rating: 4,
    text: "Good overall experience with supportive staff and quality work. Everything was handled professionally.",
    place: "Lucknow",
    date: "27 Jun 2025",
  },
];

function Stars({ rating, size = 16 }) {
  return (
    <div
      className="flex items-center gap-1 whitespace-nowrap"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={
            index < rating
              ? "fill-[#89a8b8] text-[#89a8b8]"
              : "fill-stone-200 text-stone-200"
          }
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(18 + index * 7);

  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
  cardRef.current,
  {
    opacity: 0,
    y: 24,
    scale: 0.985,
    filter: "blur(6px)",
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 0.65,
    ease: "expo.out",

    scrollTrigger: {
      trigger: cardRef.current,
      start: "top 92%",
      end: "bottom 15%",
      toggleActions: "play none none reset",
    },
  }
);
  }, [index]);

  const handleLike = () => {
    setLiked((current) => !current);
    setLikes((current) => current + (liked ? -1 : 1));
  };

  const handleShare = async () => {
    const shareText = `${review.name} rated Samar Trading ${review.rating}/5: ${review.text}`;

    if (navigator.share) {
      await navigator.share({
        title: "Samar Trading Review",
        text: shareText,
      });
      return;
    }

    await navigator.clipboard?.writeText(shareText);
  };

  return (
    <article
      ref={cardRef}
      className="group relative min-h-[320px] overflow-hidden rounded-[26px] border border-white/70 bg-white/60 p-5 opacity-0 shadow-[0_18px_60px_rgba(28,25,23,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/75 hover:shadow-[0_24px_70px_rgba(28,25,23,0.13)] sm:p-6"
    >
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#89a8b8]/20 blur-2xl transition duration-300 group-hover:scale-125" />

      <div className="absolute -bottom-14 left-8 h-28 w-28 rounded-full bg-[#9ecfbf]/20 blur-2xl" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-7">
        <div>
          {/* Top Section */}
          <div className="mb-6 flex items-start gap-4">
            {/* Letter Logo */}
            <div className="flex flex-col items-center">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#3f7c78] text-white shadow-[0_8px_22px_rgba(79,100,114,0.22)]">
                <span className="font-serif text-lg italic">
                  {review.name.charAt(0)}
                </span>
              </div>

              <p className="mt-2 text-center font-sans text-[0.6rem] font-medium tracking-[0.08em] text-stone-400">
                {review.date}
              </p>
            </div>

            {/* Name + Meta */}
            <div className="min-w-0 flex-1">
              <h3 className="m-0 font-serif text-[1.05rem] font-semibold leading-tight text-stone-900">
                {review.name}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="m-0 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  {review.place}
                </p>

                <span className="h-1 w-1 rounded-full bg-stone-300" />

                <div className="shrink-0 rounded-full border border-[#b8cad3]/35 bg-[#edf4f7]/80 px-2.5 py-1">
                  <Stars rating={review.rating} size={12} />
                </div>
              </div>
            </div>
          </div>

          {/* Review text */}
          <p className="m-0 font-sans text-[1.02rem] font-medium leading-[1.75] tracking-[0.01em] text-[#3f5552]">
            "{review.text}"
          </p>
        </div>

        {/* Bottom buttons */}
        <div className="flex items-center justify-between border-t border-stone-200/70 pt-1">
          <button
            type="button"
            onClick={handleLike}
            className={[
              "inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-sans text-[0.78rem] font-semibold transition duration-200",
              liked
                ? "bg-rose-100 text-rose-700"
                : "bg-stone-100/80 text-stone-600 hover:bg-rose-50 hover:text-rose-700",
            ].join(" ")}
          >
            <Heart size={15} className={liked ? "fill-current" : ""} />
            {likes}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full bg-[#3f7c78] px-3.5 py-2 font-sans text-[0.78rem] font-semibold text-white shadow-[0_8px_20px_rgba(79,100,114,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#56928d]"
          >
            <Share2 size={14} />
            Share
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Reviews() {
  const headingRef = useRef(null);
  const ratingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: 22,
filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
ease: "expo.out",
filter: "blur(0px)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );

    gsap.fromTo(
      ratingRef.current,
     {
  opacity: 0,
  y: 24,
  scale: 0.985,
  filter: "blur(6px)",
},
{
  opacity: 1,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
  duration: 0.7,
  ease: "expo.out",
        scrollTrigger: {
          trigger: ratingRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, []);

  const overallRating = useMemo(() => {
    const total = REVIEWS.reduce((sum, review) => sum + review.rating, 0);
    return (total / REVIEWS.length).toFixed(1);
  }, []);

  return (
    <section className="relative max-w-10xl mx-4 md:mx-28 overflow-hidden bg-[#f5f3ee] px-2 py-16 md:px-4 md:py-24">
      <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-[#c8b99a]/25" />

      <div className="absolute left-1/2 top-24 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-[#9ecfbf]/25" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-10 grid items-start gap-8 md:mb-12 md:grid-cols-[0.85fr_1.15fr]">
          
          {/* Heading Section */}
          <div
            ref={headingRef}
            className="order-1 opacity-0 md:order-2"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#8aa2b0]" />

              <span className="font-sans text-[0.75rem] font-extrabold uppercase tracking-[0.24em] text-[#6f7f8d]">
                Reviews & Ratings
              </span>
            </div>

            <h2 className="m-0 max-w-[720px] font-serif text-[clamp(1.8rem,4vw,2.5rem)] font-normal leading-[1.03] tracking-[-0.03em] text-stone-900">
              The quiet proof is in the{" "}
              <em className="bg-gradient-to-br from-[#3c7d76] to-[#79b3aa] bg-clip-text italic text-transparent">
                people.
              </em>
            </h2>

            <p className="mt-4 max-w-[560px] font-sans text-[0.95rem] leading-relaxed text-stone-500">
              Real notes from homes and workspaces where Samar Trading measured,
              crafted, and installed with care.
            </p>
          </div>

          {/* Rating Card */}
          <div
            ref={ratingRef}
            className="order-2 relative rounded-[32px] border border-white/70 bg-gradient-to-br from-[#2f6f6a] via-[#4f9088] to-[#7fb7ad] p-6 opacity-0 text-white shadow-[0_28px_80px_rgba(28,25,23,0.16)] sm:p-6 md:order-1"
          >
            <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/60 backdrop-blur-md">
              Rated by clients
            </div>

            <p className="m-0 mb-1 font-sans text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#d7e6ee]">
              Overall Rating
            </p>

            <div className="flex items-end gap-3">
              <span className="font-serif text-[5.5rem] font-semibold leading-none tracking-[-0.06em] text-white">
                {overallRating}
              </span>

              <span className="pb-3 font-sans text-lg font-semibold text-white/50">
                / 5
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Stars rating={5} size={20} />

              <span className="font-sans text-sm text-white/60">
                20+ reviews online.
              </span>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {REVIEWS.map((review, index) => (
            <ReviewCard
              key={review.name}
              review={review}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}