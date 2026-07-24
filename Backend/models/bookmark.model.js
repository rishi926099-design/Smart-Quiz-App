import mongoose from "mongoose";  

const bookmarkSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"], 
      index: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",  
      required: [true, "Quiz is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//it ensures that a user can bookmark a quiz only once, preventing duplicate bookmarks for the same quiz by the same user.compound index on user and quiz fields, with a unique constraint. This means that for each combination of user and quiz, there can only be one bookmark entry in the database. If a user tries to bookmark the same quiz again, it will result in a duplicate key error, preventing the creation of multiple bookmarks for the same quiz by the same user.
bookmarkSchema.index({ user: 1, quiz: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;