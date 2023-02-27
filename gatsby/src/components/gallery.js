import * as React from "react";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// const photos = [
//   { src: "https://picsum.photos/400/300", width: 400, height: 300 },
//   { src: "https://picsum.photos/400/200", width: 400, height: 200 },
//   { src: "https://picsum.photos/400/300", width: 400, height: 300 },
//   { src: "https://picsum.photos/300/400", width: 300, height: 400 },
//   { src: "https://picsum.photos/400/200", width: 400, height: 200 },
//   { src: "https://picsum.photos/400/200", width: 400, height: 200 },
//   { src: "https://picsum.photos/300/400", width: 300, height: 400 },
//   { src: "https://picsum.photos/400/300", width: 400, height: 300 },
// ];
// const photos = [...Array(20)].map((item) => {
//   const width = Math.ceil(Math.random() * 4) * 100;
//   const height = Math.ceil(Math.random() * 4) * 100;
//   return {
//     src: `https://picsum.photos/${width}/${height}`,
//     width,
//     height,
//   };
// });

const photos = [
  { src: "DSC_3082.jpg", svg: "DSC_3082.svg", width: 6048, height: 3402 },
  { src: "DSC_3094.jpg", svg: "DSC_3094.svg", width: 6048, height: 4024 },
  { src: "DSC_3484.jpg", svg: "DSC_3484.svg", width: 4024, height: 6048 },
  { src: "DSC_3544.jpg", svg: "DSC_3544.svg", width: 6048, height: 4024 },
  { src: "DSC_3637.jpg", svg: "DSC_3637.svg", width: 5848, height: 3891 },
  { src: "DSC_3654.jpg", svg: "DSC_3654.svg", width: 6048, height: 4024 },
  { src: "DSC_3686.jpg", svg: "DSC_3686.svg", width: 6048, height: 4024 },
  { src: "DSC_3725.jpg", svg: "DSC_3725.svg", width: 4024, height: 6048 },
  { src: "DSC_4179.jpg", svg: "DSC_4179.svg", width: 6048, height: 4024 },
  { src: "DSC_4301.jpg", svg: "DSC_4301.svg", width: 6048, height: 4024 },
  { src: "DSC_4374.jpg", svg: "DSC_4374.svg", width: 4672, height: 3738 },
  { src: "DSC_4552.jpg", svg: "DSC_4552.svg", width: 5562, height: 3701 },
  { src: "DSC_4591.jpg", svg: "DSC_4591.svg", width: 5722, height: 3807 },
  {
    src: "DSC_3949-HDR.jpg",
    svg: "DSC_3949-HDR.svg",
    width: 3963,
    height: 5956,
  },
  {
    src: "DSC_4040-HDR.jpg",
    svg: "DSC_4040-HDR.svg",
    width: 3924,
    height: 5898,
  },
  {
    src: "DSC_4230-HDR.jpg",
    svg: "DSC_4230-HDR.svg",
    width: 5960,
    height: 3965,
  },
  {
    src: "DSC_4260-HDR-Pano.jpg",
    svg: "DSC_4260-HDR-Pano.svg",
    width: 16010,
    height: 6502,
  },
  {
    src: "DSC_3242-HDR-2.jpg",
    svg: "DSC_3242-HDR-2.svg",
    width: 5894,
    height: 3922,
  },
];

const photoRender = ({
  photo,
  imageProps: { alt, style, ...restImageProps },
}) => (
  <img
    alt={alt}
    style={{
      ...style,
      width: "100%",
      padding: 0,
      backgroundImage: `url(/${photo.svg})`,
    }}
    {...restImageProps}
  />
);

const Gallery = () => {
  const [index, setIndex] = React.useState(-1);
  return (
    <div className="scrollbar-hide mx-auto h-full overflow-y-scroll xl:max-w-[120rem]">
      <PhotoAlbum
        renderPhoto={photoRender}
        layout="columns"
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        // targetRowHeight={250}
      />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
};

export default Gallery;
