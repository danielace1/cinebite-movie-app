import PropTypes from "prop-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const CastandStatus = ({ details, credits }) => {
  const fallbackProfile = "/no-profile.png";

  const isTV = details?.first_air_date !== undefined;
  const hasCast = Array.isArray(credits) && credits.length > 0;
  const hasDetails = !!details;

  return (
    <div className="mt-12 md:mt-14 w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="min-w-0">
        <div className="rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl p-3 w-full">
          <h2 className="text-white text-2xl font-bold mb-4">Top Cast</h2>

          {/* Actor Cards */}
          {!hasCast ? (
            <div className="flex items-center justify-center h-[220px] text-gray-400 font-semibold">
              No cast information available.
            </div>
          ) : (
            <Carousel
              className="relative w-full overflow-hidden"
              style={{ touchAction: "pan-y" }}
              opts={{
                align: "start",
                dragFree: true,
                containScroll: "trimSnaps",
              }}
            >
              <CarouselContent className="px-2 md:px-4">
                {credits.map((cast) => (
                  <CarouselItem
                    key={cast.cast_id || cast.id}
                    className="basis-[120px] md:basis-[135px] xl:basis-[150px]"
                  >
                    <div className="rounded-xl overflow-hidden bg-slate-900/50 border border-white/10 shadow-lg hover:scale-105 transition-transform">
                      <div className="h-[160px] md:h-[190px] bg-slate-800/60">
                        <img
                          src={
                            cast.profile_path
                              ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                              : fallbackProfile
                          }
                          onError={(e) => (e.target.src = fallbackProfile)}
                          alt={cast.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="px-3 py-2.5">
                        <p className="text-sm font-semibold text-white truncate">
                          {cast.name}
                        </p>
                        <p className="text-[11px] text-gray-300 line-clamp-2">
                          {cast.character || cast.known_for_department || "--"}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2 z-50 bg-primary-col1 text-white border-none shadow-lg" />
              <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2 z-50 bg-primary-col1 text-white border-none shadow-lg" />
            </Carousel>
          )}
        </div>
      </div>

      {/* Details Box*/}
      <aside className="w-full max-w-full lg:max-w-[320px] bg-slate-900/40 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl p-5 space-y-4 text-gray-100">
        <h2 className="text-xl font-bold text-white tracking-wide">Details</h2>

        {!hasDetails ? (
          <p className="text-gray-400 text-sm">
            No additional details available.
          </p>
        ) : (
          <div className="space-y-4">
            {/* Status */}
            <div>
              <p className="text-xs uppercase text-gray-400">Status</p>
              <p>{details?.status || "--"}</p>
            </div>

            {/* Movie */}
            {!isTV && details?.runtime && (
              <>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs uppercase text-gray-400">Budget</p>
                  <p>
                    {details.budget
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(details.budget)
                      : "--"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">Revenue</p>
                  <p>
                    {details.revenue
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(details.revenue)
                      : "--"}
                  </p>
                </div>
              </>
            )}

            {/* TV Show */}
            {isTV && (
              <>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs uppercase text-gray-400">
                    First Air Date
                  </p>
                  <p>
                    {details.first_air_date
                      ? new Date(details.first_air_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "--"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Last Air Date
                  </p>
                  <p>
                    {details.last_air_date
                      ? new Date(details.last_air_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "--"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">Seasons</p>
                  <p>{details.number_of_seasons ?? "--"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">Episodes</p>
                  <p>{details.number_of_episodes ?? "--"}</p>
                </div>
              </>
            )}

            <div className="border-t border-white/10 pt-3">
              <p className="text-xs uppercase text-gray-400">
                Original Language
              </p>
              <p>{details?.spoken_languages?.[0]?.english_name || "--"}</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

CastandStatus.propTypes = {
  details: PropTypes.object,
  credits: PropTypes.arrayOf(PropTypes.object),
};

export default CastandStatus;
