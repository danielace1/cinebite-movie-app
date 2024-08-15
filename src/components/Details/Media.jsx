import PropTypes from "prop-types";
import { useRef } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Media = ({ videos, backdrops, posters, openModal }) => {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      loop: true,
      infinite: true,
    })
  );

  return (
    <div className="mt-8">
      <h1 className="text-2xl text-white font-semibold">Media</h1>

      <div className="mt-5 w-10/12">
        <Tabs defaultValue="videos" className="">
          <TabsList className="text-white font-semibold bg-slate-800 w-full justify-around">
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
            >
              Videos {videos.length}
            </TabsTrigger>
            <TabsTrigger
              value="backdrops"
              className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
            >
              Backdrops {backdrops.length}
            </TabsTrigger>
            <TabsTrigger
              value="posters"
              className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
            >
              Posters {posters.length}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="videos">
            {/* Videos */}
            {videos.length > 0 ? (
              <Carousel className="grid" plugins={[plugin.current]}>
                <CarouselContent>
                  {videos.map((video) => (
                    <CarouselItem key={video.id} className="basis-1/2 pl-0">
                      <div className="relative">
                        <img
                          src={`https://i.ytimg.com/vi/${video.key}/maxresdefault.jpg`}
                          className="w-full h-72 hover:cursor-pointer object-cover"
                          alt={video.name}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center hover:cursor-pointer"
                          onClick={() => openModal(video.key)}
                        >
                          <span className="w-16 h-16 bg-primary-col1 rounded-full grid place-items-center hover:bg-slate-800 transition">
                            <svg
                              className="w-6 h-6 text-white"
                              viewBox="0 0 16 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="text-white text-center h-72 flex items-center justify-center">
                No Videos Found
              </div>
            )}
          </TabsContent>

          <TabsContent value="backdrops">
            <Carousel className="grid" plugins={[plugin.current]}>
              <CarouselContent>
                {backdrops.map((backdrop, id) => (
                  <CarouselItem key={id} className="basis-1/2 pl-0">
                    <img
                      src={`https://media.themoviedb.org/t/p/w780${backdrop.file_path}`}
                      alt={backdrop.file_path}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsContent>

          <TabsContent value="posters">
            <Carousel className="grid" plugins={[plugin.current]}>
              <CarouselContent>
                {posters.map((poster, id) => (
                  <CarouselItem key={id} className="basis-1/5 pl-0">
                    <img
                      src={`https://media.themoviedb.org/t/p/w342${poster.file_path}`}
                      alt={poster.file_path}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

Media.propTypes = {
  backdrops: PropTypes.arrayOf(PropTypes.object),
  videos: PropTypes.arrayOf(PropTypes.object),
  posters: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
  currentVideoKey: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
};

export default Media;
