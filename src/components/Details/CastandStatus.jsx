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

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-start gap-6">
      {/* LEFT — CAST */}
      <div
        className="
      w-full
      md:basis-[60%]
      lg:basis-[65%]
      xl:basis-[70%]
      min-w-0
      xl:max-w-[1000px]   /* Limit only on XL screens */
    "
      >
        <div className="rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl p-4 md:p-3 w-full">
          <h2 className="text-white text-xl font-bold mb-4">Top Cast</h2>

          <Carousel
            className="w-full overflow-hidden"
            style={{ touchAction: "pan-y" }}
            opts={{
              align: "start",
              dragFree: true,
              containScroll: "trimSnaps",
            }}
          >
            <CarouselContent className="pl-4 pr-4">
              {credits.map((cast) => (
                <CarouselItem
                  key={cast.cast_id || `${cast.id}-${cast.credit_id}`}
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
                        {cast.character || cast.known_for_department}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="bg-white/15 hover:bg-white/25 text-white border-none -left-2 backdrop-blur-md" />
            <CarouselNext className="bg-white/15 hover:bg-white/25 text-white border-none -right-2 backdrop-blur-md" />
          </Carousel>
        </div>
      </div>

      {/* RIGHT — DETAILS */}
      <aside
        className="
      w-full
      md:basis-[40%]
      lg:basis-[35%]
      xl:basis-[30%]
      max-w-full
      lg:max-w-[320px]
      min-w-[260px]
      shrink-0
      bg-slate-900/40 border border-white/10 rounded-2xl 
      backdrop-blur-xl shadow-xl p-5 space-y-4 text-gray-100
    "
      >
        <h2 className="text-lg font-bold text-white tracking-wide">Details</h2>

        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase text-gray-400 tracking-wider">
              Status
            </p>
            <p className="font-medium">{details?.status || "--"}</p>
          </div>

          {details?.runtime ? (
            <>
              <div className="border-t border-white/10 pt-3">
                <p className="text-xs uppercase text-gray-400 tracking-wider">
                  Budget
                </p>
                <p className="font-medium">
                  {details.budget
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(details.budget)
                    : "--"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400 tracking-wider">
                  Revenue
                </p>
                <p className="font-medium">
                  {details.revenue
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(details.revenue)
                    : "--"}
                </p>
              </div>
            </>
          ) : (
            <>
              {details?.networks?.[0] && (
                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs uppercase text-gray-400 tracking-wider">
                    Network
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={
                        details.networks[0].logo_path
                          ? `https://image.tmdb.org/t/p/w92${details.networks[0].logo_path}`
                          : "/no-img.png"
                      }
                      alt={details.networks[0].name}
                      className="bg-white rounded-md p-1 h-7"
                    />
                    <span className="font-medium">
                      {details.networks[0].name}
                    </span>
                  </div>
                </div>
              )}

              {details?.type && (
                <div>
                  <p className="text-xs uppercase text-gray-400 tracking-wider">
                    Type
                  </p>
                  <p className="font-medium">{details.type}</p>
                </div>
              )}
            </>
          )}

          <div className="border-t border-white/10 pt-3">
            <p className="text-xs uppercase text-gray-400 tracking-wider">
              Original Language
            </p>
            <p className="font-medium">
              {details?.spoken_languages?.[0]?.english_name || "--"}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

CastandStatus.propTypes = {
  details: PropTypes.object,
  credits: PropTypes.arrayOf(PropTypes.object),
};

export default CastandStatus;
