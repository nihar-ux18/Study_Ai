console.log(">>> USING GEMINI JS FROM:", __filename);
console.log(">>> GEMINI FILE LOADED SUCCESSFULLY");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function processDocument(fileUrl, type) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt =
      type === "summary"
        ? `Summarize this study document:\n${fileUrl}`
        : `Generate 10 MCQ questions with answers from this document:\n${fileUrl}`;

    // IMPORTANT: v1 format needs array
    const result = await model.generateContent([
      { text: prompt }
    ]);

    return result.response.text();

  } catch (err) {
    console.log("🔥 GEMINI ERROR:", err.response?.data || err.message || err);
    return "AI service unavailable.";
  }
}

module.exports = processDocument;