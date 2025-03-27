const { Groq } = require("groq-sdk");
require("dotenv").config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.chatCompeletion = async (messages) => {
  try {
    const resp = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Groq model
      messages: messages,
    });
    return { error: false, data: resp };
  } catch (error) {
    console.error("Error in Groq chatCompletion:", error);
    return { error, data: [] };
  }
};
