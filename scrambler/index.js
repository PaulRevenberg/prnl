const sizeOf = require("image-size");
const fs = require("fs");
const _path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const invariant = require("invariant");

const dir = process.env.DIR;
const targetDir = process.env.TARGET_DIR;
const bucket = process.env.BUCKET_URL;
const thumbnailDir = process.env.THUMBNAIL_DIR;
const fullDir = process.env.FULL_DIR;

invariant(dir, "ENV missing DIR value");
invariant(targetDir, "ENV missing TARGET_DIR value");
invariant(bucket, "ENV missing BUCKET_URL value");

const thumbTarget = _path.join(targetDir, "thumb");
const fullTarget = _path.join(targetDir, "full");

//Clear targetdir
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(thumbTarget);
fs.mkdirSync(fullTarget);

const files = fs
  .readdirSync(_path.join(dir, thumbnailDir))
  .filter((file) => _path.extname(file).toLowerCase() === ".jpg")
  .map((item) => ({
    name: item,
    thumb: sizeOf(_path.join(dir, thumbnailDir, item)),
    full: sizeOf(_path.join(dir, fullDir, item)),
  }))
  .map((image) => {
    const id = uuidv4();
    const ext = _path.extname(image.name);

    console.log(image.name, id);
    fs.copyFileSync(
      _path.join(dir, thumbnailDir, image.name),
      _path.join(thumbTarget, id + ext)
    );
    fs.copyFileSync(
      _path.join(dir, fullDir, image.name),
      _path.join(fullTarget, id + ext)
    );

    return {
      ...omit("name", image),
      id,
    };
  });

console.log(files);
fs.writeFileSync("gallery.json", JSON.stringify(files));

function omit(key, obj) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}
