const multipart = require("connect-multiparty");
const multipartWare = multipart();
const cloudinary = require("cloudinary");

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Note = require("../../models/Note");
const User = require("../../models/User");

// @route    POST api/notes
// @desc     Create a note
// @access   Private
router.post(
    "/", [
        multipartWare,
        auth, [
            check("text", "Text is required")
            .not()
            .isEmpty()
        ]
    ],
    async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            const { text, title, claps, description } = req.body;

            let noteParameters = {
                text,
                title,
                claps,
                description,
                feature_img: "",
                author: req.user.id
            };

            if (req.files && req.files.image) {
                const uploadedImage = cloudinary.uploader.upload(req.files.image.path, {
                    resource_type: "image",
                    eager: [{ effect: "sepia" }]
                });

                noteParameters = {
                    ...noteParameters,
                    feature_img: uploadedImage.url
                };
            }

            const note = new Note(noteParameters);

            const savedNote = await note.save();

            const noteWithAuthor = savedNote.populate("author", "-password");

            res.json(noteWithAuthor);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route    GET api/notes
// @desc     Get all notes
// @access   Public
router.get("/", async(req, res) => {
    try {
        const perPage = 5;
        const notes = await Note.find({}, null, {
                limit: perPage,
                skip: perPage * req.body.page
            })
            .sort("desc")
            .populate("author", "-password");

        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route    GET api/notes/:id
// @desc     Get note by ID
// @access   Public
router.get("/:id", async(req, res) => {
    try {
        const note = await Note.findById(req.params.id)
            .populate("author", "-password")
            .populate("comments.author");

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route    DELETE api/notes/:id
// @desc     Delete a note
// @access   Private
router.delete("/:id", auth, async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Check user
        if (note.author.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        await note.remove();

        res.json({ message: "Note removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route    POST api/notes/comment/:id
// @desc     Comment on a note
// @access   Private
router.post(
    "/comment/:id", [
        auth, [
            check("text", "Text is required")
            .not()
            .isEmpty()
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select("-password");
            const note = await Note.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                author: req.user.id
            };

            note.comments = [newComment, ...note.comments];

            await note.save();

            res.json(note.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route    DELETE api/notes/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        // Pull out comment
        const comment = note.comments.find(
            comment => comment.id === req.params.comment_id
        );

        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ message: "Comment does not exist" });
        }

        // Check user
        if (comment.author.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        // Get remove index
        const removeIndex = note.comments
            .map(comment => comment.author.toString())
            .indexOf(req.user.id);

        note.comments.splice(removeIndex, 1);

        await note.save();

        res.json(note.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route    PATCH api/notes/:id/
// @desc     Update a note
// @access   Private
router.patch("/:id", auth, async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        // Check if the note exists
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Check user
        if (note.author.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const updatedNote = await Note.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });

        res.json(updatedNote);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// @route    PUT api/notes/like/:id
// @desc     Like a note
// @access   Private
router.put("/like/:id", auth, async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        // Check if the note has already been liked
        if (
            note.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({ msg: "Note already liked" });
        }

        note.likes.unshift({ user: req.user.id });

        await note.save();

        res.json(note.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route    PUT api/notes/unlike/:id
// @desc     Unlike a note
// @access   Private
router.put("/unlike/:id", auth, async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        // Check if the note has already been liked
        if (
            note.likes.filter(like => like.user.toString() === req.user.id).length ===
            0
        ) {
            return res.status(400).json({ msg: "Note has not yet been liked" });
        }

        // Get remove index
        const removeIndex = note.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

        note.likes.splice(removeIndex, 1);

        await note.save();

        res.json(note.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;