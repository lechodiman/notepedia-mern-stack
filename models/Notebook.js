const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NotebookSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: { type: String, required: true },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "note"
    }
  ]
});

NotebookSchema.methods.addNote = function(noteId) {
  this.notes.push(noteId);
  return this.save();
};
NotebookSchema.methods.addAuthor = function(authorId) {
  this.author = authorId;
  return this.save();
};
NotebookSchema.methods.isAuthor = function(userId) {
  return this.author.toString() === userId;
};
NotebookSchema.statics.findUserNotebooks = function(authorId) {
  return this.find({ author: authorId })
    .populate("notes")
    .populate("author", "-password")
    .then(notebooks => {
      return notebooks;
    });
};

module.exports = Notebook = mongoose.model("notebook", NotebookSchema);
