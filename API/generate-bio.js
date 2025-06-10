// api/generate-bio.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { name, profession, hobbies, tone, language } = req.body;

  const prompt = `
    Write a short ${tone} bio for ${name}, a ${profession}, who enjoys ${hobbies.join(", ")}.
    Only respond in ${language}.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150,
    });

    const bio = response.choices[0].message.content.trim();
    res.status(200).json({ bio });
  } catch (error) {
    console.error("API error", error.message);
    res.status(500).json({ error: "Failed to generate bio" });
  }
}
