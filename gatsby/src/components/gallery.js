import * as React from "react";
import { PhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoData from "../data/gallery.json";

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
      // backgroundImage: `url(${photo.svg})`,
    }}
    {...restImageProps}
  />
);

const fullData = PhotoData.map((item) => {
  return {
    src: `${process.env.GATSBY_BUCKET_URL}/full/${item.id}.${item.full.type}`,
    width: item.full.width,
    height: item.full.height,
    key: item.id,
  };
});

const thumbData = PhotoData.map((item) => {
  return {
    src: `${process.env.GATSBY_BUCKET_URL}/thumb/${item.id}.${item.thumb.type}`,
    svg: `${process.env.GATSBY_BUCKET_URL}/svg/${item.id}.${item.thumb.type}`,
    ...item.thumb,
    key: item.id,
  };
});

const Gallery = () => {
  const [index, setIndex] = React.useState(-1);

  return (
    <div className="scrollbar-hide mx-auto h-full overflow-y-scroll xl:max-w-[120rem]">
      <PhotoAlbum
        renderPhoto={photoRender}
        layout="columns"
        photos={thumbData}
        onClick={({ index }) => setIndex(index)}
        // targetRowHeight={250}
      />
      <Lightbox
        slides={fullData}
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
