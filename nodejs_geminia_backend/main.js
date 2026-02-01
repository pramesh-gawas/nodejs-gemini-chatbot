import { GoogleGenAI } from "@google/genai";
import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json());
app.use(bodyParser.json());
const ai = new GoogleGenAI({});
const port = process.env.port || 3000;
import cors from "cors";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req, res) => {
  res.send("hello world");
});

const main = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
};

app.post("/api/content", async (req, res) => {
  try {
    const data = req.body.questions;
    const result = await main(data);
    res.send({ response: result });
  } catch (error) {
    res.send({ response: error });
  }
});

app.listen(port, () => {
  console.log(`app is listing on the port ${port}`);
});
