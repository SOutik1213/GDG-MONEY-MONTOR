"use client"
import { useState } from "react"
import "./paper-trading.css"
import Navbar from "./Navbar"

// Static data for stocks
const stocksData = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2934.5,
    change: -2.5,
    volume: "3.2M",
    dayRange: "2875.30 - 2945.20",
    yearRange: "2356.75 - 3021.40",
    marketCap: "19.85T",
    pe: 28.5,
    dividend: 0.35,
    sector: "Energy",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3756.2,
    change: -2.9,
    volume: "1.8M",
    dayRange: "3690.15 - 3765.80",
    yearRange: "3145.60 - 3890.25",
    marketCap: "13.72T",
    pe: 32.1,
    dividend: 0.95,
    sector: "Technology",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    price: 1678.9,
    change: 2.2,
    volume: "4.1M",
    dayRange: "1650.25 - 1685.40",
    yearRange: "1425.30 - 1725.60",
    marketCap: "9.35T",
    pe: 22.8,
    dividend: 1.2,
    sector: "Financial Services",
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd.",
    price: 1845.75,
    change: -3.8,
    volume: "2.4M",
    dayRange: "1780.50 - 1850.30",
    yearRange: "1320.75 - 1890.40",
    marketCap: "7.65T",
    pe: 27.3,
    dividend: 1.5,
    sector: "Technology",
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    price: 945.3,
    change: -2.1,
    volume: "1.9M",
    dayRange: "940.15 - 970.80",
    yearRange: "850.60 - 990.25",
    marketCap: "5.28T",
    pe: 24.7,
    dividend: 0.8,
    sector: "Telecommunications",
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    price: 987.45,
    change: 1.8,
    volume: "2.7M",
    dayRange: "980.25 - 1005.40",
    yearRange: "825.30 - 1025.60",
    marketCap: "6.85T",
    pe: 20.3,
    dividend: 1.0,
    sector: "Financial Services",
  },
  
]

// Initial portfolio data
const initialPortfolio = {
  cash: 100000,
  totalValue: 100000,
  holdings: [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      quantity: 10,
      averagePrice: 2800.5,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      quantity: 5,
      averagePrice: 3600.75,
    },
  ],
  transactions: [
    {
      id: 1,
      type: "buy",
      symbol: "RELIANCE",
      quantity: 10,
      price: 2800.5,
      value: 28005.0,
      date: "2023-08-15T10:30:00Z",
    },
    {
      id: 2,
      type: "buy",
      symbol: "TCS",
      quantity: 5,
      price: 3600.75,
      value: 18003.75,
      date: "2023-08-10T14:45:00Z",
    },
  ],
}

// Stock chart images mapping
const stockChartImages = {
  RELIANCE: "/images/reliance-chart.png",
  TCS: "/images/tcs-chart.png",
  HDFCBANK: "/images/hdfc-chart.png",
  INFY: "/images/infy-chart.png",
  BHARTIARTL: "/images/airtel-chart.png",
  ICICIBANK: "/images/icici-chart.png",
  default: "/images/default-chart.png",
}

function PaperTrading({ onLogout, onPageChange, currentPage }) {
  const [stocks] = useState(stocksData)
  const [portfolio] = useState(initialPortfolio)
  const [selectedStock, setSelectedStock] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("market")

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Calculate profit/loss for a holding
  const calculateProfitLoss = (holding) => {
    const stock = stocks.find((s) => s.symbol === holding.symbol)
    if (!stock) return { value: 0, percentage: 0 }

    const currentValue = stock.price * holding.quantity
    const costBasis = holding.averagePrice * holding.quantity
    const profitLoss = currentValue - costBasis
    const profitLossPercentage = (profitLoss / costBasis) * 100

    return {
      value: profitLoss,
      percentage: profitLossPercentage,
    }
  }

  // Get chart image for a stock
  const getStockChartImage = (symbol) => {
    return stockChartImages[symbol] || stockChartImages.default
  }

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        <div className="paper-trading-header">
          <h1>Paper Trading</h1>
          <p>Practice trading with virtual money in a risk-free environment</p>
        </div>

        <div className="paper-trading-summary card">
          <div className="card-content">
            <div className="portfolio-summary">
              <div className="summary-item">
                <span className="summary-label">Portfolio Value:</span>
                <span className="summary-value">{formatCurrency(portfolio.totalValue)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Available Cash:</span>
                <span className="summary-value">{formatCurrency(portfolio.cash)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="trading-tabs">
          <button
            className={`tab-button ${activeTab === "market" ? "active" : ""}`}
            onClick={() => setActiveTab("market")}
          >
            Market
          </button>
          <button
            className={`tab-button ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            My Portfolio
          </button>
          <button
            className={`tab-button ${activeTab === "transactions" ? "active" : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
        </div>

        {activeTab === "market" && (
          <div className="market-view">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search stocks by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="stocks-table card">
              <div className="table-header">
                <div className="col-symbol">Symbol</div>
                <div className="col-name">Name</div>
                <div className="col-price">Price</div>
                <div className="col-change">Change</div>
                <div className="col-actions">Actions</div>
              </div>

              {filteredStocks.map((stock) => (
                <div key={stock.symbol} className="table-row">
                  <div className="col-symbol">{stock.symbol}</div>
                  <div className="col-name">{stock.name}</div>
                  <div className="col-price">{formatCurrency(stock.price)}</div>
                  <div className={`col-change ${stock.change >= 0 ? "up" : "down"}`}>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                  <div className="col-actions">
                    <button className="view-button" onClick={() => setSelectedStock(stock)}>
                      View
                    </button>
                    <button className="trade-button">Trade</button>
                  </div>
                </div>
              ))}
            </div>

            {selectedStock && (
              <div className="stock-details card">
                <div className="card-header">
                  <h2>
                    {selectedStock.name} ({selectedStock.symbol})
                  </h2>
                </div>
                <div className="card-content">
                  <div className="stock-header">
                    <div>
                      <div className="stock-price">
                        {formatCurrency(selectedStock.price)}
                        <span className={`price-change ${selectedStock.change >= 0 ? "up" : "down"}`}>
                          {selectedStock.change >= 0 ? "+" : ""}
                          {selectedStock.change}%
                        </span>
                      </div>
                    </div>
                    <div className="trade-actions">
                      <button className="buy-button">Buy</button>
                      <button className="sell-button">Sell</button>
                    </div>
                  </div>

                  <div className="stock-chart">
                    <img
                      src={getStockChartImage(selectedStock.symbol) || "/placeholder.svg"}
                      alt={`${selectedStock.name} stock chart`}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginTop: "16px",
                        marginBottom: "16px",
                      }}
                    />
                  </div>

                  <div className="stock-info-grid">
                    <div className="info-item">
                      <span className="info-label">Day Range</span>
                      <span className="info-value">{selectedStock.dayRange}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">52 Week Range</span>
                      <span className="info-value">{selectedStock.yearRange}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Market Cap</span>
                      <span className="info-value">{selectedStock.marketCap}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Volume</span>
                      <span className="info-value">{selectedStock.volume}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">P/E Ratio</span>
                      <span className="info-value">{selectedStock.pe}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Dividend Yield</span>
                      <span className="info-value">{selectedStock.dividend}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="portfolio-view">
            <div className="portfolio-chart card">
              <div className="card-header">
                <h2>Portfolio Performance</h2>
              </div>
              <div className="card-content">
                <img
                  src="/images/portfolio-chart.png"
                  alt="Portfolio performance chart"
                  style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            </div>

            <div className="holdings-section card">
              <div className="card-header">
                <h2>Your Holdings</h2>
              </div>
              <div className="card-content">
                <div className="holdings-table">
                  <div className="table-header">
                    <div className="col-symbol">Symbol</div>
                    <div className="col-name">Name</div>
                    <div className="col-quantity">Quantity</div>
                    <div className="col-avg-price">Avg. Price</div>
                    <div className="col-current-price">Current Price</div>
                    <div className="col-value">Value</div>
                    <div className="col-pl">P/L</div>
                    <div className="col-actions">Actions</div>
                  </div>

                  {portfolio.holdings.map((holding) => {
                    const stock = stocks.find((s) => s.symbol === holding.symbol)
                    const profitLoss = calculateProfitLoss(holding)

                    return (
                      <div key={holding.symbol} className="table-row">
                        <div className="col-symbol">{holding.symbol}</div>
                        <div className="col-name">{holding.name}</div>
                        <div className="col-quantity">{holding.quantity}</div>
                        <div className="col-avg-price">{formatCurrency(holding.averagePrice)}</div>
                        <div className="col-current-price">{formatCurrency(stock?.price || 0)}</div>
                        <div className="col-value">{formatCurrency((stock?.price || 0) * holding.quantity)}</div>
                        <div className={`col-pl ${profitLoss.value >= 0 ? "up" : "down"}`}>
                          {formatCurrency(profitLoss.value)} ({profitLoss.percentage.toFixed(2)}%)
                        </div>
                        <div className="col-actions">
                          <button className="trade-button">Sell</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="transactions-view card">
            <div className="card-header">
              <h2>Transaction History</h2>
            </div>
            <div className="card-content">
              <div className="transactions-table">
                <div className="table-header">
                  <div className="col-date">Date</div>
                  <div className="col-type">Type</div>
                  <div className="col-symbol">Symbol</div>
                  <div className="col-quantity">Quantity</div>
                  <div className="col-price">Price</div>
                  <div className="col-value">Value</div>
                </div>

                {portfolio.transactions.map((transaction) => (
                  <div key={transaction.id} className="table-row">
                    <div className="col-date">{new Date(transaction.date).toLocaleDateString()}</div>
                    <div className={`col-type ${transaction.type}`}>{transaction.type}</div>
                    <div className="col-symbol">{transaction.symbol}</div>
                    <div className="col-quantity">{transaction.quantity}</div>
                    <div className="col-price">{formatCurrency(transaction.price)}</div>
                    <div className="col-value">{formatCurrency(transaction.value)}</div>
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

export default PaperTrading

