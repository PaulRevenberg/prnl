const {
  S3Client,
  DeleteObjectsCommand,
  ListObjectsCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");
const _path = require("path");
const invariant = require("invariant");
const sizeOf = require("image-size");
const { v4: uuidv4 } = require("uuid");
const { sqip } = require("sqip");
const s3Client = new S3Client({ region: "eu-central-1" });

exports.onPreBuild = async () => {
  if (fs.existsSync("./src/data/gallery.json")) {
    console.log('"gallery.json" found');
    return;
  }
  console.log('Generating "gallery.json"');

  const dir = process.env.IMAGE_DIR;
  const bucket = process.env.IMAGE_BUCKET;
  const thumbnailDir = process.env.THUMBNAIL_DIR ?? "thumbnail";
  const fullDir = process.env.FULL_DIR ?? "full";
  const landingDir = process.env.LANDING_DIR ?? "landing";
  invariant(dir, "ENV missing DIR value");
  invariant(bucket, "ENV missing IMAGE_BUCKET value");

  const bucketParams = {
    Bucket: bucket,
  };

  await emptyBucket(bucketParams.Bucket);
  console.log("bucket emptied");

  const landing = fs
    .readdirSync(_path.join(dir, landingDir))
    .filter((file) => _path.extname(file).toLowerCase() === ".jpg");
  if (landing.length === 0) throw new Error("No landing image found");
  const landingCommand = new PutObjectCommand({
    ...bucketParams,
    Key: `landing.jpg`,
    Body: fs.readFileSync(_path.join(dir, landingDir, landing[0])),
    ContentType: "image/jpeg",
  });

  s3Client.send(landingCommand);

  const files = await Promise.all(
    fs
      .readdirSync(_path.join(dir, thumbnailDir))
      .filter((file) => _path.extname(file).toLowerCase() === ".jpg")
      .map((item) => ({
        name: item,
        thumb: sizeOf(_path.join(dir, thumbnailDir, item)),
        full: sizeOf(_path.join(dir, fullDir, item)),
      }))
      .map(async (image) => {
        const id = uuidv4();
        const ext = _path.extname(image.name);

        const thumbCommand = new PutObjectCommand({
          ...bucketParams,
          Key: `thumb/${id}${ext}`,
          Body: fs.readFileSync(_path.join(dir, thumbnailDir, image.name)),
          ContentType: "image/jpeg",
        });
        const fullCommand = new PutObjectCommand({
          ...bucketParams,
          Key: `full/${id}${ext}`,
          Body: fs.readFileSync(_path.join(dir, fullDir, image.name)),
          ContentType: "image/jpeg",
        });

        s3Client.send(thumbCommand);
        s3Client.send(fullCommand);
        const svg = await sqip({
          input: _path.join(dir, thumbnailDir, image.name),
          blur: 12,
          plugins: [
            {
              name: "sqip-plugin-primitive",
              options: {
                numberOfPrimitives: 4,
                mode: 8,
              },
            },
            `sqip-plugin-svgo`,
          ],
        });
        console.log(`Finished ${image.name}`);
        return {
          ...omit("name", image),
          id,
          svg: svg.content.toString("base64"),
        };
      })
  );
  console.log('Writing "gallery.json"');
  fs.writeFileSync("./src/data/gallery.json", JSON.stringify(files));
};

function uploadLanding(s3) {}

function omit(key, obj) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

async function emptyBucket(bucket) {
  console.log(`Emptying bucket: ${bucket} `);
  const objects = await s3Client.send(
    new ListObjectsCommand({ Bucket: bucket })
  );
  if (objects.Contents) {
    await s3Client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: { Objects: objects.Contents },
      })
    );
  }
}
