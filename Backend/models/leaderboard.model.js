import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    user :{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required :[true,"User is required"]
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Quiz",
      required :[true,"Quiz is required"]
    },  
    score: {
      type: Number,
      required: [true, "Score is required"],
    },  
    rank: {
      type: Number,
      required: [true, "Rank is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Leaderboard = mongoose.model("Leaderboard", quizAttemptSchema);
export default Leaderboard;