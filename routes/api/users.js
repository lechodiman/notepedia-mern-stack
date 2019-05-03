const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secretOrKey = config.get("secretOrKey");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// @route   GET api/users/
// @desc    Register route
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

// @route   GET api/users/login
// @desc    Login user / Return JWT Token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ email: "User not found" });
  }

  // Check Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    };

    // Sign Token
    const token = await jwt.sign(payload, secretOrKey, { expiresIn: 3600 });

    res.json({
      success: true,
      token: "Bearer " + token
    });
  } else {
    return res.status(400).json({ password: "Password incorrect" });
  }
});

// Get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        msg: "User not found"
      });
    }

    return res.json(user);
  } catch (err) {
    console.error(err.message);

    if (error.kind == "ObjectId") {
      return res.status(400).json({ message: "Profile not found" });
    }

    return res.status(500).send("Server Error");
  }
});

// Get user profile (user and articles)
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const following = await User.find({ following: req.params.id });

    following.forEach(person => {
      user.addFollower(person);
    });

    const articles = await Article.find({ author: req.params.id });

    return res.json(user, articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Follow a user
router.post("/follow", auth, async (req, res) => {
  try {
    const userToFollowId = req.body.user_id;

    const user = User.findById(req.user.id);

    user.follow(userToFollowId);

    return res.json({
      msg: "User followed"
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
