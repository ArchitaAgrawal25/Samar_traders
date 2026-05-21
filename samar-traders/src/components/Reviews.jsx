import { useMemo, useState } from "react";
import { Heart, Share2, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Ritika Sharma",
    rating: 5,
    text: "The aluminium windows look refined and the fitting team worked with real patience. They measured twice, explained everything, and left the space spotless.",
    place: "Gomti Nagar",
  },
  {
    name: "Aman Verma",
    rating: 5,
    text: "Our sliding door changed the whole feel of the living room. Smooth movement, clean finish, and exactly the quiet premium look we wanted.",
    place: "Indira Nagar",
  },
  {
    name: "Naina Kapoor",
    rating: 4,
    text: "Loved the detailing on the wooden door. The polish, hardware, and final alignment were handled beautifully.",
    place: "Vibhuti Khand",
  },
  {
    name: "Farhan Ali",
    rating: 5,
    text: "They suggested the right glass partition for our office and delivered before the promised date. Professional, warm, and dependable.",
    place: "Hazratganj",
  },
];

function Stars({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={index < rating ? "fill-[#c8a96e] text-[#c8a96e]" : "fill-stone-200 text-stone-200"}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(18 + index * 7);

  const handleLike = () => {
    setLiked((current) => !current);
    setLikes((current) => current + (liked ? -1 : 1));
  };

  const handleShare = async () => {
    const shareText = `${review.name} rated Samar Trading ${review.rating}/5: ${review.text}`;

    if (navigator.share) {
      await navigator.share({ title: "Samar Trading Review", text: shareText });
      return;
    }

    await navigator.clipboard?.writeText(shareText);
  };

  return (
    <article className="group relative min-h-[300px] overflow-hidden rounded-[26px] border border-white/70 bg-white/60 p-5 shadow-[0_18px_60px_rgba(28,25,23,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/75 hover:shadow-[0_24px_70px_rgba(28,25,23,0.13)] sm:p-6">
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#c8a96e]/20 blur-2xl transition duration-300 group-hover:scale-125" />
      <div className="absolute -bottom-14 left-8 h-28 w-28 rounded-full bg-[#9ecfbf]/20 blur-2xl" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-7">
        <div>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-stone-900 text-white shadow-[0_8px_22px_rgba(28,25,23,0.18)]">
                <span className="font-serif text-lg italic">{review.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="m-0 font-serif text-[1.05rem] font-semibold leading-tight text-stone-900">
                  {review.name}
                </h3>
                <p className="m-0 mt-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  {review.place}
                </p>
              </div>
            </div>

            <div className="rounded-full border border-[#c8b99a]/35 bg-[#faf6ec]/80 px-3 py-1.5">
              <Stars rating={review.rating} size={13} />
            </div>
          </div>

          <p className="m-0 font-serif text-[1.28rem] italic leading-[1.45] tracking-[-0.01em] text-stone-800">
            "{review.text}"
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-stone-200/70 pt-4">
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
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-3.5 py-2 font-sans text-[0.78rem] font-semibold text-white shadow-[0_8px_20px_rgba(28,25,23,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-stone-700"
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
  const overallRating = useMemo(() => {
    const total = REVIEWS.reduce((sum, review) => sum + review.rating, 0);
    return (total / REVIEWS.length).toFixed(1);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f5f3ee] px-5 py-16 md:px-8 md:py-24">
      <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-[#c8b99a]/25" />
      <div className="absolute left-1/2 top-24 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-[#9ecfbf]/25" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-10 grid items-end gap-8 md:mb-12 md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative rounded-[32px] border border-white/75 bg-[#2a7a6a] p-6 text-white shadow-[0_28px_80px_rgba(28,25,23,0.18)] sm:p-8">
            <div className="absolute right-6 top-6 rounded-full border border-white/10 px-3 py-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/55">
              Rated by clients
            </div>

            <p className="m-0 mb-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#c8a96e]">
              Overall Rating
            </p>

            <div className="flex items-end gap-3">
              <span className="font-serif text-[5.5rem] font-semibold leading-none tracking-[-0.06em]">
                {overallRating}
              </span>
              <span className="pb-3 font-sans text-lg font-semibold text-white/45">/ 5</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Stars rating={5} size={20} />
              <span className="font-sans text-sm text-white/55">{REVIEWS.length} featured reviews</span>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c8b99a]" />
              <span className="font-sans text-[0.65rem] fontWeight-500 font-bold uppercase tracking-[0.2em] text-[#9a9188]">
                Reviews & Ratings
              </span>
            </div>

            <h2 className="m-0 max-w-[720px] font-serif text-[clamp(2.1rem,5vw,4rem)] font-normal leading-[1.03] tracking-[-0.03em] text-stone-900">
              The quiet proof is in the{" "}
              <em className="bg-gradient-to-br from-[#2a7a6a] to-[#c8822a] bg-clip-text italic text-transparent">
                people.
              </em>
            </h2>

            <p className="mt-4 max-w-[560px] font-sans text-[0.95rem] leading-relaxed text-stone-500">
              Real notes from homes and workspaces where Samar Trading measured, crafted, and installed with care.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {REVIEWS.map((review, index) => (
            <ReviewCard key={review.name} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}