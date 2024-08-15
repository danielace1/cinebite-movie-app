import PropTypes from "prop-types";
import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ScrollArea } from "@/components/ui/scroll-area";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const Reviews = ({ reviews, details }) => {
  const plugin = useRef(
    Autoplay({
      delay: 6000,
      loop: true,
      infinite: true,
    })
  );

  return (
    <div className="mt-10">
      <h1 className="text-2xl text-white font-semibold">Reviews</h1>

      <div className="mt-5 w-10/12">
        {reviews.length > 0 ? (
          <ScrollArea className="h-64 border rounded-xl border-slate-700 bg-primary-col1 px-5 py-3">
            <Carousel className="grid grid-cols-1" plugins={[plugin.current]}>
              <CarouselContent>
                {reviews.map((review) => (
                  <CarouselItem key={review.id} className="">
                    <div className="flex items-center space-x-4">
                      <div>
                        <img
                          src={
                            review.author_details.avatar_path
                              ? `https://media.themoviedb.org/t/p/w45${review.author_details.avatar_path}`
                              : `https://ui-avatars.com/api/?background=random&name=${review.author_details.username}`
                          }
                          alt={review.author_details.username}
                          className="rounded-full w-12 h-12 object-cover"
                        />
                      </div>
                      <div className="text-white">
                        <h1 className="font-semibold text-lg">
                          A review by{" "}
                          <span className="capitalize">
                            {review.author || review.author_details.username}
                          </span>
                        </h1>
                        <div className="mt-1.5 flex items-center space-x-2">
                          <div className="flex items-center bg-slate-500 rounded-md px-1 py-0.5 text-sm font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              className="text-white fill-current"
                            >
                              <path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"></path>
                            </svg>
                            {review.author_details.rating !== undefined
                              ? Math.floor(
                                  (review.author_details.rating / 10) * 100
                                )
                              : "0"}
                            <span className="text-xs">%</span>
                          </div>
                          <div className="font-extralight">
                            Written by{" "}
                            <span>{review.author_details.username}</span> on{" "}
                            {new Date(review.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                timeZone: "UTC",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        className="text-gray-200"
                      >
                        {review.content}
                      </ReactMarkdown>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </ScrollArea>
        ) : (
          <div className="text-white font-semibold">
            We currently don&apos;t have any reviews for {details?.title}
          </div>
        )}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
  details: PropTypes.object,
};

export default Reviews;
