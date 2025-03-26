"use client"

import { useState, useRef, useEffect, useContext } from "react"
import "./Navbar.css"
import logo from "./logo192.png"
import { LanguageContext } from "./LanguageContext"

function Navbar({ onLogout, onPageChange, currentPage }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const dropdownRef = useRef(null)
  const { translate } = useContext(LanguageContext)

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleNavigation = (page) => {
    onPageChange(page)
    setShowMobileMenu(false)
    setShowDropdown(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="#" className="navbar-logo" onClick={() => handleNavigation("home")}>
            <img src={logo || "/placeholder.svg"} alt="MM Logo" />
            <span>MM</span>
          </a>
        </div>

        <div className={`navbar-center ${isMobile ? "mobile" : ""} ${showMobileMenu ? "show" : ""}`}>
          <a
            href="#"
            className={`nav-item ${currentPage === "learn" ? "active" : ""}`}
            onClick={() => handleNavigation("learn")}
          >
            {translate("learn")}
          </a>
          <a
            href="#"
            className={`nav-item ${currentPage === "roadmap" ? "active" : ""}`}
            onClick={() => handleNavigation("roadmap")}
          >
            {translate("roadmap")}
          </a>
          <a
            href="#"
            className={`nav-item ${currentPage === "simulation" ? "active" : ""}`}
            onClick={() => handleNavigation("simulation")}
          >
            Simulator
          </a>
          <a
            href="#"
            className={`nav-item ${currentPage === "paper-trading" ? "active" : ""}`}
            onClick={() => handleNavigation("paper-trading")}
          >
            Paper Trading
          </a>
          <a
            href="#"
            className={`nav-item ${currentPage === "chat" ? "active" : ""}`}
            onClick={() => handleNavigation("chat")}
          >
            {translate("ai_chat")}
          </a>
          <a
            href="#"
            className={`nav-item ${currentPage === "community" ? "active" : ""}`}
            onClick={() => handleNavigation("community")}
          >
            {translate("community")}
          </a>
          <a
            href="#"
            className={`nav-item ${currentPage === "feed" ? "active" : ""}`}
            onClick={() => handleNavigation("feed")}
          >
            {translate("feed")}
          </a>

          {isMobile && (
            <div className="mobile-profile">
              <a href="#" className="dropdown-item">
                {translate("profile")}
              </a>
              <a href="#" className="dropdown-item" onClick={() => handleNavigation("settings")}>
                {translate("settings_nav")}
              </a>
              <a href="#" className="dropdown-item" onClick={onLogout}>
                {translate("logout")}
              </a>
            </div>
          )}
        </div>

        <div className="navbar-right" ref={dropdownRef}>
          {isMobile ? (
            <button
              className={`mobile-menu-toggle ${showMobileMenu ? "active" : ""}`}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          ) : (
            <div className="profile-section">
              <div className="profile-circle" onClick={() => setShowDropdown(!showDropdown)}>
                <span>U</span>
              </div>

              {showDropdown && (
                <div className="dropdown-menu">
                  <a href="#" className="dropdown-item">
                    {translate("profile")}
                  </a>
                  <a href="#" className="dropdown-item" onClick={() => handleNavigation("settings")}>
                    {translate("settings_nav")}
                  </a>
                  <a href="#" className="dropdown-item" onClick={onLogout}>
                    {translate("logout")}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

