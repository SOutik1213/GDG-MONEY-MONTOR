import { GoogleGenerativeAI } from "@google/generative-ai"
import { GOOGLE_AI_API_KEY, GOOGLE_AI_MODEL, SYSTEM_INSTRUCTION } from "../config/api-keys"

// Initialize the Google Generative AI with the API key from config
const genAI = new GoogleGenerativeAI(GOOGLE_AI_API_KEY)

// Generation config
const generationConfig = {
  temperature: 1.8,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
}

// Create a chat session
let chatSession = null

// Initialize the chat session
export const initChatSession = async () => {
  try {
    // Get the model with system instruction
    const model = genAI.getGenerativeModel({
      model: GOOGLE_AI_MODEL,
      systemInstruction: SYSTEM_INSTRUCTION,
    })

    // Start a chat session
    chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: "hi" }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hey there! 👋 I'm so glad you're here. Think of me as your friendly AI guide on this awesome journey to becoming a money master. I'm here to break down confusing financial stuff into simple, easy-to-understand nuggets of wisdom. Whether you're trying to budget, save, invest, or just get a handle on your finances, I'm here to help you every step of the way. What's on your mind today? Let's chat about your financial goals and how we can make them happen! ✨",
            },
          ],
        },
      ],
    })

    return chatSession
  } catch (error) {
    console.error("Error initializing chat session:", error)
    throw error
  }
}

// Get or create chat session
export const getChatSession = async () => {
  if (!chatSession) {
    return await initChatSession()
  }
  return chatSession
}

// Send a message to the chat session
export const sendMessage = async (message) => {
  try {
    const session = await getChatSession()
    const result = await session.sendMessage(message)
    return result.response.text()
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}

// Send a message with streaming response
export const sendMessageStream = async (message, onChunk, onComplete, onError) => {
  try {
    const session = await getChatSession()

    // Send the message and get the response
    const result = await session.sendMessage(message)
    const responseText = result.response.text()

    // Since the Google AI library doesn't support streaming directly in chat,
    // we'll simulate streaming by breaking the response into chunks
    const words = responseText.split(" ")
    let accumulatedText = ""

    // Process words with a delay to simulate streaming
    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30)) // Delay between words
      accumulatedText += (i > 0 ? " " : "") + words[i]
      onChunk(words[i], accumulatedText)
    }

    onComplete(responseText)
    return responseText
  } catch (error) {
    console.error("Error sending message stream:", error)
    onError(error)
    throw error
  }
}

// Reset the chat session
export const resetChatSession = () => {
  chatSession = null
}

