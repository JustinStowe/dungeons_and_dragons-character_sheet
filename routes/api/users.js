const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/user");
const multer = require("multer");
const upload = multer();

//public routes

router.post("/signup", upload.single("photo"), usersCtrl.signUp);
router.post("/login", usersCtrl.login);
router.get("/:username", usersCtrl.profile);
router.post("/updateBio", usersCtrl.updateBio);

//authentication needed routes

module.exports = router;
