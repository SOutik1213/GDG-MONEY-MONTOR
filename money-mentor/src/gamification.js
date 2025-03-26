"use client"

import { useState } from "react"
import "./gamification.css"

// Static data for badges and achievements
const badgesData = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first learning module",
    icon: "🏆",
    category: "Learning",
    earned: true,
    earnedDate: "2023-07-15",
  },
  {
    id: 2,
    name: "Knowledge Seeker",
    description: "Complete 5 learning modules",
    icon: "📚",
    category: "Learning",
    earned: true,
    earnedDate: "2023-08-02",
  },
  {
    id: 3,
    name: "Investment Guru",
    description: "Complete all basic investment modules",
    icon: "🧠",
    category: "Learning",
    earned: false,
  },
  {
    id: 4,
    name: "Community Contributor",
    description: "Make 5 posts in the community forum",
    icon: "👥",
    category: "Community",
    earned: true,
    earnedDate: "2023-07-28",
  },
  {
    id: 5,
    name: "Helpful Hand",
    description: "Answer 10 questions in the community",
    icon: "🤝",
    category: "Community",
    earned: false,
  },
  {
    id: 6,
    name: "Market Watcher",
    description: "Check market updates for 7 consecutive days",
    icon: "📈",
    category: "Engagement",
    earned: false,
  },
  {
    id: 7,
    name: "Paper Trader",
    description: "Make your first paper trade",
    icon: "💰",
    category: "Trading",
    earned: true,
    earnedDate: "2023-08-10",
  },
  {
    id: 8,
    name: "Diversification Master",
    description: "Create a portfolio with at least 5 different assets",
    icon: "🔄",
    category: "Trading",
    earned: false,
  },
]

// User stats data
const userStatsData = {
  points: 750,
  level: 3,
  nextLevelPoints: 1000,
  streak: 5,
  longestStreak: 12,
  completedModules: 8,
  totalModules: 20,
  communityPosts: 7,
  paperTrades: 12,
}

function Gamification() {
  const [badges, setBadges] = useState(badgesData)
  const [userStats, setUserStats] = useState(userStatsData)
  const [activeCategory, setActiveCategory] = useState("All")
  const [showBadgeDetails, setShowBadgeDetails] = useState(null)

  // Filter badges by category
  const filteredBadges = activeCategory === "All" ? badges : badges.filter((badge) => badge.category === activeCategory)

  // Get unique categories
  const categories = ["All", ...new Set(badges.map((badge) => badge.category))]

  // Calculate progress percentage
  const progressPercentage = (userStats.points / userStats.nextLevelPoints) * 100

  return (
    <div className="gamification-container">
      <div className="gamification-header">
        <h2>Your Achievements</h2>
        <div className="user-level">
          <div className="level-badge">Level {userStats.level}</div>
        </div>
      </div>

      <div className="user-stats-container">
        <div className="user-stats-card">
          <div className="stats-header">
            <h3>Your Progress</h3>
          </div>
          <div className="stats-content">
            <div className="level-progress">
              <div className="progress-text">
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <div className="stat-value">{userStats.streak} days</div>
                  <div className="stat-label">Current Streak</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <div className="stat-value">{userStats.longestStreak} days</div>
                  <div className="stat-label">Longest Streak</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <div className="stat-value">
                    {userStats.completedModules}/{userStats.totalModules}
                  </div>
                  <div className="stat-label">Modules Completed</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">💬</div>
                <div className="stat-info">
                  <div className="stat-value">{userStats.communityPosts}</div>
                  <div className="stat-label">Community Posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="badges-container">
        <div className="badges-header">
          <h3>Badges & Achievements</h3>
          <div className="badges-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-button ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="badges-grid">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              className={`badge-card ${badge.earned ? "earned" : "locked"}`}
              onClick={() => setShowBadgeDetails(badge)}
            >
              <div className="badge-icon">{badge.icon}</div>
              <div className="badge-info">
                <div className="badge-name">{badge.name}</div>
                <div className="badge-status">
                  {badge.earned ? (
                    <span className="earned-status">Earned</span>
                  ) : (
                    <span className="locked-status">Locked</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showBadgeDetails && (
        <div className="badge-details-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowBadgeDetails(null)}>
              &times;
            </button>

            <div className="badge-details">
              <div className="badge-icon-large">{showBadgeDetails.icon}</div>
              <h3 className="badge-title">{showBadgeDetails.name}</h3>
              <div className="badge-category">{showBadgeDetails.category}</div>
              <p className="badge-description">{showBadgeDetails.description}</p>

              {showBadgeDetails.earned ? (
                <div className="earned-info">
                  <div className="earned-badge">Earned</div>
                  <div className="earned-date">on {new Date(showBadgeDetails.earnedDate).toLocaleDateString()}</div>
                </div>
              ) : (
                <div className="locked-info">
                  <div className="locked-badge">Not Yet Earned</div>
                  <p className="locked-hint">Complete the required actions to earn this badge!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gamification

