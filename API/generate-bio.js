// api/generate-bio.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.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,
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
