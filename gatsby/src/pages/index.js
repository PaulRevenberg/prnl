import * as React from "react";
import Landing from "../components/landing.js";
import Gallery from "../components/gallery.js";
import SEO from "../components/seo.js";

const IndexPage = () => {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <Landing />
      <div
        id="gallery"
        className="h-screen snap-start snap-always justify-center bg-neutral-800 p-4 font-bold text-neutral-200"
      >
        <Gallery />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <SEO />;
