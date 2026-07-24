import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: [true, "Quiz is required"],
      index: true,
    },
    text: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    options: {
      type: String,
      required: [true, "Options are required"],
      validate: {
        validator: function (value) {
          return value && value.length >= 2;
        },
        message:"Invalid options !.",
    },
  },

  correctAnswer: {
    type:Number,
    required: [true, "Correct answer index is required"],
    validate: {
      validator: function (value) {
        return value && valuelenght >= 1;
      },
      message:"Invalid  correct options !.",
  }, 
},
  
explanation: {
  type: String,
  trim: true,
  default: "",
},
  },
  {
    timestamps: true,
  }
  

);
const Question = mongoose.model("Question", questionSchema);

export default Question;
