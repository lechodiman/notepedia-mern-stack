const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Validate user and send it back
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if user already exists
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid credentials" }] });
      }

      // Make sure password match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid credentials" }] });
      }

      // Send user id as payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Send back token
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

module.exports = router;
