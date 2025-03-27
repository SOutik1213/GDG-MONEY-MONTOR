// src/Login.js
import { useState } from "react";
import { loginUser, registerUser } from "./firebase/auth";
import "./Login.css";
import logo from "./logo513.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      
      if (isSignup) {
        // Register new user
        result = await registerUser(email, password);
      } else {
        // Login existing user
        result = await loginUser(email, password);
      }

      if (result.success) {
        onLogin();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Authentication failed. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

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

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isSignup ? "Already have an account?" : "Not a member?"}{" "}
            <span className="signup-link" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;