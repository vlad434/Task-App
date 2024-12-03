const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const Task = require("../models/task");
const router = new express.Router();
const multer = require("multer");
const sharp = require("sharp");

//create users
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//login route
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

//logout route
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//logout all
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//get all users
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//update existing user
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await Task.deleteMany({ owner: req.user._id });

    await User.findByIdAndDelete(req.user._id);

    res.send(req.user);
  } catch (error) {
    console.error("Eroare la ștergerea utilizatorului:", error);
    res.status(500).send({ error: error.message });
  }
});

const upload = multer({
  // dest: "avatars", //ca sa pot accesa datele de pe model, pentru poza
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a .jpg, .jpeg or .png file"));
    }

    cb(undefined, true);
  },
});

//avatar upload
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    // req.user.avatar = req.file.buffer; // cu req.file accesez fisierele si apoi le salvez pe campul avatar de pe user
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//avatar delete
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png"); //seteaza header-ul pentru tipul de imagine primit
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

router.get("", (req, res) => {
  res.render("index", {
    title: "Title test",
    name: "Vladone",
  });
});

module.exports = router;
