// src/components/Details/Reviews.jsx
import PropTypes from "prop-types";
import { ScrollArea } from "@/components/ui/scroll-area";

const Reviews = ({ reviews, details }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-12">
        <h1 className="text-2xl text-white font-semibold mb-3">Reviews</h1>
        <p className="text-gray-300">
          We currently don&apos;t have any reviews for{" "}
          <span className="font-semibold">
            {details?.title || details?.original_title}
          </span>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h1 className="text-2xl text-white font-semibold mb-4">Reviews</h1>

      <ScrollArea className="h-72 w-full lg:w-10/12 rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 backdrop-blur-md">
        <div className="space-y-5">
          {reviews.map((review) => {
            const username =
              review.author || review.author_details.username || "Unknown";
            const rating = review.author_details?.rating ?? null;
            const percent = rating ? Math.round((rating / 10) * 100) : null;

            return (
              <div
                key={review.id}
                className="rounded-xl bg-slate-900/80 border border-slate-700/70 p-4 shadow-md shadow-black/40"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review.author_details?.avatar_path
                        ? `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                        : `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
                            username
                          )}`
                    }
                    alt={username}
                    className="w-10 h-10 rounded-full object-cover border border-slate-600"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-white font-semibold">
                      A review by <span className="capitalize">{username}</span>
                    </p>
                    <p className="text-xs text-gray-300">
                      Written on{" "}
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </p>
                  </div>

                  {percent !== null && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-700 px-2 py-0.5 text-xs font-semibold text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        className="fill-current text-yellow-300"
                      >
                        <path d="m12 16.3-3.7 2.825q-.275.225-.6.213t-.575-.188-.387-.475-.013-.65L8.15 13.4 4.525 10.825q-.3-.2-.375-.525t.025-.6.35-.488.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188.387.537L14.4 9h4.475q.35 0 .6.213t.35.487.025.6-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475-.575.188-.6-.213z" />
                      </svg>
                      {percent}
                      <span className="text-[10px] ml-0.5">%</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <p className="mt-3 text-sm text-gray-200 leading-relaxed line-clamp-[10]">
                  {review.content}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
  details: PropTypes.object,
};

export default Reviews;
