import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"],
      trim: true,
      maxlength: [100, "Quiz title must be less than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Quiz description must be less than 1000 characters"],
    },
    quizPhoto: {
      type: String,
      default: "",
    },
    cetegory: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },
    deficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Difficulty level is required"],
      default:"easy",
    },

    timer:{
      type: Number,
      required: [true, "Timer is required"],
      min:[0,"Timer should be greater than 0"],
      default: 0,
    },
    isPublished:{
      type: Boolean,
      default: false,
      index:true,
    },
     createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },

    questionsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
