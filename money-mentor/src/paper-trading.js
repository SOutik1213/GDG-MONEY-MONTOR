import { useState, useEffect } from "react";
import seedrandom from "seedrandom";
import "./paper-trading.css";
import Navbar from "./Navbar";
import MarketEvents from "./components/market/MarketEvents";
import StockChart from "./components/market/StockChart";
import LoadingScreen from "./components/common/LoadingScreen";

// Initial stock data
const initialStocksData = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2934.5,
    change: 2.5,
    volume: "3.2M",
    dayRange: "2875.30 - 2945.20",
    yearRange: "2356.75 - 3021.40",
    marketCap: "19.85T",
    pe: 28.5,
    dividend: 0.35,
    sector: "Energy",
    volatility: 1.8,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3756.2,
    change: 2.9,
    volume: "1.8M",
    dayRange: "3690.15 - 3765.80",
    yearRange: "3145.60 - 3890.25",
    marketCap: "13.72T",
    pe: 32.1,
    dividend: 0.95,
    sector: "Technology",
    volatility: 1.5,
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
    volatility: 1.2,
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd.",
    price: 1845.75,
    change: 3.8,
    volume: "2.4M",
    dayRange: "1780.50 - 1850.30",
    yearRange: "1320.75 - 1890.40",
    marketCap: "7.65T",
    pe: 27.3,
    dividend: 1.5,
    sector: "Technology",
    volatility: 1.7,
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
    volatility: 2.0,
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    price: 987.45,
    change: -1.8,
    volume: "2.7M",
    dayRange: "980.25 - 1005.40",
    yearRange: "825.30 - 1025.60",
    marketCap: "6.85T",
    pe: 20.3,
    dividend: 1.0,
    sector: "Financial Services",
    volatility: 1.3,
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 624.8,
    change: -1.5,
    volume: "3.5M",
    dayRange: "620.10 - 635.40",
    yearRange: "510.25 - 650.75",
    marketCap: "5.58T",
    pe: 9.8,
    dividend: 2.2,
    sector: "Financial Services",
    volatility: 1.9,
  },
  {
    symbol: "WIPRO",
    name: "Wipro Ltd.",
    price: 452.6,
    change: 1.8,
    volume: "1.2M",
    dayRange: "445.30 - 455.20",
    yearRange: "385.45 - 475.60",
    marketCap: "2.48T",
    pe: 18.5,
    dividend: 1.0,
    sector: "Technology",
    volatility: 1.6,
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd.",
    price: 875.3,
    change: 3.2,
    volume: "2.8M",
    dayRange: "850.15 - 880.40",
    yearRange: "650.30 - 890.75",
    marketCap: "2.92T",
    pe: 15.2,
    dividend: 0.5,
    sector: "Automotive",
    volatility: 2.2,
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries",
    price: 1245.6,
    change: 0.8,
    volume: "1.5M",
    dayRange: "1235.20 - 1250.40",
    yearRange: "1050.45 - 1280.30",
    marketCap: "2.99T",
    pe: 24.3,
    dividend: 1.2,
    sector: "Healthcare",
    volatility: 1.4,
  },
];

function PaperTrading({ onLogout, onPageChange, currentPage }) {
  // State for user and authentication
  const [loading, setLoading] = useState(true);

  // State for stocks and portfolio
  const [stocks, setStocks] = useState(initialStocksData);
  const [portfolio, setPortfolio] = useState({
    cash: 100000,
    totalValue: 100000,
    holdings: [],
    transactions: [],
    watchlist: [],
  });
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("market");

  // State for trade modals
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [tradeStock, setTradeStock] = useState(null);
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [tradeError, setTradeError] = useState("");
  const [tradeSuccess, setTradeSuccess] = useState("");

  // State for transaction filtering
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // State for market simulation
  const [marketOpen, setMarketOpen] = useState(true);
  const [marketStatus, setMarketStatus] = useState("Market is open");
  const [marketEvents, setMarketEvents] = useState([]);
  const [simulationSpeed, setSimulationSpeed] = useState("normal"); // slow, normal, fast

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Market simulation effects
  useEffect(() => {
    if (!stocks.length) return;

    // Check if market should be open
    const checkMarketHours = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay();

      // Check if market is closed (weekends or outside trading hours)
      const isWeekend = day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
      const isBeforeMarketHours = hours < 9 || (hours === 9 && minutes < 30);
      const isAfterMarketHours = hours >= 16;

      const isMarketOpen = !isWeekend && !isBeforeMarketHours && !isAfterMarketHours;

      setMarketOpen(isMarketOpen);

      if (isWeekend) {
        setMarketStatus("Market is closed (Weekend)");
      } else if (isBeforeMarketHours) {
        setMarketStatus("Market opens at 9:30 AM");
      } else if (isAfterMarketHours) {
        setMarketStatus("Market closed at 4:00 PM");
      } else {
        setMarketStatus("Market is open");
      }
    };

    checkMarketHours();
    const marketCheckInterval = setInterval(checkMarketHours, 60000); // Check every minute

    // Set simulation interval based on speed
    let simulationInterval;
    let eventInterval;

    if (marketOpen) {
      // Determine interval duration based on simulation speed
      let intervalDuration;
      switch (simulationSpeed) {
        case "slow":
          intervalDuration = 60000; // 1 minute
          break;
        case "fast":
          intervalDuration = 10000; // 10 seconds
          break;
        case "normal":
        default:
          intervalDuration = 30000; // 30 seconds
      }

      // Simulate price changes
      simulationInterval = setInterval(() => {
        setStocks((prevStocks) => simulateMarketData(prevStocks, 1));
      }, intervalDuration);

      // Generate random market events
      eventInterval = setInterval(() => {
        // 20% chance of generating an event each interval
        if (Math.random() < 0.2) {
          const newEvent = generateMarketEvent(stocks);
          setMarketEvents((prev) => [newEvent, ...prev].slice(0, 10)); // Keep only the 10 most recent events

          // Apply the event's impact to stock prices
          setStocks((prevStocks) => applyMarketEvent(prevStocks, newEvent));
        }
      }, intervalDuration * 3); // Events occur less frequently than price updates
    }

    // Update portfolio value when stocks change
    const totalValue = calculatePortfolioValue();
    setPortfolio((prev) => ({ ...prev, totalValue }));

    return () => {
      clearInterval(marketCheckInterval);
      clearInterval(simulationInterval);
      clearInterval(eventInterval);
    };
  }, [stocks, marketOpen, simulationSpeed]);

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter transactions
  const filteredTransactions = portfolio?.transactions.filter((transaction) => {
    if (transactionFilter === "all") return true;
    return transaction.type === transactionFilter;
  }) || [];

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate profit/loss for a holding
  const calculateProfitLoss = (holding) => {
    const stock = stocks.find((s) => s.symbol === holding.symbol);
    if (!stock) return { value: 0, percentage: 0 };

    const currentValue = stock.price * holding.quantity;
    const costBasis = holding.averagePrice * holding.quantity;
    const profitLoss = currentValue - costBasis;
    const profitLossPercentage = (profitLoss / costBasis) * 100;

    return {
      value: profitLoss,
      percentage: profitLossPercentage,
    };
  };

  // Handle buy stock
  const handleBuy = (stock) => {
    setTradeStock(stock);
    setTradeQuantity(1);
    setTradeError("");
    setTradeSuccess("");
    setShowBuyModal(true);
  };

  // Handle sell stock
  const handleSell = (stock) => {
    setTradeStock(stock);
    setTradeQuantity(1);
    setTradeError("");
    setTradeSuccess("");
    setShowSellModal(true);
  };

  // Calculate estimated profit/loss for a sell transaction
  const calculateEstimatedProfitLoss = () => {
    if (!tradeStock || !portfolio) return 0;

    const holding = portfolio.holdings.find((h) => h.symbol === tradeStock.symbol);
    if (!holding) return 0;

    const costBasis = holding.averagePrice * tradeQuantity;
    const saleValue = tradeStock.price * tradeQuantity;

    return saleValue - costBasis;
  };

  // Execute buy order
  const executeBuyOrder = () => {
    if (!tradeStock || !portfolio) return;

    const totalCost = tradeStock.price * tradeQuantity;

    // Add trading fee (0.5% of transaction value)
    const tradingFee = totalCost * 0.005;
    const totalWithFees = totalCost + tradingFee;

    // Validate order
    if (totalWithFees > portfolio.cash) {
      setTradeError("Insufficient funds for this purchase (includes trading fees)");
      return;
    }

    if (tradeQuantity <= 0) {
      setTradeError("Quantity must be greater than zero");
      return;
    }

    // Update portfolio cash
    const newCash = portfolio.cash - totalWithFees;

    // Update or add holding
    const existingHolding = portfolio.holdings.find((h) => h.symbol === tradeStock.symbol);
    let newHoldings;

    if (existingHolding) {
      // Update existing holding with new average price
      const totalShares = existingHolding.quantity + tradeQuantity;
      const totalCostBasis = existingHolding.averagePrice * existingHolding.quantity + totalCost;
      const newAveragePrice = totalCostBasis / totalShares;

      newHoldings = portfolio.holdings.map((holding) =>
        holding.symbol === tradeStock.symbol
          ? { ...holding, quantity: totalShares, averagePrice: newAveragePrice }
          : holding
      );
    } else {
      // Add new holding
      newHoldings = [
        ...portfolio.holdings,
        {
          symbol: tradeStock.symbol,
          name: tradeStock.name,
          quantity: tradeQuantity,
          averagePrice: tradeStock.price,
        },
      ];
    }

    // Add transaction record
    const newTransaction = {
      id: Date.now(),
      type: "buy",
      symbol: tradeStock.symbol,
      quantity: tradeQuantity,
      price: tradeStock.price,
      value: totalCost,
      fee: tradingFee,
      total: totalWithFees,
      date: new Date().toISOString(),
    };

    // Update portfolio
    setPortfolio({
      ...portfolio,
      cash: newCash,
      holdings: newHoldings,
      transactions: [...portfolio.transactions, newTransaction],
    });

    // Show success message and close modal
    setTradeSuccess(`Successfully purchased ${tradeQuantity} shares of ${tradeStock.symbol}`);
    setTimeout(() => {
      setShowBuyModal(false);
      setTradeSuccess("");
    }, 2000);
  };

  // Execute sell order
  const executeSellOrder = () => {
    if (!tradeStock || !portfolio) return;

    // Find holding
    const holding = portfolio.holdings.find((h) => h.symbol === tradeStock.symbol);

    // Validate order
    if (!holding) {
      setTradeError("You don't own any shares of this stock");
      return;
    }

    if (tradeQuantity <= 0) {
      setTradeError("Quantity must be greater than zero");
      return;
    }

    if (tradeQuantity > holding.quantity) {
      setTradeError(`You only have ${holding.quantity} shares to sell`);
      return;
    }

    // Calculate sale value
    const saleValue = tradeStock.price * tradeQuantity;

    // Add trading fee (0.5% of transaction value)
    const tradingFee = saleValue * 0.005;
    const netProceeds = saleValue - tradingFee;

    // Update portfolio cash
    const newCash = portfolio.cash + netProceeds;

    // Update holdings
    let newHoldings;
    if (holding.quantity === tradeQuantity) {
      // Remove holding completely if selling all shares
      newHoldings = portfolio.holdings.filter((h) => h.symbol !== tradeStock.symbol);
    } else {
      // Update holding quantity (average price stays the same)
      newHoldings = portfolio.holdings.map((h) =>
        h.symbol === tradeStock.symbol ? { ...h, quantity: h.quantity - tradeQuantity } : h
      );
    }

    // Calculate profit/loss for this transaction
    const costBasis = holding.averagePrice * tradeQuantity;
    const profitLoss = saleValue - costBasis;

    // Add transaction record
    const newTransaction = {
      id: Date.now(),
      type: "sell",
      symbol: tradeStock.symbol,
      quantity: tradeQuantity,
      price: tradeStock.price,
      value: saleValue,
      fee: tradingFee,
      net: netProceeds,
      profitLoss: profitLoss,
      date: new Date().toISOString(),
    };

    // Update portfolio
    setPortfolio({
      ...portfolio,
      cash: newCash,
      holdings: newHoldings,
      transactions: [...portfolio.transactions, newTransaction],
    });

    // Show success message and close modal
    setTradeSuccess(`Successfully sold ${tradeQuantity} shares of ${tradeStock.symbol}`);
    setTimeout(() => {
      setShowSellModal(false);
      setTradeSuccess("");
    }, 2000);
  };

  // Toggle watchlist
  const toggleWatchlist = (stock) => {
    if (!portfolio) return;

    const isInWatchlist = portfolio.watchlist.some((item) => item.symbol === stock.symbol);
    let newWatchlist;

    if (isInWatchlist) {
      newWatchlist = portfolio.watchlist.filter((item) => item.symbol !== stock.symbol);
    } else {
      newWatchlist = [...portfolio.watchlist, stock];
    }

    setPortfolio({
      ...portfolio,
      watchlist: newWatchlist,
    });
  };

  // Check if stock is in watchlist
  const isInWatchlist = (symbol) => {
    return portfolio?.watchlist.some((item) => item.symbol === symbol) || false;
  };

  // Calculate total profit/loss
  const calculateTotalProfitLoss = () => {
    if (!portfolio || !stocks.length) return 0;

    return portfolio.holdings.reduce((total, holding) => {
      const profitLoss = calculateProfitLoss(holding);
      return total + profitLoss.value;
    }, 0);
  };

  // Calculate portfolio value
  const calculatePortfolioValue = () => {
    if (!portfolio || !stocks.length) return 0;

    const holdingsValue = portfolio.holdings.reduce((total, holding) => {
      const stock = stocks.find((s) => s.symbol === holding.symbol);
      return total + (stock ? stock.price * holding.quantity : 0);
    }, 0);

    return portfolio.cash + holdingsValue;
  };

  // Handle market event click
  const handleMarketEventClick = (event) => {
    // Find the affected stock and select it
    const affectedStock = stocks.find((stock) => stock.symbol === event.stock);
    if (affectedStock) {
      setSelectedStock(affectedStock);
      setActiveTab("market");
    }
  };

  // Change simulation speed
  const handleSpeedChange = (speed) => {
    setSimulationSpeed(speed);
  };

  const totalProfitLoss = calculateTotalProfitLoss();
  const totalValue = calculatePortfolioValue();
  const estimatedProfitLoss = calculateEstimatedProfitLoss();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        <div className="paper-trading-header">
          <h1>Paper Trading</h1>
          <p>Practice trading with virtual money in a risk-free environment</p>
        </div>

        <div className="market-status-bar">
          <div className={`status-indicator ${marketOpen ? "open" : "closed"}`}></div>
          <span className="status-text">{marketStatus}</span>
          <span className="market-time">{new Date().toLocaleTimeString()}</span>

          <div className="simulation-controls">
            <span>Simulation Speed:</span>
            <div className="speed-buttons">
              <button
                className={`speed-button ${simulationSpeed === "slow" ? "active" : ""}`}
                onClick={() => handleSpeedChange("slow")}
              >
                Slow
              </button>
              <button
                className={`speed-button ${simulationSpeed === "normal" ? "active" : ""}`}
                onClick={() => handleSpeedChange("normal")}
              >
                Normal
              </button>
              <button
                className={`speed-button ${simulationSpeed === "fast" ? "active" : ""}`}
                onClick={() => handleSpeedChange("fast")}
              >
                Fast
              </button>
            </div>
          </div>
        </div>

        <div className="paper-trading-summary card">
          <div className="card-content">
            <div className="portfolio-summary">
              <div className="summary-item">
                <span className="summary-label">Portfolio Value</span>
                <span className="summary-value">{formatCurrency(totalValue)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Available Cash</span>
                <span className="summary-value">{formatCurrency(portfolio?.cash || 0)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total P/L</span>
                <span className={`summary-value ${totalProfitLoss >= 0 ? "profit" : "loss"}`}>
                  {formatCurrency(totalProfitLoss)}
                  <span className="percentage">
                    ({((totalProfitLoss / (totalValue - totalProfitLoss || 1)) * 100).toFixed(2)}%)
                  </span>
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Holdings</span>
                <span className="summary-value">{portfolio?.holdings.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="trading-layout">
          <div className="trading-main">
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
              <button
                className={`tab-button ${activeTab === "watchlist" ? "active" : ""}`}
                onClick={() => setActiveTab("watchlist")}
              >
                Watchlist ({portfolio?.watchlist.length || 0})
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
                        <button className="trade-button" onClick={() => handleBuy(stock)}>
                          Buy
                        </button>
                        <button className="watchlist-button" onClick={() => toggleWatchlist(stock)}>
                          {isInWatchlist(stock.symbol) ? "★" : "☆"}
                        </button>
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
                      <div className="header-actions">
                        <button
                          className="watchlist-button-large"
                          onClick={() => toggleWatchlist(selectedStock)}
                        >
                          {isInWatchlist(selectedStock.symbol)
                            ? "Remove from Watchlist"
                            : "Add to Watchlist"}
                        </button>
                      </div>
                    </div>
                    <div className="card-content">
                      <StockChart stockData={selectedStock} />

                      <div className="trade-actions">
                        <button className="buy-button" onClick={() => handleBuy(selectedStock)}>
                          Buy
                        </button>
                        <button
                          className="sell-button"
                          onClick={() => handleSell(selectedStock)}
                          disabled={
                            !portfolio?.holdings.some((h) => h.symbol === selectedStock.symbol)
                          }
                        >
                          Sell
                        </button>
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

                      {portfolio?.holdings.some((h) => h.symbol === selectedStock.symbol) && (
                        <div className="your-position">
                          <h3>Your Position</h3>
                          {portfolio.holdings
                            .filter((h) => h.symbol === selectedStock.symbol)
                            .map((holding) => {
                              const profitLoss = calculateProfitLoss(holding);
                              return (
                                <div key={holding.symbol} className="position-details">
                                  <div className="position-item">
                                    <span className="position-label">Shares Owned</span>
                                    <span className="position-value">{holding.quantity}</span>
                                  </div>
                                  <div className="position-item">
                                    <span className="position-label">Average Cost</span>
                                    <span className="position-value">
                                      {formatCurrency(holding.averagePrice)}
                                    </span>
                                  </div>
                                  <div className="position-item">
                                    <span className="position-label">Current Value</span>
                                    <span className="position-value">
                                      {formatCurrency(selectedStock.price * holding.quantity)}
                                    </span>
                                  </div>
                                  <div className="position-item">
                                    <span className="position-label">Profit/Loss</span>
                                    <span
                                      className={`position-value ${
                                        profitLoss.value >= 0 ? "profit" : "loss"
                                      }`}
                                    >
                                      {formatCurrency(profitLoss.value)} (
                                      {profitLoss.percentage.toFixed(2)}%)
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "portfolio" && (
              <div className="portfolio-view">
                <div className="holdings-section card">
                  <div className="card-header">
                    <h2>Your Holdings</h2>
                  </div>
                  <div className="card-content">
                    {!portfolio?.holdings.length ? (
                      <div className="empty-state">
                        <p>You don't have any holdings yet. Start trading to build your portfolio!</p>
                        <button className="btn-primary" onClick={() => setActiveTab("market")}>
                          Go to Market
                        </button>
                      </div>
                    ) : (
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
                          const stock = stocks.find((s) => s.symbol === holding.symbol);
                          const profitLoss = calculateProfitLoss(holding);

                          return (
                            <div key={holding.symbol} className="table-row">
                              <div className="col-symbol">{holding.symbol}</div>
                              <div className="col-name">{holding.name}</div>
                              <div className="col-quantity">{holding.quantity}</div>
                              <div className="col-avg-price">
                                {formatCurrency(holding.averagePrice)}
                              </div>
                              <div className="col-current-price">
                                {formatCurrency(stock?.price || 0)}
                              </div>
                              <div className="col-value">
                                {formatCurrency((stock?.price || 0) * holding.quantity)}
                              </div>
                              <div className={`col-pl ${profitLoss.value >= 0 ? "up" : "down"}`}>
                                {formatCurrency(profitLoss.value)} ({profitLoss.percentage.toFixed(2)}%)
                              </div>
                              <div className="col-actions">
                                <button
                                  className="view-button"
                                  onClick={() => {
                                    setSelectedStock(stock);
                                    setActiveTab("market");
                                  }}
                                >
                                  View
                                </button>
                                <button className="trade-button" onClick={() => handleSell(stock)}>
                                  Sell
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="transactions-view card">
                <div className="card-header">
                  <h2>Transaction History</h2>
                  <div className="filter-controls">
                    <div className="filter-group">
                      <label>Type:</label>
                      <select
                        value={transactionFilter}
                        onChange={(e) => setTransactionFilter(e.target.value)}
                      >
                        <option value="all">All Transactions</option>
                        <option value="buy">Buy Orders</option>
                        <option value="sell">Sell Orders</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label>Sort:</label>
                      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  {!sortedTransactions.length ? (
                    <div className="empty-state">
                      <p>No transactions match your filter criteria.</p>
                    </div>
                  ) : (
                    <div className="transactions-table">
                      <div className="table-header">
                        <div className="col-date">Date</div>
                        <div className="col-type">Type</div>
                        <div className="col-symbol">Symbol</div>
                        <div className="col-quantity">Quantity</div>
                        <div className="col-price">Price</div>
                        <div className="col-value">Value</div>
                        <div className="col-fee">Fee</div>
                        <div className="col-total">Total</div>
                        <div className="col-pl">P/L</div>
                      </div>

                      {sortedTransactions.map((transaction) => (
                        <div key={transaction.id} className="table-row">
                          <div className="col-date">
                            {new Date(transaction.date).toLocaleString()}
                          </div>
                          <div className={`col-type ${transaction.type}`}>
                            {transaction.type.toUpperCase()}
                          </div>
                          <div className="col-symbol">{transaction.symbol}</div>
                          <div className="col-quantity">{transaction.quantity}</div>
                          <div className="col-price">{formatCurrency(transaction.price)}</div>
                          <div className="col-value">{formatCurrency(transaction.value)}</div>
                          <div className="col-fee">{formatCurrency(transaction.fee || 0)}</div>
                          <div className="col-total">
                            {transaction.type === "buy"
                              ? formatCurrency(transaction.total || transaction.value)
                              : formatCurrency(transaction.net || transaction.value)}
                          </div>
                          <div className="col-pl">
                            {transaction.type === "sell" && transaction.profitLoss !== undefined ? (
                              <span className={transaction.profitLoss >= 0 ? "profit" : "loss"}>
                                {formatCurrency(transaction.profitLoss)}
                              </span>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "watchlist" && (
              <div className="watchlist-view card">
                <div className="card-header">
                  <h2>Your Watchlist</h2>
                </div>
                <div className="card-content">
                  {!portfolio?.watchlist.length ? (
                    <div className="empty-state">
                      <p>Your watchlist is empty. Add stocks to track them here.</p>
                      <button className="btn-primary" onClick={() => setActiveTab("market")}>
                        Go to Market
                      </button>
                    </div>
                  ) : (
                    <div className="watchlist-table">
                      <div className="table-header">
                        <div className="col-symbol">Symbol</div>
                        <div className="col-name">Name</div>
                        <div className="col-price">Price</div>
                        <div className="col-change">Change</div>
                        <div className="col-actions">Actions</div>
                      </div>

                      {portfolio.watchlist.map((watchItem) => {
                        // Get updated stock data
                        const currentStock = stocks.find((s) => s.symbol === watchItem.symbol) || watchItem;

                        return (
                          <div key={currentStock.symbol} className="table-row">
                            <div className="col-symbol">{currentStock.symbol}</div>
                            <div className="col-name">{currentStock.name}</div>
                            <div className="col-price">{formatCurrency(currentStock.price)}</div>
                            <div className={`col-change ${currentStock.change >= 0 ? "up" : "down"}`}>
                              {currentStock.change >= 0 ? "+" : ""}
                              {currentStock.change}%
                            </div>
                            <div className="col-actions">
                              <button
                                className="view-button"
                                onClick={() => {
                                  setSelectedStock(currentStock);
                                  setActiveTab("market");
                                }}
                              >
                                View
                              </button>
                              <button
                                className="trade-button"
                                onClick={() => handleBuy(currentStock)}
                              >
                                Buy
                              </button>
                              <button
                                className="remove-button"
                                onClick={() => toggleWatchlist(currentStock)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="trading-sidebar">
            <MarketEvents events={marketEvents} onEventClick={handleMarketEventClick} />
          </div>
        </div>

        {/* Buy Modal */}
        {showBuyModal && tradeStock && (
          <div className="trade-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Buy {tradeStock.symbol}</h2>
                <button className="close-button" onClick={() => setShowBuyModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="stock-info">
                  <div className="info-row">
                    <span className="info-label">Current Price:</span>
                    <span className="info-value">{formatCurrency(tradeStock.price)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Available Cash:</span>
                    <span className="info-value">{formatCurrency(portfolio?.cash || 0)}</span>
                  </div>
                </div>

                <div className="trade-form">
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() => setTradeQuantity(Math.max(1, tradeQuantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        value={tradeQuantity}
                        onChange={(e) =>
                          setTradeQuantity(Math.max(1, Number.parseInt(e.target.value) || 0))
                        }
                        min="1"
                      />
                      <button type="button" onClick={() => setTradeQuantity(tradeQuantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Stock Price:</span>
                      <span>{formatCurrency(tradeStock.price)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Quantity:</span>
                      <span>{tradeQuantity}</span>
                    </div>
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(tradeStock.price * tradeQuantity)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Trading Fee (0.5%):</span>
                      <span>{formatCurrency(tradeStock.price * tradeQuantity * 0.005)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total Cost:</span>
                      <span>{formatCurrency(tradeStock.price * tradeQuantity * 1.005)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Remaining Cash:</span>
                      <span>
                        {formatCurrency(
                          (portfolio?.cash || 0) - tradeStock.price * tradeQuantity * 1.005
                        )}
                      </span>
                    </div>
                  </div>

                  {tradeError && <div className="error-message">{tradeError}</div>}
                  {tradeSuccess && <div className="success-message">{tradeSuccess}</div>}

                  <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => setShowBuyModal(false)}>
                      Cancel
                    </button>
                    <button type="button" className="confirm-button" onClick={executeBuyOrder}>
                      Confirm Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sell Modal */}
        {showSellModal && tradeStock && (
          <div className="trade-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Sell {tradeStock.symbol}</h2>
                <button className="close-button" onClick={() => setShowSellModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="stock-info">
                  <div className="info-row">
                    <span className="info-label">Current Price:</span>
                    <span className="info-value">{formatCurrency(tradeStock.price)}</span>
                  </div>

                  {portfolio?.holdings.some((h) => h.symbol === tradeStock.symbol) && (
                    <div className="info-row">
                      <span className="info-label">Shares Owned:</span>
                      <span className="info-value">
                        {portfolio.holdings.find((h) => h.symbol === tradeStock.symbol)?.quantity || 0}
                      </span>
                    </div>
                  )}
                </div>

                <div className="trade-form">
                  <div className="form-group">
                    <label htmlFor="sell-quantity">Quantity:</label>
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() => setTradeQuantity(Math.max(1, tradeQuantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="sell-quantity"
                        value={tradeQuantity}
                        onChange={(e) =>
                          setTradeQuantity(Math.max(1, Number.parseInt(e.target.value) || 0))
                        }
                        min="1"
                        max={
                          portfolio?.holdings.find((h) => h.symbol === tradeStock.symbol)?.quantity || 0
                        }
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const maxQuantity =
                            portfolio?.holdings.find((h) => h.symbol === tradeStock.symbol)?.quantity ||
                            0;
                          setTradeQuantity(Math.min(maxQuantity, tradeQuantity + 1));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Stock Price:</span>
                      <span>{formatCurrency(tradeStock.price)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Quantity:</span>
                      <span>{tradeQuantity}</span>
                    </div>
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(tradeStock.price * tradeQuantity)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Trading Fee (0.5%):</span>
                      <span>{formatCurrency(tradeStock.price * tradeQuantity * 0.005)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Net Proceeds:</span>
                      <span>{formatCurrency(tradeStock.price * tradeQuantity * 0.995)}</span>
                    </div>
                    <div className="summary-row">
                      <span>New Cash Balance:</span>
                      <span>
                        {formatCurrency(
                          (portfolio?.cash || 0) + tradeStock.price * tradeQuantity * 0.995
                        )}
                      </span>
                    </div>
                    {portfolio?.holdings.some((h) => h.symbol === tradeStock.symbol) && (
                      <div className="summary-row">
                        <span>Estimated P/L:</span>
                        <span className={estimatedProfitLoss >= 0 ? "profit" : "loss"}>
                          {formatCurrency(estimatedProfitLoss)}
                        </span>
                      </div>
                    )}
                  </div>

                  {tradeError && <div className="error-message">{tradeError}</div>}
                  {tradeSuccess && <div className="success-message">{tradeSuccess}</div>}

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowSellModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="button" className="confirm-button sell" onClick={executeSellOrder}>
                      Confirm Sell
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Market simulation functions
function simulateMarketData(stocks, volatilityFactor = 1) {
  // Get current time to determine if market should be open
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const day = now.getDay();

  // Check if market is closed (weekends or outside trading hours)
  const isWeekend = day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  const isBeforeMarketHours = hours < 9 || (hours === 9 && minutes < 30);
  const isAfterMarketHours = hours >= 16;

  // If market is closed, return stocks unchanged
  if (isWeekend || isBeforeMarketHours || isAfterMarketHours) {
    return stocks;
  }

  // Market trend factor (simulates overall market direction)
  // Changes slowly over time to simulate market cycles
  const marketTrendSeed = Math.floor(now.getTime() / (1000 * 60 * 60 * 24)); // Changes daily
  const marketRandom = seedrandom(marketTrendSeed.toString());
  const marketTrend = (marketRandom() - 0.5) * 2; // -1 to 1

  return stocks.map((stock) => {
    // Base volatility from stock
    const volatility = stock.volatility || 1.5;

    // Sector-based movement (stocks in same sector tend to move together)
    const sectorSeed = stock.sector + marketTrendSeed;
    const sectorRandom = seedrandom(sectorSeed);
    const sectorMovement = (sectorRandom() - 0.5) * volatility;

    // Individual stock movement
    const stockMovement = (Math.random() - 0.5) * volatility * volatilityFactor;

    // Combine market trend, sector movement, and individual stock movement
    // Market trend has 40% influence, sector has 30%, individual stock has 30%
    const changePercent = marketTrend * 0.4 + sectorMovement * 0.3 + stockMovement * 0.3;

    // Calculate new price with some constraints to prevent extreme movements
    const maxChange = (2.5 * volatility) / 100; // Max 2.5% change per update for typical volatility
    const limitedChange = Math.max(Math.min(changePercent / 100, maxChange), -maxChange);
    const newPrice = stock.price * (1 + limitedChange);

    // Update change percentage (daily change)
    const prevChange = stock.change || 0;
    const newChange = prevChange + changePercent;

    // Update volume based on price movement (higher volume on bigger moves)
    const volumeChange = Math.abs(changePercent) * 100000;
    const baseVolume =
      Number.parseFloat(stock.volume.replace(/[^\d.]/g, "")) *
      (stock.volume.includes("M") ? 1000000 : stock.volume.includes("K") ? 1000 : 1);
    const newVolume = baseVolume + (Math.random() - 0.3) * volumeChange; // Slightly biased toward volume increases

    // Format the volume with appropriate suffix
    let formattedVolume;
    if (newVolume >= 1000000) {
      formattedVolume = (newVolume / 1000000).toFixed(1) + "M";
    } else if (newVolume >= 1000) {
      formattedVolume = (newVolume / 1000).toFixed(1) + "K";
    } else {
      formattedVolume = newVolume.toFixed(0);
    }

    // Update day range if price is outside current range
    let dayRange = stock.dayRange;
    const [lowStr, highStr] = stock.dayRange.split(" - ");
    const low = Number.parseFloat(lowStr);
    const high = Number.parseFloat(highStr);

    if (newPrice < low) {
      dayRange = `${newPrice.toFixed(2)} - ${highStr}`;
    } else if (newPrice > high) {
      dayRange = `${lowStr} - ${newPrice.toFixed(2)}`;
    }

    return {
      ...stock,
      price: Number.parseFloat(newPrice.toFixed(2)),
      change: Number.parseFloat(newChange.toFixed(2)),
      volume: formattedVolume,
      dayRange: dayRange,
    };
  });
}

function generateMarketEvent(stocks) {
  // More realistic event types with probabilities and impact ranges
  const eventTypes = [
    {
      type: "earnings",
      impact: "positive",
      message: "reported better than expected quarterly earnings",
      probability: 0.2,
      minImpact: 2,
      maxImpact: 8,
    },
    {
      type: "earnings",
      impact: "negative",
      message: "missed earnings expectations",
      probability: 0.2,
      minImpact: 2,
      maxImpact: 10,
    },
    {
      type: "analyst",
      impact: "positive",
      message: "received an upgrade from analysts",
      probability: 0.15,
      minImpact: 1,
      maxImpact: 4,
    },
    {
      type: "analyst",
      impact: "negative",
      message: "was downgraded by analysts",
      probability: 0.15,
      minImpact: 1,
      maxImpact: 5,
    },
    {
      type: "merger",
      impact: "positive",
      message: "announced a strategic acquisition",
      probability: 0.1,
      minImpact: 3,
      maxImpact: 12,
    },
    {
      type: "product",
      impact: "positive",
      message: "launched a new product line",
      probability: 0.1,
      minImpact: 1,
      maxImpact: 6,
    },
    {
      type: "legal",
      impact: "negative",
      message: "facing regulatory scrutiny",
      probability: 0.05,
      minImpact: 3,
      maxImpact: 15,
    },
    {
      type: "management",
      impact: "neutral",
      message: "announced changes in leadership",
      probability: 0.05,
      minImpact: -2,
      maxImpact: 3,
    },
  ];

  // Calculate total probability
  const totalProbability = eventTypes.reduce((sum, event) => sum + event.probability, 0);

  // Select an event type based on probability
  let randomValue = Math.random() * totalProbability;
  let selectedEvent = eventTypes[0];

  for (const event of eventTypes) {
    randomValue -= event.probability;
    if (randomValue <= 0) {
      selectedEvent = event;
      break;
    }
  }

  // Select a stock that makes sense for the event (e.g., tech companies for product launches)
  let eligibleStocks = stocks;

  if (selectedEvent.type === "product" && stocks.some((s) => s.sector === "Technology")) {
    eligibleStocks = stocks.filter((s) => s.sector === "Technology");
  } else if (
    selectedEvent.type === "legal" &&
    stocks.some((s) => ["Financial Services", "Healthcare", "Energy"].includes(s.sector))
  ) {
    eligibleStocks = stocks.filter((s) =>
      ["Financial Services", "Healthcare", "Energy"].includes(s.sector)
    );
  }

  const stock = eligibleStocks[Math.floor(Math.random() * eligibleStocks.length)];

  // Calculate impact based on event type and stock volatility
  let priceImpact = 0;
  const volatilityFactor = stock.volatility || 1.5;

  if (selectedEvent.impact === "positive") {
    // Positive impact with range based on event type
    priceImpact =
      (Math.random() * (selectedEvent.maxImpact - selectedEvent.minImpact) + selectedEvent.minImpact) *
      volatilityFactor;
  } else if (selectedEvent.impact === "negative") {
    // Negative impact with range based on event type
    priceImpact =
      -(
        (Math.random() * (selectedEvent.maxImpact - selectedEvent.minImpact) + selectedEvent.minImpact) *
        volatilityFactor
      );
  } else {
    // Neutral impact (could be slightly positive or negative)
    priceImpact =
      (Math.random() * (selectedEvent.maxImpact - selectedEvent.minImpact) + selectedEvent.minImpact) *
      volatilityFactor;
    if (Math.random() > 0.5) priceImpact *= -1;
  }

  return {
    stock: stock.symbol,
    stockName: stock.name,
    eventType: selectedEvent.type,
    message: `${stock.name} (${stock.symbol}) ${selectedEvent.message}`,
    impact: selectedEvent.impact,
    priceImpact: Number.parseFloat(priceImpact.toFixed(2)),
    timestamp: new Date().toISOString(),
  };
}

function applyMarketEvent(stocks, event) {
  return stocks.map((stock) => {
    if (stock.symbol === event.stock) {
      // Calculate new price with event impact
      const newPrice = stock.price * (1 + event.priceImpact / 100);

      // Update change percentage
      const newChange = stock.change + event.priceImpact;

      // Update volume - events typically increase trading volume
      const volumeMultiplier = 1 + (Math.abs(event.priceImpact) / 100) * 5; // Higher impact = higher volume
      const baseVolume =
        Number.parseFloat(stock.volume.replace(/[^\d.]/g, "")) *
        (stock.volume.includes("M") ? 1000000 : stock.volume.includes("K") ? 1000 : 1);
      const newVolume = baseVolume * volumeMultiplier;

      // Format the volume with appropriate suffix
      let formattedVolume;
      if (newVolume >= 1000000) {
        formattedVolume = (newVolume / 1000000).toFixed(1) + "M";
      } else if (newVolume >= 1000) {
        formattedVolume = (newVolume / 1000).toFixed(1) + "K";
      } else {
        formattedVolume = newVolume.toFixed(0);
      }

      // Update day range if price is outside current range
      let dayRange = stock.dayRange;
      const [lowStr, highStr] = stock.dayRange.split(" - ");
      const low = Number.parseFloat(lowStr);
      const high = Number.parseFloat(highStr);

      if (newPrice < low) {
        dayRange = `${newPrice.toFixed(2)} - ${highStr}`;
      } else if (newPrice > high) {
        dayRange = `${lowStr} - ${newPrice.toFixed(2)}`;
      }

      return {
        ...stock,
        price: Number.parseFloat(newPrice.toFixed(2)),
        change: Number.parseFloat(newChange.toFixed(2)),
        volume: formattedVolume,
        dayRange: dayRange,
      };
    }
    return stock;
  });
}

export default PaperTrading;