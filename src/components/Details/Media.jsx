import PropTypes from "prop-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Play } from "lucide-react";

const Media = ({ videos = [], backdrops = [], posters = [], openModal }) => {
  const plugin = useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: true,
    })
  );

  return (
    <section className="mt-10 md:mt-14 w-full min-w-0">
      <h2 className="text-2xl font-bold text-white mb-4">Media</h2>

      <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 overflow-hidden">
        <Tabs defaultValue="videos">
          {/* Tabs */}
          <TabsList className="w-full bg-slate-800/90 rounded-xl mb-5 p-1 text-gray-400">
            {[
              { key: "videos", label: "Videos", count: videos.length },
              { key: "backdrops", label: "Backdrops", count: backdrops.length },
              { key: "posters", label: "Posters", count: posters.length },
            ].map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="flex-1 rounded-lg font-semibold
                  data-[state=active]:bg-primary-col1
                  data-[state=active]:text-white"
              >
                {tab.label} ({tab.count})
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Videos */}
          <TabsContent value="videos">
            {videos.length === 0 ? (
              <EmptyState text="No videos available." />
            ) : (
              <Carousel
                className="relative w-full min-w-0 overflow-hidden"
                plugins={[plugin.current]}
              >
                <CarouselContent className="w-96 md:w-full">
                  {videos.map((video) => (
                    <CarouselItem
                      key={video.id}
                      className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
                    >
                      <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-black/70 shadow-lg">
                        <img
                          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                          alt={video.name}
                          className="w-full h-56 object-cover transition-transform group-hover:scale-105"
                        />

                        <button
                          onClick={() => openModal(video.key)}
                          className="absolute inset-0 grid place-items-center"
                        >
                          <span className="w-14 h-14 rounded-full bg-primary-col1 grid place-items-center shadow-xl">
                            <Play className="w-6 h-6 text-white ml-0.5" />
                          </span>
                        </button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-1 bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-1 bg-primary-col1 border-none text-white" />
              </Carousel>
            )}
          </TabsContent>

          {/* Backdrops */}
          <TabsContent value="backdrops">
            {backdrops.length === 0 ? (
              <EmptyState text="No backdrops available." />
            ) : (
              <Carousel
                className="relative w-full min-w-0"
                plugins={[plugin.current]}
              >
                <CarouselContent className="px-1">
                  {backdrops.map((b) => (
                    <CarouselItem
                      key={b.file_path}
                      className="basis-full md:basis-1/2 px-2"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w780${b.file_path}`}
                        className="rounded-xl border border-slate-700"
                        alt="Backdrop"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-1 bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-1 bg-primary-col1 border-none text-white" />
              </Carousel>
            )}
          </TabsContent>

          {/* Posters */}
          <TabsContent value="posters">
            {posters.length === 0 ? (
              <EmptyState text="No posters available." />
            ) : (
              <Carousel
                className="relative w-full min-w-0"
                plugins={[plugin.current]}
              >
                <CarouselContent className="px-1">
                  {posters.map((p) => (
                    <CarouselItem
                      key={p.file_path}
                      className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 px-2"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w342${p.file_path}`}
                        className="rounded-xl border border-slate-700"
                        alt="Poster"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-1 bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-1 bg-primary-col1 border-none text-white" />
              </Carousel>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

Media.propTypes = {
  videos: PropTypes.array,
  backdrops: PropTypes.array,
  posters: PropTypes.array,
  openModal: PropTypes.func.isRequired,
};

export default Media;

const EmptyState = ({ text }) => (
  <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
    {text}
  </div>
);

EmptyState.propTypes = {
  text: PropTypes.string,
};
