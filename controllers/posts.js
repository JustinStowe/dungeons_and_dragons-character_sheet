const Post = require("../models/posts");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();
const { v4: uuidv4 } = require("uuid");

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  create,
  index,
};

function create(req, res) {
  console.log(
    chalk.green("req.body:"),
    chalk.blue(req.body),
    chalk.green("req file:"),
    chalk.blue(req.file),
    chalk.green("req.user:"),
    chalk.blue(req.user)
  );
  const filePath = `${uuidv4()}/${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };
  s3.upload(params, async function (err, data) {
    console.error(chalk.red("aws error:"), chalk.redBright(err));

    try {
      const post = await Post.create({
        caption: req.body.caption,
        photoUrl: data.Location,
        user: req.user,
      });

      res.status(201).json({ post: post });
    } catch (error) {
      console.error(chalk.red("create post error:"), chalk.redBright(error));
      res.status(400).json({ error });
    }
  });
}

async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.error(chalk.red("post index error:"), chalk.redBright(error));
  }
}
