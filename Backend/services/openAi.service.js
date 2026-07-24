import client from "../config/openAI.js";

export const generateQuiz = async (prompt) => {
  console.log("Calling OpenAI...");
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "Return only valid JSON. Do not use markdown or ```json blocks.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 3000,
  });
  console.log(response.choices[0].message.content);

  return response.choices[0].message.content.trim();
};
