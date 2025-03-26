"use client"

import { useState } from "react"
import "./feed.css"
import Navbar from "./Navbar"
import MarketUpdates from "./market-updates"
import Gamification from "./gamification"

function Feed({ onLogout, onPageChange }) {
  const [showGamification, setShowGamification] = useState(false)

  const posts = [
    {
      id: 1,
      author: "FinancewithSharan",
      avatar: "/images/avatar-sharan.jpg",
      verified: true,
      content:
        "The power of compound interest is truly remarkable. If you invest ₹10,000 monthly in an index fund with an average annual return of 12%, you'll have approximately ₹1 crore in just 20 years. Start early, stay consistent! #InvestingTips #CompoundInterest",
      image: "/images/compound-interest.jpg",
      likes: 542,
      comments: 48,
      shares: 126,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Warren Buffet",
      avatar: "/images/avatar-buffet.jpg",
      verified: true,
      content:
        "The best investment you can make is in yourself. Read at least 500 pages every day. That's how knowledge builds up, like compound interest. #SelfImprovement #Investing",
      likes: 1248,
      comments: 156,
      shares: 432,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      author: "FinancewithSharan",
      avatar: "/images/avatar-sharan.jpg",
      verified: true,
      content:
        "Investment tip: When evaluating a mutual fund, don't just look at past returns. Consider factors like expense ratio, fund manager experience, fund size, and consistency of performance across different market cycles. #MutualFunds #InvestmentAdvice",
      likes: 328,
      comments: 42,
      shares: 87,
      timestamp: "Yesterday",
    },
    {
      id: 4,
      author: "Warren Buffet",
      avatar: "/images/avatar-buffet.jpg",
      verified: true,
      content:
        "Be fearful when others are greedy, and greedy when others are fearful. The market is a device for transferring money from the impatient to the patient. #ValueInvesting #MarketWisdom",
      image: "/images/market-wisdom.jpg",
      likes: 2156,
      comments: 243,
      shares: 876,
      timestamp: "2 days ago",
    },
  ]

  const trending = ["#StockMarket", "#MutualFunds", "#FinancialFreedom", "#InvestingTips", "#TaxPlanning"]

  const accounts = [
    {
      name: "MoneyControl",
      handle: "@moneycontrol",
      avatar: "/images/avatar-moneycontrol.jpg",
      verified: false
    },
    {
      name: "SEBI",
      handle: "@SEBI_India",
      avatar: "/images/avatar-sebi.jpg",
      verified: true
    },
    {
      name: "Zerodha",
      handle: "@zerodhaonline",
      avatar: "/images/avatar-zerodha.jpg",
      verified: true
    },
  ]

  return (
    <div className="feed-page">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} />

      <div className="feed-container">
        <div className="feed-sidebar">
          <div className="sidebar-section">
            <h3>Trending Topics</h3>
            <ul className="trending-list">
              {trending.map((topic, index) => (
                <li key={index} className="trending-item">
                  <a href="#">{topic}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Suggested Accounts</h3>
            <ul className="accounts-list">
              {accounts.map((account, index) => (
                <li key={index} className="account-item">
                  <img src={account.avatar || "/placeholder.svg"} alt={account.name} className="account-avatar" />
                  <div className="account-info">
                    <span className="account-name">{account.name}{account.verified && <span className="verified-badge">✓</span>}</span>
                    <span className="account-handle">{account.handle}</span>
                  </div>
                  <button className="follow-button">Follow</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Your Achievements</h3>
            <div className="achievements-preview">
              <div className="streak-info">
                <span className="streak-icon">🔥</span>
                <span className="streak-text">5 day streak</span>
              </div>
              <button className="view-achievements-button" onClick={() => setShowGamification(!showGamification)}>
                {showGamification ? "Hide Achievements" : "View Achievements"}
              </button>
            </div>
          </div>
        </div>

        <div className="feed-main">
          {/* Market Updates Section */}
          <MarketUpdates />

          {/* Gamification Section (conditionally shown) */}
          {showGamification && <Gamification />}

          {/* Regular Posts */}
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <div className="post-author">
                  <img src={post.avatar || "/placeholder.svg"} alt={post.author} className="author-avatar" />
                  <div className="author-info">
                    <div className="author-name">
                      {post.author}
                      {post.verified && <span className="verified-badge">✓</span>}
                    </div>
                    <span className="post-time">{post.timestamp}</span>
                  </div>
                </div>
                <button className="more-options">•••</button>
              </div>

              <div className="post-content">
                <p className="post-text">{post.content}</p>
                {post.image && (
                  <div className="post-image">
                    <img src={post.image || "/placeholder.svg"} alt="Post attachment" />
                  </div>
                )}
              </div>

              <div className="post-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
                {post.shares && <span>{post.shares} shares</span>}
              </div>

              <div className="post-actions">
                <button className="action-button">
                  <span className="action-icon">👍</span>
                  <span>Like</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">💬</span>
                  <span>Comment</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">↗️</span>
                  <span>Share</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">🔖</span>
                  <span>Save</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="feed-right-sidebar">
          <div className="sidebar-section">
            <h3>Financial Calendar</h3>
            <div className="calendar-events">
              <div className="calendar-event">
                <div className="event-date">
                  <span className="event-day">31</span>
                  <span className="event-month">Jul</span>
                </div>
                <div className="event-info">
                  <span className="event-title">Tax Filing Deadline</span>
                  <span className="event-description">Last date for filing income tax returns</span>
                </div>
              </div>
              <div className="calendar-event">
                <div className="event-date">
                  <span className="event-day">15</span>
                  <span className="event-month">Aug</span>
                </div>
                <div className="event-info">
                  <span className="event-title">RBI Policy Meeting</span>
                  <span className="event-description">Monetary policy committee announcement</span>
                </div>
              </div>
              <div className="calendar-event">
                <div className="event-date">
                  <span className="event-day">30</span>
                  <span className="event-month">Sep</span>
                </div>
                <div className="event-info">
                  <span className="event-title">Quarterly Results</span>
                  <span className="event-description">Major companies Q2 results begin</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Investment Tip of the Day</h3>
            <div className="tip-of-day">
              <p>
                "Don't put all your eggs in one basket. Diversification is key to managing risk in your investment
                portfolio."
              </p>
              <span className="tip-author">- Peter Lynch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed

