import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DetailsPage = () => {
  return (
    <div className="mt-10 mx-5 w-full">
      <div className="mx-20 flex space-x-12">
        {/* Movie Poster */}
        <div className="w-full">
          <div>
            <img
              src="https://m.media-amazon.com/images/M/MV5BNzRiMjg0MzUtNTQ1Mi00Y2Q5LWEwM2MtMzUwZDU5NmVjN2NkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
              alt=""
              className="w-96 rounded-t-lg"
            />
          </div>
          <div>
            <div className="p-3 flex justify-center items-center space-x-3 text-white bg-primary-col1 rounded-b-lg">
              <div>
                <img
                  src="https://media.themoviedb.org/t/p/original/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"
                  alt=""
                  className="w-10 h-10"
                />
              </div>
              <div>
                <span className="font-semibold text-primary-col3">
                  Now Streaming
                </span>{" "}
                <br /> <span className="block -mt-1 font-bold">Watch Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="mt-5 text-white">
          <div>
            <h1 className="font-bold text-3xl mb-1">
              Deadpool & Wolverine (2024)
            </h1>
            <div className="flex items-center text-gray-400 font-semibold">
              <span className="border px-1.5 py-0.5 border-gray-400">A</span>{" "}
              &nbsp;07/26/2024 (IN)&nbsp;
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              &nbsp;Action, Comedy, Science Fiction&nbsp;
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              &nbsp;2h 8m
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-5">
            <div>
              75% <span>User Score</span>
            </div>
            <div>emojis</div>
          </div>

          <div className="mt-8 flex items-center space-x-5">
            <div className="bg-primary-col3 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-white hover:cursor-pointer hover:text-primary-col1"
              >
                <path d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="hidden fill-current text-white hover:cursor-pointer hover:text-primary-col1"
              >
                <path d="m12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616v11.436q0 .864-.727 1.345q-.727.482-1.535.134z"></path>
              </svg>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-white mr-1"
              >
                <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"></path>
              </svg>
              Play Trailer
            </div>
          </div>

          <div className="mt-10">
            <p className="text-gray-400 font-semibold italic">
              Fear can hold you prisoner. Hope can set you free.
            </p>

            <h2 className="font-bold mt-2 text-lg">Overview</h2>
            <p className="text-gray-200">
              Imprisoned in the 1940s for the double murder of his wife and her
              lover, upstanding banker Andy Dufresne begins a new life at the
              Shawshank prison, where he puts his accounting skills to work for
              an amoral warden. During his long stretch in prison, Dufresne
              comes to be admired by the other inmates -- including an older
              prisoner named Red -- for his integrity and unquenchable sense of
              hope.
            </p>
          </div>

          <div className="mt-8 flex justify-between items-center space-x-20">
            <div className="space-y-4">
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
              <div>
                <h1>Shawn Levy</h1>
                <h2 className="text-sm">Director, Writer</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      <div className="mt-20">
        <h1 className="text-2xl text-white font-semibold">Top Billed Cast</h1>

        <div className="flex">
          <div className="w-10/12 mt-5 grid grid-cols-8 gap-x-5">
            {/* Cards */}
            <div className="">
              <div>
                <img
                  src="https://media.themoviedb.org/t/p/w138_and_h175_face/2Orm6l3z3zukF1q0AgIOUqvwLeB.jpg"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="p-3 bg-primary-col1 text-white">
                <h1 className="text-lg font-bold">Ryan Reynolds</h1>
                <h2 className="text-sm">Wade Wilson / Deadpool / Nicepool</h2>
              </div>
            </div>{" "}
            <div className="">
              <div>
                <img
                  src="https://media.themoviedb.org/t/p/w138_and_h175_face/2Orm6l3z3zukF1q0AgIOUqvwLeB.jpg"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="px-3 bg-primary-col1 text-white">
                <h1 className="text-lg font-bold">Ryan Reynolds</h1>
                <h2 className="text-sm">Wade Wilson / Deadpool / Nicepool</h2>
              </div>
            </div>
            <div className="">
              <div>
                <img
                  src="https://media.themoviedb.org/t/p/w138_and_h175_face/2Orm6l3z3zukF1q0AgIOUqvwLeB.jpg"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="px-3 bg-primary-col1 text-white">
                <h1 className="text-lg font-bold">Ryan Reynolds</h1>
                <h2 className="text-sm">Wade Wilson / Deadpool / Nicepool</h2>
              </div>
            </div>
          </div>

          <div className="w-2/12 space-y-5">
            <div className="text-white">
              <h1>Status</h1>
              <h2>Released</h2>
            </div>
            <div className="text-white">
              <h1>Status</h1>
              <h2>Released</h2>
            </div>
            <div className="text-white">
              <h1>Status</h1>
              <h2>Released</h2>
            </div>
            <div className="text-white">
              <h1>Status</h1>
              <h2>Released</h2>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h1 className="text-2xl text-white font-semibold">Reviews</h1>

          <div className="mt-5 w-10/12">
            <div className="h-52 border rounded-xl border-slate-700 bg-primary-col1 px-5 py-3 overflow-y-auto">
              <div className="flex items-center space-x-5">
                <div>
                  <img
                    src="https://media.themoviedb.org/t/p/w45_and_h45_face/1kks3YnVkpyQxzw36CObFPvhL5f.jpg"
                    alt=""
                    className="rounded-full"
                  />
                </div>
                <div className="text-white">
                  <h1 className="font-semibold text-lg">
                    A review by CinemaSerf
                  </h1>
                  <div className="mt-1.5 flex items-center  space-x-2">
                    <div className="flex items-center bg-slate-500 rounded-md px-1 py-0.5 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="text-white fill-current"
                      >
                        <path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"></path>
                      </svg>
                      70 %
                    </div>
                    <div>Written by aGoryLouie on August 9, 2024</div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-slate-200">
                  Its story may not be the strongest, but the comedy makes
                  'Deadpool & Wolverine' an excellent watch! There are some top
                  notch gags in there, particularly to do with the recent
                  offscreen changes for Wade Wilson's alter ego. As you'd expect
                  with Ryan Reynolds in this role, the jokes are plentiful and
                  there is barely any time to react to one before another
                  appears. That can sometimes not work as well as intended, e.g.
                  'Deadpool 2', but here the humour is executed perfectly.
                  Reynolds himself is quality, it is a quintessential Ryan
                  Reynolds as Deadpool performance. It's real n... read the
                  rest. Ryan Reynolds in this role, the jokes are plentiful and
                  there is barely any time to react to one before another
                  appears. That can sometimes not work as well as intended, e.g.
                  'Deadpool 2', but here the humour is executed perfectly.
                  Reynolds himself is quali
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Media */}
        <div className="mt-8">
          <h1 className="text-2xl text-white font-semibold">Media</h1>

          <div className="mt-5 w-10/12">
            <Tabs defaultValue="videos" className="">
              <TabsList className="text-white font-semibold bg-slate-800 w-full justify-around">
                <TabsTrigger
                  value="videos"
                  className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
                >
                  Videos
                </TabsTrigger>
                <TabsTrigger
                  value="backdrops"
                  className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
                >
                  Backdrops
                </TabsTrigger>
                <TabsTrigger
                  value="posters"
                  className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
                >
                  Posters
                </TabsTrigger>
              </TabsList>
              <TabsContent value="videos">
                <img
                  src="https://www.giantfreakinrobot.com/wp-content/uploads/2020/10/deadpool-3-feature.jpg"
                  alt=""
                  className="w-[500px]"
                />
              </TabsContent>
              <TabsContent value="backdrops">
                <img
                  src="https://www.cnet.com/a/img/resize/83ec7441e2e0216d19ad44529e94d219c8c1090e/hub/2018/05/24/28ddccdb-2ae1-4d0f-ada8-c0ecc66b045e/deadpool-can.jpg?auto=webp&fit=crop&height=675&width=1200"
                  alt=""
                  className="w-[500px]"
                />
              </TabsContent>
              <TabsContent value="posters">
                <img
                  src="https://www.giantfreakinrobot.com/wp-content/uploads/2020/10/deadpool-3-feature.jpg"
                  alt=""
                  className="w-[500px]"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <h1 className="text-2xl text-white font-semibold">Recommendations</h1>

          <div className="w-10/12 grid grid-cols-3">
            <div className="mt-5 relative">
              <img
                src={
                  "https://media.themoviedb.org/t/p/w250_and_h141_face/3q01ACG0MWm0DekhvkPFCXyPZSu.jpg"
                }
                alt={""}
                className="rounded-lg object-cover"
              />

              <div className="text-white flex items-center justify-between">
                <h2>Bad Boys: Ride or Die</h2>
                <h2>77%</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
