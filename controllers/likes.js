const chalk = require("chalk");
const Post = require("../models/post");

module.exports = {
  create,
  deleteLike,
};

async function create(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    post.likes.push({ username: req.user.username, userId: req.user._id });
    await post.save();
    res.status(201).json({ data: "like added" });
  } catch (error) {
    console.error(chalk.red("create like error:"), chalk.redBright(error));
    res.status(400).json({ error });
  }
}

async function deleteLike(req, res) {
  try {
    const post = await Post.findOne({
      "likes._id": req.params.id,
      "likes.username": req.user.username,
    });
    post.likes.remove(req.params.id);
    await post.save();
    res.json({ data: "like removed" });
  } catch (error) {
    console.error(chalk.red("delete like error:"), chalk.redBright(error));
  }
}
