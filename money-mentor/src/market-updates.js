"use client"

import { useState, useEffect } from "react"
import "./market-updates.css"

// Static market data for MVP
const marketData = {
  indices: [
    { name: "Sensex", value: "72,568.45", change: "+1.2%", status: "up" },
    { name: "Nifty 50", value: "21,894.55", change: "+0.9%", status: "up" },
    { name: "Nifty Bank", value: "46,782.30", change: "-0.3%", status: "down" },
    { name: "Nifty IT", value: "37,456.20", change: "+2.1%", status: "up" },
  ],
  topGainers: [
    { symbol: "INFY", name: "Infosys Ltd.", price: "1,845.75", change: "+3.8%", volume: "2.4M" },
    { symbol: "TCS", name: "Tata Consultancy Services", price: "3,756.20", change: "+2.9%", volume: "1.8M" },
    { symbol: "RELIANCE", name: "Reliance Industries", price: "2,934.50", change: "+2.5%", volume: "3.2M" },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: "1,678.90", change: "+2.2%", volume: "4.1M" },
  ],
  topLosers: [
    { symbol: "BHARTIARTL", name: "Bharti Airtel", price: "945.30", change: "-2.1%", volume: "1.9M" },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: "987.45", change: "-1.8%", volume: "2.7M" },
    { symbol: "SBIN", name: "State Bank of India", price: "624.80", change: "-1.5%", volume: "3.5M" },
    { symbol: "AXISBANK", name: "Axis Bank", price: "1,045.60", change: "-1.2%", volume: "2.2M" },
  ],
  news: [
    {
      id: 1,
      title: "RBI Keeps Repo Rate Unchanged at 6.5%",
      summary:
        "The Reserve Bank of India's Monetary Policy Committee has decided to keep the repo rate unchanged at 6.5% for the sixth consecutive time.",
      source: "Economic Times",
      time: "2 hours ago",
      category: "Policy",
    },
    {
      id: 2,
      title: "IT Stocks Rally on Strong US Tech Earnings",
      summary:
        "Indian IT stocks saw a significant rally today following strong earnings reports from major US technology companies.",
      source: "Mint",
      time: "4 hours ago",
      category: "Stocks",
    },
    {
      id: 3,
      title: "Government Announces New PLI Scheme for Electronics Manufacturing",
      summary:
        "The government has announced a new Production Linked Incentive (PLI) scheme worth ₹10,000 crore for electronics manufacturing.",
      source: "Business Standard",
      time: "6 hours ago",
      category: "Policy",
    },
    {
      id: 4,
      title: "FIIs Turn Net Buyers After Three Months of Selling",
      summary:
        "Foreign Institutional Investors (FIIs) have turned net buyers in the Indian equity market after three consecutive months of selling.",
      source: "Financial Express",
      time: "8 hours ago",
      category: "Market",
    },
  ],
  marketSentiment: {
    overall: "Bullish",
    sentimentScore: 65, // 0-100 scale
    sectorSentiment: [
      { sector: "IT", sentiment: "Very Bullish", score: 85 },
      { sector: "Banking", sentiment: "Neutral", score: 50 },
      { sector: "Pharma", sentiment: "Bullish", score: 70 },
      { sector: "Auto", sentiment: "Bearish", score: 35 },
    ],
  },
}

function MarketUpdates() {
  const [marketUpdates, setMarketUpdates] = useState(marketData)
  const [activeTab, setActiveTab] = useState("overview")

  // In a real implementation, this would fetch data from an API
  useEffect(() => {
    // Simulate API call with static data
    setMarketUpdates(marketData)
  }, [])

  // Get sentiment color based on score
  const getSentimentColor = (score) => {
    if (score >= 70) return "very-bullish"
    if (score >= 60) return "bullish"
    if (score >= 40) return "neutral"
    if (score >= 30) return "bearish"
    return "very-bearish"
  }

  return (
    <div className="market-updates-container">
      <div className="market-updates-header">
        <h2>Market Updates</h2>
        <div className="market-date">
          <span>Last updated: Today, 3:30 PM IST</span>
        </div>
      </div>

      <div className="market-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === "stocks" ? "active" : ""}`}
          onClick={() => setActiveTab("stocks")}
        >
          Top Stocks
        </button>
        <button className={`tab-button ${activeTab === "news" ? "active" : ""}`} onClick={() => setActiveTab("news")}>
          News
        </button>
        <button
          className={`tab-button ${activeTab === "sentiment" ? "active" : ""}`}
          onClick={() => setActiveTab("sentiment")}
        >
          Sentiment
        </button>
      </div>

      <div className="market-content">
        {activeTab === "overview" && (
          <div className="market-overview">
            <div className="indices-grid">
              {marketUpdates.indices.map((index, i) => (
                <div key={i} className="index-card">
                  <div className="index-name">{index.name}</div>
                  <div className="index-value">{index.value}</div>
                  <div className={`index-change ${index.status}`}>{index.change}</div>
                </div>
              ))}
            </div>

            <div className="market-sentiment-overview">
              <div className="sentiment-header">
                <h3>Market Sentiment</h3>
                <div className={`sentiment-badge ${getSentimentColor(marketUpdates.marketSentiment.sentimentScore)}`}>
                  {marketUpdates.marketSentiment.overall}
                </div>
              </div>

              <div className="sentiment-meter">
                <div className="sentiment-scale">
                  <div className="scale-marker very-bearish">Very Bearish</div>
                  <div className="scale-marker bearish">Bearish</div>
                  <div className="scale-marker neutral">Neutral</div>
                  <div className="scale-marker bullish">Bullish</div>
                  <div className="scale-marker very-bullish">Very Bullish</div>
                </div>
                <div className="sentiment-bar">
                  <div
                    className="sentiment-indicator"
                    style={{ left: `${marketUpdates.marketSentiment.sentimentScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="latest-news">
              <h3>Latest News</h3>
              <div className="news-item">
                <div className="news-title">{marketUpdates.news[0].title}</div>
                <div className="news-meta">
                  <span className="news-source">{marketUpdates.news[0].source}</span>
                  <span className="news-time">{marketUpdates.news[0].time}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "stocks" && (
          <div className="market-stocks">
            <div className="stocks-section">
              <h3>Top Gainers</h3>
              <div className="stocks-table">
                <div className="table-header">
                  <div className="col-symbol">Symbol</div>
                  <div className="col-name">Name</div>
                  <div className="col-price">Price</div>
                  <div className="col-change">Change</div>
                  <div className="col-volume">Volume</div>
                </div>
                {marketUpdates.topGainers.map((stock, i) => (
                  <div key={i} className="table-row">
                    <div className="col-symbol">{stock.symbol}</div>
                    <div className="col-name">{stock.name}</div>
                    <div className="col-price">{stock.price}</div>
                    <div className="col-change up">{stock.change}</div>
                    <div className="col-volume">{stock.volume}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stocks-section">
              <h3>Top Losers</h3>
              <div className="stocks-table">
                <div className="table-header">
                  <div className="col-symbol">Symbol</div>
                  <div className="col-name">Name</div>
                  <div className="col-price">Price</div>
                  <div className="col-change">Change</div>
                  <div className="col-volume">Volume</div>
                </div>
                {marketUpdates.topLosers.map((stock, i) => (
                  <div key={i} className="table-row">
                    <div className="col-symbol">{stock.symbol}</div>
                    <div className="col-name">{stock.name}</div>
                    <div className="col-price">{stock.price}</div>
                    <div className="col-change down">{stock.change}</div>
                    <div className="col-volume">{stock.volume}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "news" && (
          <div className="market-news">
            {marketUpdates.news.map((item) => (
              <div key={item.id} className="news-card">
                <div className="news-category">{item.category}</div>
                <h3 className="news-headline">{item.title}</h3>
                <p className="news-summary">{item.summary}</p>
                <div className="news-footer">
                  <span className="news-source">{item.source}</span>
                  <span className="news-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "sentiment" && (
          <div className="market-sentiment-detail">
            <div className="sentiment-overview">
              <div className="sentiment-score-card">
                <div className="score-label">Overall Market Sentiment</div>
                <div className={`score-value ${getSentimentColor(marketUpdates.marketSentiment.sentimentScore)}`}>
                  {marketUpdates.marketSentiment.overall}
                </div>
                <div className="score-number">{marketUpdates.marketSentiment.sentimentScore}/100</div>
              </div>

              <div className="sentiment-description">
                <p>
                  The market sentiment is currently{" "}
                  <strong>{marketUpdates.marketSentiment.overall.toLowerCase()}</strong>, indicating a generally
                  positive outlook among investors. This sentiment is based on various factors including trading
                  volumes, price movements, and investor behavior.
                </p>
              </div>
            </div>

            <div className="sector-sentiment">
              <h3>Sector-wise Sentiment</h3>
              <div className="sector-grid">
                {marketUpdates.marketSentiment.sectorSentiment.map((sector, i) => (
                  <div key={i} className="sector-card">
                    <div className="sector-name">{sector.sector}</div>
                    <div className={`sector-sentiment ${getSentimentColor(sector.score)}`}>{sector.sentiment}</div>
                    <div className="sentiment-bar-small">
                      <div
                        className="sentiment-fill"
                        style={{
                          width: `${sector.score}%`,
                          backgroundColor: sector.score >= 60 ? "#4caf50" : sector.score >= 40 ? "#ff9800" : "#f44336",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarketUpdates

