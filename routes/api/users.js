const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
const Notebook = require("../../models/Notebook");
// @route   GET api/users/
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if user already exists
      const { name, email, password } = req.body;

      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ email: "User already exists" }] });
      }

      // Fetch gravatar
      const avatar = gravatar.url(email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default image
      });

      const newUser = new User({
        name,
        email,
        avatar,
        password
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);

      // Save user in DB
      await newUser.save();

      // Send user id as payload
      const payload = {
        user: {
          id: newUser.id
        }
      };

      jwt.sign(
        payload,
        config.get("secretOrKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Get user profile (user and notes)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const notes = await Note.find({ author: req.params.id });

    return res.json({ user, notes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get current user profile (user and notes)
router.get("/profile/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const notes = await Note.find({ author: req.user.id }).populate(
      "author",
      "-password"
    );

    return res.json({ user, notes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Follow a user
// TODO: Check if this routes works as expected
router.post("/follow/:id", auth, async (req, res) => {
  try {
    const userToFollowId = req.params.id;

    const user = User.findById(req.user.id);

    user.follow(userToFollowId);

    // TODO: Followed user must have this user as a follower

    return res.json({
      message: "User followed"
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   GET api/:id/bookmarks/
// @desc    Get the bookmarks of an given user
// @access  Private

router.get("/:id/bookmarks", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("bookmarks");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user.bookmarks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   PUT api/:id/bookmarks/:noteid
// @desc    Assign a note to an user bookmarks
// @access  Private

router.put("/:id/bookmarks/:noteid", auth, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(404).json({
        message: "Unauthorized"
      });
    }

    const note = await Note.findById(req.params.noteid);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check if the note is already bookmarked
    if (
      user.bookmarks.filter(note => note._id.toString() === req.params.noteid)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Note is already in bookmarks" });
    }
    // Associate the note with the user bookmarks

    user.bookmarks.unshift(note);

    await user.save();
    res.json(note);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   DELETE api/:id/bookmarks/:noteid
// @desc    Delete a note from an user bookmarks
// @access  Private
router.delete("/:id/bookmarks/:noteid", auth, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(404).json({
        message: "Unauthorized"
      });
    }

    const note = await Note.findById(req.params.noteid);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check if the note is already bookmarked
    if (
      user.bookmarks.filter(note => note._id.toString() === req.params.noteid)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Note isn't in bookmarks" });
    }

    // Get remove index
    const removeIndex = user.bookmarks
      .map(note => note._id.toString())
      .indexOf(req.params.noteid);

    user.bookmarks.splice(removeIndex, 1);

    await user.save();

    res.json(user.bookmarks);
  } catch (err) {
    console.log(err.message);
  }
});

// @route   GET api/users/me/notebooks
// @desc    Get all notebooks from current user
// @access  Private
router.get("/me/notebooks", auth, async (req, res) => {
  try {
    const notebooks = await Notebook.findUserNotebooks(req.user.id);

    return res.json(notebooks);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
