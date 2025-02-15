import { GoogleGenerativeAI } from "@google/generative-ai";
import { createUserPrompt, system_prompt } from "./prompt";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: system_prompt,
});

export default async function run(prompt: string) {
  const chat = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });

  const result = await chat.sendMessage(createUserPrompt(prompt));
  console.log("AI Response: ", result.response.text());
  return result.response.text();
}
