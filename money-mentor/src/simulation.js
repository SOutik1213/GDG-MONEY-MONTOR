"use client"

import { useState, useContext } from "react"
import "./simulation.css"
import Navbar from "./Navbar"
import { LanguageContext } from "./LanguageContext"

const investmentData = {
  "Mutual Funds": {
    returns: [8, 10, 12, 9, 11],
    risk: "Moderate",
    color: "#3b82f6",
    description:
      "A diversified portfolio of stocks and bonds, managed by professionals. Mutual funds offer a balance of risk and return, making them suitable for most investors.",
  },
  Stocks: {
    returns: [15, -5, 20, 10, 5],
    risk: "High",
    color: "#ef4444",
    description:
      "Ownership in publicly traded companies, offering high growth potential but also high risk. Stocks can provide significant returns but are subject to market volatility.",
  },
  Bonds: {
    returns: [3, 4, 5, 4, 3],
    risk: "Low",
    color: "#10b981",
    description:
      "Debt securities issued by governments or corporations, providing stable income with low risk. Bonds are generally safer investments but offer lower returns.",
  },
  "Real Estate": {
    returns: [7, 6, 8, 7, 9],
    risk: "Medium",
    color: "#f59e0b",
    description:
      "Investment in physical properties, offering potential rental income and appreciation. Real estate can provide both income and capital growth over time.",
  },
}

// Simple SVG chart component that responds to inputs
const SimpleGrowthChart = ({ data, years, investmentType, height = 300 }) => {
  const padding = { top: 20, right: 20, bottom: 30, left: 60 }
  const chartWidth = 800
  const chartHeight = height

  // Find max value for scaling
  const maxValue = Math.max(...Object.values(data).flat()) * 1.1

  // Create points for each investment type
  const createPoints = (values) => {
    const availableWidth = chartWidth - padding.left - padding.right
    const availableHeight = chartHeight - padding.top - padding.bottom

    return values
      .map((value, index) => {
        const x = padding.left + (index * availableWidth) / (values.length - 1)
        const y = chartHeight - padding.bottom - (value / maxValue) * availableHeight
        return `${x},${y}`
      })
      .join(" ")
  }

  // Generate grid lines
  const gridLines = []
  const numGridLines = 5
  for (let i = 0; i <= numGridLines; i++) {
    const y = chartHeight - padding.bottom - (i / numGridLines) * (chartHeight - padding.top - padding.bottom)
    const value = Math.round(maxValue * (i / numGridLines))
    gridLines.push(
      <g key={`grid-${i}`}>
        <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
        <text x={padding.left - 10} y={y} textAnchor="end" dominantBaseline="middle" fill="#64748b" fontSize="12">
          ₹{value.toLocaleString()}
        </text>
      </g>,
    )
  }

  // Generate x-axis labels
  const xLabels = []
  for (let i = 0; i <= years; i++) {
    const x = padding.left + (i * (chartWidth - padding.left - padding.right)) / years
    xLabels.push(
      <text key={`x-${i}`} x={x} y={chartHeight - padding.bottom + 20} textAnchor="middle" fill="#64748b" fontSize="12">
        {i === 0 ? "Start" : `Year ${i}`}
      </text>,
    )
  }

  return (
    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
      {/* Grid lines */}
      {gridLines}

      {/* X-axis labels */}
      {xLabels}

      {/* Data lines for each investment type */}
      {Object.entries(data).map(([type, values]) => (
        <polyline
          key={type}
          points={createPoints(values)}
          fill="none"
          stroke={investmentData[type].color}
          strokeWidth={type === investmentType ? 3 : 1.5}
          strokeOpacity={type === investmentType ? 1 : 0.6}
        />
      ))}

      {/* Legend */}
      <g transform={`translate(${padding.left + 20}, ${padding.top + 20})`}>
        {Object.entries(investmentData).map(([type, info], index) => (
          <g key={type} transform={`translate(0, ${index * 25})`}>
            <rect width="15" height="15" fill={info.color} rx="2" />
            <text x="25" y="12" fontSize="12" fill="#64748b">
              {type}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

function Simulation({ onLogout, onPageChange, currentPage }) {
  const { translate } = useContext(LanguageContext)
  const [amount, setAmount] = useState(10000)
  const [years, setYears] = useState(5)
  const [investmentType, setInvestmentType] = useState("Mutual Funds")
  const [results, setResults] = useState(null)

  // Calculate investment returns
  const calculateReturns = () => {
    const selectedInvestment = investmentData[investmentType]

    // Calculate compound returns
    let currentAmount = amount
    const yearlyAmounts = [amount]

    for (let i = 0; i < years; i++) {
      // Use the return rate for this year (cycle through available rates)
      const returnRate = selectedInvestment.returns[i % selectedInvestment.returns.length] / 100
      currentAmount = currentAmount * (1 + returnRate)
      yearlyAmounts.push(currentAmount)
    }

    // Calculate returns for comparison
    const comparisonData = {}
    Object.keys(investmentData).forEach((type) => {
      let value = amount
      const values = [amount]

      for (let i = 0; i < years; i++) {
        const returnRate = investmentData[type].returns[i % investmentData[type].returns.length] / 100
        value = value * (1 + returnRate)
        values.push(value)
      }

      comparisonData[type] = values
    })

    return {
      initialInvestment: amount,
      finalAmount: currentAmount,
      totalGrowth: currentAmount - amount,
      growthPercentage: ((currentAmount - amount) / amount) * 100,
      yearlyAmounts: yearlyAmounts,
      risk: selectedInvestment.risk,
      description: selectedInvestment.description,
      comparisonData: comparisonData,
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setResults(calculateReturns())
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        <div className="simulation-header">
          <h1>Investment Simulator</h1>
          <p>See how your money could grow with different investment options</p>
        </div>

        <div className="simulation-container">
          <div className="simulation-form card">
            <div className="card-header">
              <h2>Investment Parameters</h2>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="amount">Investment Amount (₹)</label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(1000, Number(e.target.value)))}
                    min="1000"
                    step="1000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="years">Investment Period (Years)</label>
                  <input
                    type="range"
                    id="years"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    min="1"
                    max="10"
                    step="1"
                  />
                  <div className="range-value">{years} years</div>
                </div>

                <div className="form-group">
                  <label>Investment Type</label>
                  <div className="investment-type-options">
                    {Object.keys(investmentData).map((type) => (
                      <div
                        key={type}
                        className={`investment-type-option ${investmentType === type ? "selected" : ""}`}
                        onClick={() => setInvestmentType(type)}
                        style={{
                          borderColor: investmentType === type ? investmentData[type].color : "transparent",
                          backgroundColor: investmentType === type ? `${investmentData[type].color}10` : "transparent",
                        }}
                      >
                        <div className="option-name">{type}</div>
                        <div className="option-risk">
                          Risk:{" "}
                          <span className={`risk-${investmentData[type].risk.toLowerCase()}`}>
                            {investmentData[type].risk}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Calculate Returns
                </button>
              </form>
            </div>
          </div>

          {results && (
            <div className="simulation-results card">
              <div className="card-header">
                <h2>Simulation Results</h2>
              </div>
              <div className="card-content">
                <div className="results-summary">
                  <div className="result-item">
                    <span className="result-label">Initial Investment</span>
                    <span className="result-value">{formatCurrency(results.initialInvestment)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Final Amount</span>
                    <span className="result-value highlight">{formatCurrency(results.finalAmount)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Total Growth</span>
                    <span className="result-value growth">{formatCurrency(results.totalGrowth)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Growth Percentage</span>
                    <span className="result-value growth">{results.growthPercentage.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="investment-description">
                  <h3>{investmentType}</h3>
                  <p>{results.description}</p>
                  <div className="risk-indicator">
                    <span className="risk-label">Risk Level:</span>
                    <span className={`risk-value risk-${results.risk.toLowerCase()}`}>{results.risk}</span>
                  </div>
                </div>

                <div className="chart-container">
                  <SimpleGrowthChart data={results.comparisonData} years={years} investmentType={investmentType} />
                </div>

                <div className="yearly-breakdown">
                  <h3>Year-by-Year Breakdown</h3>
                  <div className="breakdown-table">
                    <div className="breakdown-header">
                      <div>Year</div>
                      <div>Amount</div>
                      <div>Growth</div>
                    </div>
                    {results.yearlyAmounts.map((amount, index) => {
                      const prevAmount = index > 0 ? results.yearlyAmounts[index - 1] : amount
                      const growth = index > 0 ? ((amount - prevAmount) / prevAmount) * 100 : 0

                      return (
                        <div key={index} className="breakdown-row">
                          <div>{index === 0 ? "Initial" : `Year ${index}`}</div>
                          <div>{formatCurrency(amount)}</div>
                          <div className={growth >= 0 ? "positive" : "negative"}>
                            {index === 0 ? "-" : `${growth >= 0 ? "+" : ""}${growth.toFixed(2)}%`}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Simulation

