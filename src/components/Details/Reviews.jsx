import PropTypes from "prop-types";
import { ScrollArea } from "@/components/ui/scroll-area";

const Reviews = ({ reviews, details }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-3">Reviews</h2>
        <p className="text-gray-300">
          We don&apos;t have any reviews for{" "}
          <span className="font-semibold text-white">
            {details?.title || details?.original_title || details?.name}
          </span>
          .
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 w-full">
      <h2 className="text-2xl font-bold text-white mb-5">Reviews</h2>

      <ScrollArea className="h-[420px] sm:h-[360px] w-full rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl px-2 sm:px-6 py-5">
        <div className="space-y-6">
          {reviews.map((review) => {
            const username =
              review.author || review.author_details?.username || "Unknown";

            const rating = review.author_details?.rating ?? null;
            const percent =
              rating !== null ? Math.round((rating / 10) * 100) : null;

            return (
              <article
                key={review.id}
                className="rounded-xl bg-slate-900/80 border border-white/10 p-3 sm:p-5 shadow-lg shadow-black/30"
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={
                      review.author_details?.avatar_path
                        ? `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                        : `https://ui-avatars.com/api/?background=0D1117&color=fff&name=${encodeURIComponent(
                            username
                          )}`
                    }
                    alt={username}
                    className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      A review by <span className="capitalize">{username}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </p>
                  </div>

                  {percent !== null && (
                    <div className="flex items-center gap-1 rounded-full bg-yellow-400/10 px-2.5 py-1 text-xs font-semibold text-yellow-300 border border-yellow-400/20">
                      ⭐ {percent}%
                    </div>
                  )}
                </div>

                {/* Content */}
                <p className="mt-4 text-sm leading-relaxed text-gray-200 line-clamp-6 sm:line-clamp-8">
                  {review.content}
                </p>
              </article>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
  details: PropTypes.object,
};

export default Reviews;
