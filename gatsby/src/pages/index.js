import * as React from "react";
import Landing from "../components/landing.js";
import Gallery from "../components/gallery.js";
import SEO from "../components/seo.js";

const IndexPage = () => {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <Landing />
      {/* <div className="h-screen snap-start snap-always gap-4 bg-neutral-50 md:flex portrait:bg-red-100 landscape:flex">
        <div className="px-auto flex h-1/2 min-w-[33%] flex-grow flex-col items-center justify-center sm:flex-row md:h-full">
          <img
            className="aspect-portrait h-40 w-40 rounded-full"
            src="https://picsum.photos/200/200"
            alt=""
          />
          <div className="mt-4 flex flex-col items-center pl-2 sm:items-start">
            <span className="text-3xl text-zinc-800">Paul Revenberg</span>
            <span className=" text-zinc-400">Software developer</span>
          </div>
        </div>

        <div className="flex h-1/2 w-full flex-row items-end justify-center gap-6 md:h-full md:max-w-[33vw] md:flex-col md:pl-2 portrait:md:max-w-[40vw]">
          <div className="fake-img rounded-tr-md md:rounded-tr-none"></div>
          <img
            src="https://picsum.photos/400/300"
            alt=""
            className="shadow-l aspect-[4/3] sm:w-full sm:rounded-t-md md:rounded-l-md md:shadow-neutral-200"
          />
          <div className="fake-img rounded-tl-md md:rounded-tr-none"></div>
        </div>
      </div> */}
      {/* <div
        id="gallery"
        className="h-screen snap-start snap-always justify-center bg-neutral-800 p-4 font-bold text-neutral-200"
      >
        <Gallery />
      </div> */}
    </main>
  );
};

export default IndexPage;

export const Head = () => <SEO />;
