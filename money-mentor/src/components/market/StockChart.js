"use client"

import { useState, useEffect } from "react"
import "./StockChart.css"

function StockChart({ stockData, historyData, timeframe = "1D" }) {
  const [chartData, setChartData] = useState([])
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)

  useEffect(() => {
    if (historyData && historyData.length > 0) {
      // Filter data based on selected timeframe
      let filteredData = [...historyData]

      if (selectedTimeframe === "1D") {
        // Use only today's data with hourly intervals
        filteredData = filteredData.slice(0, 8) // Assuming 8 hours of trading
      } else if (selectedTimeframe === "1W") {
        // Use last 5 days data
        filteredData = filteredData.slice(0, 5)
      } else if (selectedTimeframe === "1M") {
        // Use last 30 days data
        filteredData = filteredData.slice(0, 30)
      } else if (selectedTimeframe === "3M") {
        // Use last 90 days data
        filteredData = filteredData.slice(0, 90)
      } else if (selectedTimeframe === "1Y") {
        // Use all available data up to 1 year
        filteredData = filteredData.slice(0, 252) // ~252 trading days in a year
      }

      setChartData(filteredData)
    }
  }, [historyData, selectedTimeframe])

  // If no history data is available, create simulated data
  useEffect(() => {
    if (!historyData || historyData.length === 0) {
      const simulatedData = generateSimulatedData(stockData, selectedTimeframe)
      setChartData(simulatedData)
    }
  }, [stockData, historyData, selectedTimeframe])

  // Generate simulated price history data for demo purposes
  const generateSimulatedData = (stock, timeframe) => {
    if (!stock) return []

    const currentPrice = stock.price
    const volatility = stock.volatility || 1.5
    const data = []

    let numPoints
    let startPrice

    switch (timeframe) {
      case "1D":
        numPoints = 8 // 8 hours
        startPrice = currentPrice * (1 - Math.random() * 0.02) // Start up to 2% lower
        break
      case "1W":
        numPoints = 5 // 5 days
        startPrice = currentPrice * (1 - Math.random() * 0.05) // Start up to 5% lower
        break
      case "1M":
        numPoints = 30 // 30 days
        startPrice = currentPrice * (1 - Math.random() * 0.1) // Start up to 10% lower
        break
      case "3M":
        numPoints = 90 // 90 days
        startPrice = currentPrice * (1 - Math.random() * 0.15) // Start up to 15% lower
        break
      case "1Y":
        numPoints = 252 // ~252 trading days
        startPrice = currentPrice * (1 - Math.random() * 0.25) // Start up to 25% lower
        break
      default:
        numPoints = 30
        startPrice = currentPrice * (1 - Math.random() * 0.1)
    }

    let price = startPrice
    const now = new Date()

    for (let i = numPoints - 1; i >= 0; i--) {
      const date = new Date()

      if (timeframe === "1D") {
        // For 1D, set hours back
        date.setHours(now.getHours() - i)
      } else {
        // For other timeframes, set days back
        date.setDate(now.getDate() - i)
      }

      // Random price movement based on volatility
      const change = (Math.random() - 0.5) * volatility
      if (i !== numPoints - 1) {
        // Not the first point
        price = price * (1 + change / 100)
      }

      // Ensure price trends toward current price as we approach the end
      const distanceToEnd = i / numPoints
      price = price * (1 - distanceToEnd) + startPrice * distanceToEnd

      // For the last point, use the current price
      if (i === 0) {
        price = currentPrice
      }

      data.push({
        date: date.toISOString(),
        price: Number.parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 500000,
      })
    }

    return data
  }

  // Calculate chart dimensions and scaling
  const chartWidth = 800
  const chartHeight = 300
  const padding = { top: 20, right: 30, bottom: 30, left: 50 }

  // Find min and max values for scaling
  const priceValues = chartData.map((d) => d.price)
  const minPrice = Math.min(...priceValues) * 0.995 // Add 0.5% padding
  const maxPrice = Math.max(...priceValues) * 1.005 // Add 0.5% padding

  // Create SVG path for price line
  const createPricePath = () => {
    if (chartData.length === 0) return ""

    const availableWidth = chartWidth - padding.left - padding.right
    const availableHeight = chartHeight - padding.top - padding.bottom

    return chartData
      .map((point, index) => {
        const x = padding.left + (index * availableWidth) / (chartData.length - 1)
        const y = chartHeight - padding.bottom - ((point.price - minPrice) / (maxPrice - minPrice)) * availableHeight
        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }

  // Create SVG path for area under the price line
  const createAreaPath = () => {
    if (chartData.length === 0) return ""

    const availableWidth = chartWidth - padding.left - padding.right
    const availableHeight = chartHeight - padding.top - padding.bottom

    let path = chartData
      .map((point, index) => {
        const x = padding.left + (index * availableWidth) / (chartData.length - 1)
        const y = chartHeight - padding.bottom - ((point.price - minPrice) / (maxPrice - minPrice)) * availableHeight
        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")

    // Complete the path by drawing to the bottom right and bottom left corners
    const lastIndex = chartData.length - 1
    const lastX = padding.left + (lastIndex * availableWidth) / (chartData.length - 1)
    path += ` L ${lastX} ${chartHeight - padding.bottom}`
    path += ` L ${padding.left} ${chartHeight - padding.bottom}`
    path += " Z" // Close the path

    return path
  }

  // Generate price labels for Y-axis
  const generatePriceLabels = () => {
    const numLabels = 5
    const labels = []

    for (let i = 0; i < numLabels; i++) {
      const price = minPrice + (i / (numLabels - 1)) * (maxPrice - minPrice)
      const y = chartHeight - padding.bottom - (i / (numLabels - 1)) * (chartHeight - padding.top - padding.bottom)

      labels.push(
        <g key={i}>
          <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
          <text x={padding.left - 10} y={y} textAnchor="end" dominantBaseline="middle" fill="#64748b" fontSize="12">
            ₹{price.toFixed(2)}
          </text>
        </g>,
      )
    }

    return labels
  }

  // Generate date labels for X-axis
  const generateDateLabels = () => {
    if (chartData.length === 0) return []

    const numLabels = Math.min(5, chartData.length)
    const labels = []
    const availableWidth = chartWidth - padding.left - padding.right

    for (let i = 0; i < numLabels; i++) {
      const index = Math.floor((i / (numLabels - 1)) * (chartData.length - 1))
      const x = padding.left + (index * availableWidth) / (chartData.length - 1)
      const date = new Date(chartData[index].date)

      let label
      if (selectedTimeframe === "1D") {
        label = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      } else {
        label = date.toLocaleDateString([], { month: "short", day: "numeric" })
      }

      labels.push(
        <text key={i} x={x} y={chartHeight - padding.bottom + 20} textAnchor="middle" fill="#64748b" fontSize="12">
          {label}
        </text>,
      )
    }

    return labels
  }

  // Calculate price change and percentage
  const calculatePriceChange = () => {
    if (chartData.length < 2) return { change: 0, percentage: 0 }

    const firstPrice = chartData[chartData.length - 1].price
    const lastPrice = chartData[0].price
    const change = lastPrice - firstPrice
    const percentage = (change / firstPrice) * 100

    return { change, percentage }
  }

  const priceChange = calculatePriceChange()
  const isPositive = priceChange.change >= 0

  return (
    <div className="stock-chart-container">
      <div className="chart-header">
        <div className="price-info">
          <span className="current-price">₹{stockData?.price.toFixed(2)}</span>
          <span className={`price-change ${isPositive ? "positive" : "negative"}`}>
            {isPositive ? "+" : ""}
            {priceChange.change.toFixed(2)} ({isPositive ? "+" : ""}
            {priceChange.percentage.toFixed(2)}%)
          </span>
        </div>
        <div className="timeframe-selector">
          <button className={selectedTimeframe === "1D" ? "active" : ""} onClick={() => setSelectedTimeframe("1D")}>
            1D
          </button>
          <button className={selectedTimeframe === "1W" ? "active" : ""} onClick={() => setSelectedTimeframe("1W")}>
            1W
          </button>
          <button className={selectedTimeframe === "1M" ? "active" : ""} onClick={() => setSelectedTimeframe("1M")}>
            1M
          </button>
          <button className={selectedTimeframe === "3M" ? "active" : ""} onClick={() => setSelectedTimeframe("3M")}>
            3M
          </button>
          <button className={selectedTimeframe === "1Y" ? "active" : ""} onClick={() => setSelectedTimeframe("1Y")}>
            1Y
          </button>
        </div>
      </div>

      <div className="chart-container">
        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* Grid lines and labels */}
          {generatePriceLabels()}

          {/* Area under the line */}
          <path d={createAreaPath()} fill={isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"} />

          {/* Price line */}
          <path d={createPricePath()} fill="none" stroke={isPositive ? "#10b981" : "#ef4444"} strokeWidth="2" />

          {/* Date labels */}
          {generateDateLabels()}
        </svg>
      </div>
    </div>
  )
}

export default StockChart

