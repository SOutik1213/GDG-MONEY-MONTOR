// src/App.js
"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "./ThemeContext"
import { LanguageProvider } from "./LanguageContext"
import { auth } from "./firebase/firebase"
import { onAuthStateChanged } from "./firebase/auth"
import Login from "./Login"
import Home from "./Home"
import Learn from "./learn"
import Chat from "./chat"
import Community from "./community"
import Feed from "./feed"
import Settings from "./settings"
import Simulation from "./simulation"
import Roadmap from "./roadmap"
import PaperTrading from "./paper-trading"
import "./index.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState("home")

  // Check authentication state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
      setLoading(false)
    });
    
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage("home")
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setIsLoggedIn(false)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      case "learn":
        return <Learn onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      case "chat":
        return <Chat onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      case "community":
        return <Community onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      case "feed":
        return <Feed onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      case "settings":
        return <Settings onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      case "simulation":
        return <Simulation onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      case "roadmap":
        return <Roadmap onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      case "paper-trading":
        return <PaperTrading onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
      default:
        return <Home onLogout={handleLogout} onPageChange={handlePageChange} currentPage={currentPage} />
    }
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App">{isLoggedIn ? renderPage() : <Login onLogin={handleLogin} />}</div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App