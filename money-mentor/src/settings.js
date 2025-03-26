"use client"

import { useContext } from "react"
import "./settings.css"
import Navbar from "./Navbar"
import { ThemeContext } from "./ThemeContext"
import { LanguageContext, languages } from "./LanguageContext"

function Settings({ onLogout, onPageChange, currentPage }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const { language, setLanguage, translate } = useContext(LanguageContext)

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        <div className="settings-header">
          <h1>{translate("settings")}</h1>
          <p>{translate("manage_preferences")}</p>
        </div>

        <div className="settings-card">
          <div className="settings-section">
            <h2>{translate("appearance")}</h2>

            <div className="setting-item">
              <div className="setting-info">
                <h3>{translate("theme")}</h3>
                <p>{translate("theme_desc")}</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>{translate("language")}</h3>
                <p>{translate("language_desc")}</p>
              </div>
              <div className="setting-control">
                <select className="select-control" value={language} onChange={handleLanguageChange}>
                  <option value={languages.ENGLISH}>English</option>
                  <option value={languages.BENGALI}>বাংলা (Bengali)</option>
                  <option value={languages.HINDI}>हिंदी (Hindi)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2>{translate("account")}</h2>

            <div className="setting-item">
              <div className="setting-info">
                <h3>{translate("email_notifications")}</h3>
                <p>{translate("email_notifications_desc")}</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked={true} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>{translate("two_factor")}</h3>
                <p>{translate("two_factor_desc")}</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2>{translate("privacy")}</h2>

            <div className="setting-item">
              <div className="setting-info">
                <h3>{translate("profile_visibility")}</h3>
                <p>{translate("profile_visibility_desc")}</p>
              </div>
              <div className="setting-control">
                <select className="select-control">
                  <option>Everyone</option>
                  <option>Only Friends</option>
                  <option>Private</option>
                </select>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>{translate("data_sharing")}</h3>
                <p>{translate("data_sharing_desc")}</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked={true} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

