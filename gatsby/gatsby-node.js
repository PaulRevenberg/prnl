const fs = require("fs");

exports.onPreBuild = async () => {
  if (fs.existsSync("./src/data/gallery.json")) return;
  fs.writeFileSync(
    "./src/data/gallery.json",
    JSON.stringify([
      {
        height: 600,
        width: 400,
        type: "jpg",
        thumb: "URL_TO_THUMBNAIL",
        full: "URL_TO_FULL_SIZE",
        svg: "URL_TO_SVG",
      },
    ])
  );
};
