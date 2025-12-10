// src/components/Details/Media.jsx
import PropTypes from "prop-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const Media = ({ videos, backdrops, posters, openModal }) => {
  const plugin = useRef(
    Autoplay({
      delay: 4500,
      loop: true,
    })
  );

  return (
    <div className="mt-12">
      <h1 className="text-2xl text-white font-semibold mb-4">Media</h1>

      <div className="w-full lg:w-10/12 rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-md p-3 sm:p-4">
        <Tabs defaultValue="videos">
          <TabsList className="w-full bg-slate-800/90 text-white font-semibold rounded-xl mb-4">
            <TabsTrigger
              value="videos"
              className="flex-1 data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1/90 rounded-lg"
            >
              Videos {videos.length}
            </TabsTrigger>
            <TabsTrigger
              value="backdrops"
              className="flex-1 data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1/90 rounded-lg"
            >
              Backdrops {backdrops.length}
            </TabsTrigger>
            <TabsTrigger
              value="posters"
              className="flex-1 data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1/90 rounded-lg"
            >
              Posters {posters.length}
            </TabsTrigger>
          </TabsList>

          {/* Videos */}
          <TabsContent value="videos">
            {videos.length > 0 ? (
              <Carousel className="grid" plugins={[plugin.current]}>
                <CarouselContent>
                  {videos.map((video) => (
                    <CarouselItem
                      key={video.id}
                      className="basis-full md:basis-1/2 lg:basis-1/3 px-1"
                    >
                      <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-black/70 shadow-lg shadow-black/50">
                        <img
                          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                          alt={video.name}
                          className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                        <button
                          onClick={() => openModal(video.key)}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="w-14 h-14 rounded-full bg-primary-col1/90 hover:bg-primary-col1 grid place-items-center shadow-lg shadow-black/60 transition">
                            <svg
                              className="w-6 h-6 text-white"
                              viewBox="0 0 16 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 py-2">
                          <p className="text-xs text-white font-semibold line-clamp-2">
                            {video.name}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="h-40 flex items-center justify-center text-gray-300 text-sm">
                No videos available.
              </div>
            )}
          </TabsContent>

          {/* Backdrops */}
          <TabsContent value="backdrops">
            {backdrops.length > 0 ? (
              <Carousel className="grid" plugins={[plugin.current]}>
                <CarouselContent>
                  {backdrops.map((backdrop) => (
                    <CarouselItem
                      key={backdrop.file_path}
                      className="basis-full md:basis-1/2 px-1"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
                        alt={backdrop.file_path}
                        className="rounded-xl border border-slate-700/80 shadow-lg shadow-black/40"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="h-40 flex items-center justify-center text-gray-300 text-sm">
                No backdrops available.
              </div>
            )}
          </TabsContent>

          {/* Posters */}
          <TabsContent value="posters">
            {posters.length > 0 ? (
              <Carousel className="grid" plugins={[plugin.current]}>
                <CarouselContent>
                  {posters.map((poster) => (
                    <CarouselItem
                      key={poster.file_path}
                      className="basis-1/3 md:basis-1/5 px-1"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w342${poster.file_path}`}
                        alt={poster.file_path}
                        className="rounded-xl border border-slate-700/80 shadow-lg shadow-black/40"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="h-40 flex items-center justify-center text-gray-300 text-sm">
                No posters available.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

Media.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
  backdrops: PropTypes.arrayOf(PropTypes.object),
  posters: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func.isRequired,
};

export default Media;
