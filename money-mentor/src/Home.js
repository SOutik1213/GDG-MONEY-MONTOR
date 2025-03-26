"use client"
import { useContext } from "react"
import "./home.css"
import Navbar from "./Navbar"
import { LanguageContext } from "./LanguageContext"

function Home({ onLogout, onPageChange, currentPage }) {
  const { translate } = useContext(LanguageContext)

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        <div className="welcome-section">
          <h1>{translate("welcome")}</h1>
          <p>{translate("tagline")}</p>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <h2>{translate("learning_progress")}</h2>
            </div>
            <div className="card-content">
              <div className="progress-overview">
                <div className="circular-progress">
                  <svg width="100" height="100" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#667eea"
                      strokeWidth="12"
                      strokeDasharray="339.3"
                      strokeDashoffset="135.7"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="progress-text">60%</div>
                </div>
                <div className="progress-details">
                  <p>You're making great progress!</p>
                  <p>3 of 5 modules completed</p>
                </div>
              </div>
              <div className="module-list">
                <div className="module-item completed">
                  <span className="module-name">Basics of Investing</span>
                  <span className="module-status">Completed</span>
                </div>
                <div className="module-item completed">
                  <span className="module-name">Understanding Stocks</span>
                  <span className="module-status">Completed</span>
                </div>
                <div className="module-item completed">
                  <span className="module-name">Mutual Funds 101</span>
                  <span className="module-status">Completed</span>
                </div>
                <div className="module-item">
                  <span className="module-name">Risk Management</span>
                  <span className="module-status">Not Started</span>
                </div>
                <div className="module-item">
                  <span className="module-name">Tax Planning</span>
                  <span className="module-status">Not Started</span>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => onPageChange("learn")}>
                {translate("continue_learning")}
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>{translate("notifications")}</h2>
            </div>
            <div className="card-content">
              <div className="notification-list">
                <div className="notification-item unread">
                  <div className="notification-icon">
                    <span className="icon-circle blue">📊</span>
                  </div>
                  <div className="notification-content">
                    <p className="notification-text">New market insights available for your portfolio</p>
                    <span className="notification-time">2 hours ago</span>
                  </div>
                </div>
                <div className="notification-item unread">
                  <div className="notification-icon">
                    <span className="icon-circle green">📚</span>
                  </div>
                  <div className="notification-content">
                    <p className="notification-text">New lesson on "Diversification Strategies" is now available</p>
                    <span className="notification-time">Yesterday</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon">
                    <span className="icon-circle purple">🏆</span>
                  </div>
                  <div className="notification-content">
                    <p className="notification-text">You've completed the "Mutual Funds 101" module!</p>
                    <span className="notification-time">3 days ago</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon">
                    <span className="icon-circle orange">📈</span>
                  </div>
                  <div className="notification-content">
                    <p className="notification-text">Market alert: Sensex up by 2.5% today</p>
                    <span className="notification-time">5 days ago</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-outline">{translate("view_all")}</button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>{translate("hot_topics")}</h2>
            </div>
            <div className="card-content">
              <div className="topics-list">
                <div className="topic-item">
                  <div className="topic-header">
                    <h3>Budget 2023: Impact on Investors</h3>
                    <span className="topic-tag">Trending</span>
                  </div>
                  <p className="topic-description">
                    Learn how the latest budget announcements affect your investment strategy and tax planning.
                  </p>
                  <a href="#" className="topic-link">
                    Read More
                  </a>
                </div>
                <div className="topic-item">
                  <div className="topic-header">
                    <h3>Cryptocurrency Regulations in India</h3>
                    <span className="topic-tag">Hot</span>
                  </div>
                  <p className="topic-description">
                    Stay updated on the evolving regulatory landscape for cryptocurrencies in India.
                  </p>
                  <a href="#" className="topic-link">
                    Read More
                  </a>
                </div>
                <div className="topic-item">
                  <div className="topic-header">
                    <h3>Small Cap vs. Large Cap: Which is Right for You?</h3>
                  </div>
                  <p className="topic-description">
                    Understanding the differences and making informed decisions based on your risk profile.
                  </p>
                  <a href="#" className="topic-link">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>{translate("daily_quiz")}</h2>
            </div>
            <div className="card-content">
              <div className="quiz-container">
                <h3 className="quiz-question">What is the primary advantage of investing in index funds?</h3>
                <div className="quiz-options">
                  <div className="quiz-option">
                    <input type="radio" id="option1" name="quiz" />
                    <label htmlFor="option1">Higher returns than actively managed funds</label>
                  </div>
                  <div className="quiz-option">
                    <input type="radio" id="option2" name="quiz" />
                    <label htmlFor="option2">Lower expense ratios and broader market exposure</label>
                  </div>
                  <div className="quiz-option">
                    <input type="radio" id="option3" name="quiz" />
                    <label htmlFor="option3">Guaranteed returns regardless of market conditions</label>
                  </div>
                  <div className="quiz-option">
                    <input type="radio" id="option4" name="quiz" />
                    <label htmlFor="option4">Protection against market volatility</label>
                  </div>
                </div>
                <button className="btn btn-primary">Submit Answer</button>
                <div className="quiz-stats">
                  <span>Daily streak: 3 days</span>
                  <span>Points earned: 450</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

