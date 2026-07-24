import { generateQuiz } from "../services/openAI.service.js";

export const generateQuizController = async (req, res) => {
  console.log("AI Controller Hit");
  console.log(req.body);
  try {
    const { topic, difficulty, numQuestions } = req.body;

    const prompt = `
Generate a ${difficulty} difficulty quiz on "${topic}".

Requirements:
- Generate exactly ${numQuestions} multiple choice questions.
- Each question should have 4 options.
- Each question should have one correct answer.
- Return ONLY valid JSON.

Format:
{
  "questions":[
    {
      "question":"...",
      "options":["A","B","C","D"],
      "correctAnswer":"A"
    }
  ]
}
`;

    const aiResponse = await generateQuiz(prompt);

    // OpenAI response ko JSON me convert karo
    const parsed =
      typeof aiResponse === "string" ? JSON.parse(aiResponse) : aiResponse;

    const questions = parsed.questions || [];

    // Frontend ke liye quiz object
    const quiz = {
      title: `${topic} Quiz`,
      description: `AI Generated ${difficulty} Quiz`,
      topic,
      difficulty,
      totalQuestions: questions.length,
    };

    return res.status(200).json({
      status: "success",
      data: {
        quiz,
        questions,
      },
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
