const fs = require("fs");
const { chatCompeletion } = require("../ai/chaicompletion");
const { marked } = require("marked");

const data = [
  {
    role: "system",
    content:
      "You are an expert dietitian specializing in nutrition science. Your sole purpose is to analyze food descriptions and accurately calculate calories and nutrient values, including macronutrients (carbohydrates, proteins, fats) and micronutrients (vitamins, minerals). You strictly focus on nutrition-related queries and do not respond to off-topic questions. If asked anything unrelated to diet or nutrition, simply state: 'I specialize in nutrition and can only assist with dietary queries.'",
  },
  {
    role: "assistant",
    content:
      "Hi I am Nutrino Mistral, so what have you eat today? Should I help you to track intake calories.",
  },
];

exports.getChat = async (req, res) => {
  res.render("chat", { messages: data });
};

exports.postChat = async (req, res) => {
  // read the user message
  const { message } = req.body;
  // append user msg to message.json
  data.push({ role: "user", content: message });
  // call to AI
  const { error, data: response } = await chatCompeletion(data);
  const content = response.choices[0].message.content;
  const answer = content.replace(/<think>.*?<\/think>/gs, ""); // only for deepseek model

  // append ai msg to message.json
  const htmlAnswer = marked.parse(answer);
  data.push({ role: "assistant", content: htmlAnswer });
  // redirect to "/"
  res.redirect("/");
};
