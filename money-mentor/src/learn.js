"use client"

import { useContext } from "react"
import "./learn.css"
import Navbar from "./Navbar"
import { LanguageContext } from "./LanguageContext"

function Learn({ onLogout, onPageChange, currentPage }) {
  const { translate } = useContext(LanguageContext)

  const videos = [
    {
      id: 1,
      url: "https://youtu.be/qIw-yFC-HNU?si=sVgoFi5q-uPHXPlt",
      thumbnail: "https://i.ytimg.com/vi/qIw-yFC-HNU/maxresdefault.jpg",
      duration: "15:24",
      category: "Beginner",
      description: "Learn the fundamentals of stock market investing for beginners.",
    },
    {
      id: 2,
      url: "https://youtu.be/p7HKvqRI_Bo?si=G2MDGBBaNL1bm1Bi",
      thumbnail: "https://i.ytimg.com/vi/p7HKvqRI_Bo/maxresdefault.jpg",
      duration: "12:45",
      category: "Beginner",
      description: "A comprehensive guide to investing in mutual funds for beginners.",
    },
    {
      id: 3,
      url: "https://youtu.be/tHxwyWnNu0c?si=WvuhXrAZ1b88mAc4",
      thumbnail: "https://i.ytimg.com/vi/tHxwyWnNu0c/maxresdefault.jpg",
      duration: "10:18",
      category: "Intermediate",
      description: "Learn how SIPs work and why they're a great investment strategy.",
    },
    {
      id: 4,
      url: "https://youtu.be/HNPbY6fSeo8?si=dlK79EJCYgV7cFVV",
      thumbnail: "https://i.ytimg.com/vi/HNPbY6fSeo8/maxresdefault.jpg",
      duration: "18:32",
      category: "Intermediate",
      description: "Discover the best tax-saving investment options available in India.",
    },
  ]

  const articles = [
    {
      id: 1,
      title: "10 Investment Principles for Beginners",
      source: "Financial Express",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "Beginner",
      link: "#",
    },
    {
      id: 2,
      title: "Understanding P/E Ratio and Other Valuation Metrics",
      source: "Economic Times",
      date: "June 3, 2023",
      readTime: "12 min read",
      category: "Intermediate",
      link: "#",
    },
    {
      id: 3,
      title: "How to Build a Diversified Portfolio",
      source: "Mint",
      date: "July 22, 2023",
      readTime: "10 min read",
      category: "Beginner",
      link: "#",
    },
    {
      id: 4,
      title: "Understanding Debt Funds: Types and Benefits",
      source: "Business Standard",
      date: "August 10, 2023",
      readTime: "15 min read",
      category: "Intermediate",
      link: "#",
    },
  ]

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        <div className="learn-header">
          <h1>{translate("learn")}</h1>
          <p>Enhance your financial literacy with these curated videos and articles</p>
        </div>

        <div className="learning-tabs">
          <button className="tab-button active">All Resources</button>
          <button className="tab-button">Videos</button>
          <button className="tab-button">Articles</button>
          <button className="tab-button">Beginner</button>
          <button className="tab-button">Intermediate</button>
          <button className="tab-button">Advanced</button>
        </div>

        <section className="learn-section">
          <div className="section-header">
            <h2>Educational Videos</h2>
            <a href="#" className="view-all">
              {translate("view_all")}
            </a>
          </div>

          <div className="video-grid">
            {videos.map((video) => (
              <div className="video-card" key={video.id}>
                <div className="video-thumbnail">
                  <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} />
                  <span className="video-duration">{video.duration}</span>
                  <span className="video-category">{video.category}</span>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    Watch Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="learn-section">
          <div className="section-header">
            <h2>Recommended Articles</h2>
            <a href="#" className="view-all">
              {translate("view_all")}
            </a>
          </div>

          <div className="article-grid">
            {articles.map((article) => (
              <div className="article-card" key={article.id}>
                <div className="article-category">{article.category}</div>
                <h3 className="article-title">{article.title}</h3>
                <div className="article-meta">
                  <span className="article-source">{article.source}</span>
                  <span className="article-date">{article.date}</span>
                  <span className="article-read-time">{article.readTime}</span>
                </div>
                <a href={article.link} className="btn btn-outline btn-sm">
                  Read Article
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="learn-section">
          <div className="section-header">
            <h2>Your Learning Path</h2>
          </div>

          <div className="path-progress">
            <div className="path-track">
              <div className="path-completed" style={{ width: "40%" }}></div>
            </div>
            <div className="path-stats">
              <span>40% Complete</span>
              <span>4/10 Modules</span>
            </div>
          </div>

          <div className="path-modules">
            <div className="module-card completed">
              <div className="module-number">1</div>
              <div className="module-content">
                <h3>Introduction to Investing</h3>
                <p>Learn the basics of investing and why it's important</p>
                <span className="module-status">Completed</span>
              </div>
            </div>

            <div className="module-card completed">
              <div className="module-number">2</div>
              <div className="module-content">
                <h3>Understanding Risk and Return</h3>
                <p>Learn about different types of risks and expected returns</p>
                <span className="module-status">Completed</span>
              </div>
            </div>

            <div className="module-card completed">
              <div className="module-number">3</div>
              <div className="module-content">
                <h3>Asset Allocation</h3>
                <p>Learn how to distribute your investments across asset classes</p>
                <span className="module-status">Completed</span>
              </div>
            </div>

            <div className="module-card completed">
              <div className="module-number">4</div>
              <div className="module-content">
                <h3>Stock Market Basics</h3>
                <p>Learn how the stock market works and how to invest in stocks</p>
                <span className="module-status">Completed</span>
              </div>
            </div>

            <div className="module-card current">
              <div className="module-number">5</div>
              <div className="module-content">
                <h3>Mutual Funds</h3>
                <p>Learn about different types of mutual funds and how to invest in them</p>
                <span className="module-status">In Progress</span>
              </div>
            </div>

            <div className="module-card">
              <div className="module-number">6</div>
              <div className="module-content">
                <h3>Bonds and Fixed Income</h3>
                <p>Learn about bonds, fixed deposits, and other debt instruments</p>
                <span className="module-status">Locked</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Learn


