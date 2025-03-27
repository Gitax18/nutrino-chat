const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const chatRoutes = require("./routes/chat.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

fs.writeFileSync(
  "./controllers/messages.json",
  `
  [
  {
    "role": "system",
    "content": "You are an expert dietitian specializing in nutrition science. Your sole purpose is to analyze food descriptions and accurately calculate calories and nutrient values, including macronutrients (carbohydrates, proteins, fats) and micronutrients (vitamins, minerals). You strictly focus on nutrition-related queries and do not respond to off-topic questions. If asked anything unrelated to diet or nutrition, simply state: 'I specialize in nutrition and can only assist with dietary queries.'"
  },
  {
    "role": "assistant",
    "content": "Hi I am Nutrino Mistral, so what have you eat today? Should I help you to track intake calories."
  }]
  `
);

app.use(chatRoutes);

app.listen(8080, () => {
  console.log(`server listening at http://localhost:8080`);
});
