import { GoogleGenerativeAI } from "@google/generative-ai"
const apiKey = process.env.REACT_APP_API_KEY;
// Initialize the Google Generative AI with the API key from config
const genAI = new GoogleGenerativeAI(apiKey)

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
      model: "gemini-2.0-flash",
      systemInstruction: "You are an AI guide for an website called money mentor. Your job is to promote financial literacy, give financial tips and explain financial concepts to users. Use simple friendly languange and explain everything with a personal tone. Our website also had sections to learn which has videos and articles and books for the user, It has a community feed to ask doubts and stay updated, it has feed section where financial experts post tips and update market trends. If the user wants to talk about any other topic other than finances and related ecomonics, decline politely. Do give investment tips and suggest tips based on current market. Be a financial and investment advisor",
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

