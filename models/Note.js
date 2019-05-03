const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  text: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  feature_img: String,
  claps: Number,
  comments: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      text: String
    }
  ]
});
NoteSchema.methods.clap = function() {
  this.claps++;
  return this.save();
};
NoteSchema.methods.comment = function(comment) {
  this.comments.push(comment);
  return this.save();
};
NoteSchema.methods.addAuthor = function(author_id) {
  this.author = author_id;
  return this.save();
};
NoteSchema.methods.getUserNotes = function(_id) {
  Note.find({ author: _id }).then(notes => {
    return notes;
  });
};

module.exports = mongoose.model("Article", NoteSchema);
