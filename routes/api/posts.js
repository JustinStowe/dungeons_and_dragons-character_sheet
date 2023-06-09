const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/posts");
const multer = require("multer");
const upload = multer();

//public routes
router.post("/", isAuthorized, upload.single("photo"), postsCtrl.create);
router.get("/", postsCtrl.index);

//authentication needed routes
function isAuthorized(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
}
module.exports = router;
