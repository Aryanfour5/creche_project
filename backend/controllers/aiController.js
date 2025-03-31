import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

let conversationHistory = {};

export const chatWithGemini = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "User ID and message are required" });
    }

    // Initialize conversation history for the user if not already present
    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    // Add user message to conversation history
    conversationHistory[userId].push({ role: "user", content: message });

    // Detect if the message contains any care-related keywords
    const keywords = ["nanny", "nannies", "babysitting", "creche", "childcare"];
    const containsNannyKeywords = keywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );

    // Structure the prompt based on detected keywords to encourage relevant responses
    const structuredPrompt = containsNannyKeywords
      ? `
        You are an expert virtual assistant for care services, specializing in nanny, babysitting, creche, and childcare topics. 
        Provide detailed answers covering:
        - The roles, responsibilities, and qualifications of care providers (like nannies or creche staff), including certifications like CPR or first aid.
        - How to arrange, book, or inquire about services, including steps for verifying provider availability.
        - General insights about babysitting, creche services, and childcare options available for families.
        - Any safety, legal, or practical considerations parents should be aware of when choosing these services.

        Please respond accurately based on the specific care-related question below.

        User question:
        ${message}
      `
      : `
        You are a general virtual assistant. Provide accurate, helpful answers with a friendly tone.

        User question:
        ${message}
      `;

    // Generate response from Google Generative AI SDK
    const result = await genAI.generateText({
      model: "gemini-1.5-flash",
      prompt: structuredPrompt,
    });

    let responseText = result?.data?.text?.trim();

    // Fallback response if AI fails to provide a response
    if (!responseText) {
      responseText = containsNannyKeywords 
        ? "I'm here to help with questions about care services like nannies, babysitting, creches, or general childcare. Please let me know what specific information you need!"
        : "I'm here to help! Let me know if you need assistance with anything.";
    }

    // Add AI's response to the conversation history
    conversationHistory[userId].push({ role: "gemini", content: responseText });

    // Respond with the AI's answer
    res.json({ response: responseText });
  } catch (err) {
    console.error("Error in chatWithGemini:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Optional function to send custom text without conversation context
async function sendToGemini(userId, text) {
  if (!conversationHistory[userId]) {
    conversationHistory[userId] = [];
  }

  const prompt = `
    You are a virtual assistant specializing in nanny, babysitting, and creche services. Answer questions about qualifications, booking, availability, and general childcare information.

    Text to analyze:
    ${text}
  `;

  const result = await genAI.generateText({
    model: "gemini-1.5-flash",
    prompt,
  });

  return result?.data?.text?.trim() || "I'm here to help with questions on nanny or childcare services. Please specify if you'd like more details!";
}
