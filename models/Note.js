const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  feature_img: String,
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: { type: String, required: true },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
NoteSchema.methods.clap = function() {
  this.claps++;
  return this.save();
};
NoteSchema.methods.comment = function(comment) {
  this.comments.push(comment);
  return this.save();
};
NoteSchema.methods.addAuthor = function(authorId) {
  this.author = authorId;
  return this.save();
};
NoteSchema.methods.getUserNotes = function(authorId) {
  Note.find({ author: authorId }).then(notes => {
    return notes;
  });
};

module.exports = Note = mongoose.model('note', NoteSchema);
