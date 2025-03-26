"use client"

import { useState } from "react"
import "../styles/ApiKeyModal.css"
import { storeApiKey } from "../utils/gemini-api"

function ApiKeyModal({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState("")
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!apiKey.trim()) {
      setError("Please enter a valid API key")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      // Store the API key
      storeApiKey(apiKey)

      // Call the onSave callback
      if (onSave) {
        onSave(apiKey)
      }

      // Close the modal
      onClose()
    } catch (error) {
      setError("Failed to save API key: " + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="api-key-modal-overlay">
      <div className="api-key-modal">
        <div className="api-key-modal-header">
          <h2>Enter Gemini API Key</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="api-key-modal-content">
          <p>
            To use the AI chat feature, you need to provide your Gemini API key. You can get one from the{" "}
            <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
              Google AI Studio
            </a>
            .
          </p>

          {error && <div className="api-key-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="api-key">API Key</label>
              <input
                type="text"
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
              <button type="submit" className="submit-button" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save API Key"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyModal

