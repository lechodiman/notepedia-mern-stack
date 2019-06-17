const multipart = require("connect-multiparty");

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Note = require("../../models/Note");
const User = require("../../models/User");
const Notebook = require("../../models/Notebook");

// @route    POST api/notebooks
// @desc     Create a notebook
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("Name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      const { name } = req.body;

      const notebookParameters = {
        name,
        author: req.user.id
      };

      const notebook = new Notebook(notebookParameters);

      const savedNotebook = await notebook.save();

      const notebookWithAuthor = savedNotebook.populate("author", "-password");

      res.json(notebookWithAuthor);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/notebooks
// @desc     Get all notebooks
// @access   Public
router.get("/", async (req, res) => {
  try {
    const notebooks = await Notebook.find()
      .populate("author", "-password")
      .populate("notes")
      .sort({ date: -1 });
    res.json(notebooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/notebooks
// @desc     Edit a notebook
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const notebook = await Notebook.findById(req.params.id);

    if (!notebook) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    if (!notebook.isAuthor(req.user.id)) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Using findBy.. so it returns the edited document. notebook.update() does not return the modified doc.
    const updatedNotebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    res.json(updatedNotebook);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Notebook not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
