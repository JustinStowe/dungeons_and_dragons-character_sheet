const User = require("../models/user");
const chalk = require("chalk");
//const Post = require('../models/post')
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

module.exports = {
  signUp,
  login,
  //profile,
  //updateBio,
};

async function updateBio(req, res) {
  try {
    const newProfile = await User.findOneAndUpdate(
      { _id: req.user._id },
      { bio: req.body.bio },
      { new: true }
    );
    console.log(chalk.blueBright("new profile:"), chalk.green(newProfile));
    res.status(200).json({ data: newProfile });
  } catch (error) {
    console.error(chalk.redBright("updateBio error:"), chalk.red(error));
    res.status(400).json({ error });
  }
}

async function profile(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).json({ err: "User not found" });

    const posts = await postMessage
      .find({ user: user._id })
      .populate("user")
      .exec();
    console.log(chalk.blue("user posts"), chalk.blueBright(posts));
    res.status(200).json({ posts: posts, user: user });
  } catch (error) {
    console.error(chalk.red("profile error"), chalk.redBright(error));
    res.status(400).json({ error });
  }
}

async function signup(req, res) {
  console.log(
    chalk.green("req.body:"),
    chalk.blue(req.body),
    chalk.green("req file:"),
    chalk.blue(req.file)
  );

  const filePath = `${uuidv4()}/${req.file.originalname}`;
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
    Body: req.file.buffer,
  };

  s3.upload(params, async function (err, data) {
    //data is from successful response from aws, found in data.location
    console.error(chalk.red("error from aws"), chalk.redBright(err));

    const user = new User({ ...req.body, photoUrl: data.location });
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (error) {
      console.error(chalk.red("sign-up error"), chalk.redBright(error));
      res.status(400).json({ error });
    }
  });
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (error) {
    console.error(chalk.red("login error:"), chalk.redBright(error));
    return res.status(401).json(error);
  }
}

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}
