"use client"

import { useState } from "react"
import "./Login.css"
import logo from "./logo513.png"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if the credentials match
    if (email === "user@email.com" && password === "admin") {
      onLogin()
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo || "/placeholder.svg"} className="login-logo" alt="logo" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Not a member? <span className="signup-link">Sign up</span>
          </p>
          <p>

            This is a MVP for GDG Solutions challenge. We do not have a database to store users and give a personalized experience yet. 
            This is a concept MVP yet to be completely functional. 
            Use "user@email.com" as email and "admin" as password to login.
            PS: Try out our personalized AI chat powered by Gemini 2.0 :)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

