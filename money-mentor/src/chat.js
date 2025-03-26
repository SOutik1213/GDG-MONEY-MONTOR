"use client"

import { useState, useRef, useEffect, useContext } from "react"
import "./chat.css"
import Navbar from "./Navbar"
import { sendMessageStream, resetChatSession } from "./utils/gemini-api"
import { LanguageContext } from "./LanguageContext"

function Chat({ onLogout, onPageChange }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI financial assistant. How can I help you with your investment questions today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [apiKeyError, setApiKeyError] = useState("")
  const messagesEndRef = useRef(null)
  const { translate } = useContext(LanguageContext)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Reset chat session when component mounts
  useEffect(() => {
    resetChatSession()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setApiKeyError("")

    // Create a placeholder for the AI response
    const aiMessageId = messages.length + 2
    const aiMessagePlaceholder = {
      id: aiMessageId,
      text: "",
      sender: "ai",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, aiMessagePlaceholder])

    try {
      // Send the message to the chat session with streaming simulation
      await sendMessageStream(
        input,
        (chunk, accumulatedText) => {
          // Update the AI message with the accumulated text
          setMessages((prev) => prev.map((msg) => (msg.id === aiMessageId ? { ...msg, text: accumulatedText } : msg)))
        },
        (finalResponse) => {
          // Complete the response
          setIsTyping(false)
        },
        (error) => {
          // Handle error
          setApiKeyError(error.message)
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId
                ? {
                    ...msg,
                    text: "Sorry, I encountered an error. Please try again later.",
                  }
                : msg,
            ),
          )
          setIsTyping(false)
        },
      )
    } catch (error) {
      console.error("Error calling Google AI:", error)
      setApiKeyError(error.message)
      setIsTyping(false)
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleResetChat = () => {
    resetChatSession()
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI financial assistant. How can I help you with your investment questions today?",
        sender: "ai",
        timestamp: new Date().toISOString(),
      },
    ])
    setApiKeyError("")
  }

  return (
    <div className="chat-page">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} />

      <div className="chat-container">
        <div className="chat-main">
          {apiKeyError && (
            <div className="api-key-error-banner">
              <p>{apiKeyError}</p>
              <div className="error-actions">
                <button onClick={handleResetChat}>Reset Chat</button>
                <button onClick={() => window.location.reload()}>Reload Page</button>
              </div>
            </div>
          )}

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender === "user" ? "user-message" : "ai-message"}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{formatTimestamp(message.timestamp)}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message ai-message">
                <div className="message-content typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about investing, financial planning, or market trends..."
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat

