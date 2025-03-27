import { collection, doc, getDoc, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "./firebase"

// Fetch all available stocks
export const fetchStocks = async () => {
  try {
    const stocksCollection = collection(db, "stocks")
    const stocksSnapshot = await getDocs(stocksCollection)
    const stocksList = stocksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return { success: true, stocks: stocksList }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Fetch historical data for a stock
export const fetchStockHistory = async (symbol, days = 30) => {
  try {
    const historyRef = collection(db, "stocks", symbol, "history")
    const q = query(historyRef, orderBy("date", "desc"), limit(days))
    const historySnapshot = await getDocs(q)
    const historyData = historySnapshot.docs.map((doc) => doc.data())
    return { success: true, history: historyData }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Fetch market news
export const fetchMarketNews = async (limit = 10) => {
  try {
    const newsRef = collection(db, "market_news")
    const q = query(newsRef, orderBy("publishedAt", "desc"), limit(limit))
    const newsSnapshot = await getDocs(q)
    const newsList = newsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return { success: true, news: newsList }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Fetch market indices
export const fetchMarketIndices = async () => {
  try {
    const indicesRef = doc(db, "market", "indices")
    const indicesSnapshot = await getDoc(indicesRef)
    if (indicesSnapshot.exists()) {
      return { success: true, indices: indicesSnapshot.data() }
    } else {
      return { success: false, error: "Market indices not found" }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Simulate market data updates (for development/demo purposes)
export const simulateMarketData = (stocks, volatilityFactor = 1) => {
  return stocks.map((stock) => {
    // Calculate a random price change based on stock's volatility
    const volatility = stock.volatility || 1.5 // Default volatility if not provided
    const changePercent = (Math.random() - 0.5) * volatility * volatilityFactor
    const newPrice = stock.price * (1 + changePercent / 100)
    const newChange = stock.change + changePercent

    // Simulate trading volume changes
    const volumeChange = Math.floor(Math.random() * 100000)
    const volumeDirection = Math.random() > 0.5 ? 1 : -1
    const baseVolume = Number.parseInt(stock.volume.replace(/[^\d]/g, ""))
    const newVolume = Math.max(10000, baseVolume + volumeChange * volumeDirection)

    // Format the new volume with appropriate suffix (K, M, B)
    let formattedVolume
    if (newVolume >= 1000000000) {
      formattedVolume = (newVolume / 1000000000).toFixed(1) + "B"
    } else if (newVolume >= 1000000) {
      formattedVolume = (newVolume / 1000000).toFixed(1) + "M"
    } else if (newVolume >= 1000) {
      formattedVolume = (newVolume / 1000).toFixed(1) + "K"
    } else {
      formattedVolume = newVolume.toString()
    }

    // Update day range if price is outside current range
    let dayRange = stock.dayRange
    const [lowStr, highStr] = stock.dayRange.split(" - ")
    const low = Number.parseFloat(lowStr)
    const high = Number.parseFloat(highStr)

    if (newPrice < low) {
      dayRange = `${newPrice.toFixed(2)} - ${highStr}`
    } else if (newPrice > high) {
      dayRange = `${lowStr} - ${newPrice.toFixed(2)}`
    }

    return {
      ...stock,
      price: Number.parseFloat(newPrice.toFixed(2)),
      change: Number.parseFloat(newChange.toFixed(2)),
      volume: formattedVolume,
      dayRange: dayRange,
    }
  })
}

// Generate market events (news that can affect stock prices)
export const generateMarketEvent = (stocks) => {
  const eventTypes = [
    { type: "earnings", impact: "positive", message: "reported better than expected quarterly earnings" },
    { type: "earnings", impact: "negative", message: "missed earnings expectations" },
    { type: "analyst", impact: "positive", message: "received an upgrade from analysts" },
    { type: "analyst", impact: "negative", message: "was downgraded by analysts" },
    { type: "merger", impact: "positive", message: "announced a strategic acquisition" },
    { type: "product", impact: "positive", message: "launched a new product line" },
    { type: "legal", impact: "negative", message: "facing regulatory scrutiny" },
    { type: "management", impact: "neutral", message: "announced changes in leadership" },
  ]

  // Randomly select a stock and event
  const stock = stocks[Math.floor(Math.random() * stocks.length)]
  const event = eventTypes[Math.floor(Math.random() * eventTypes.length)]

  // Calculate price impact
  let priceImpact = 0
  if (event.impact === "positive") {
    priceImpact = Math.random() * 5 + 1 // 1% to 6%
  } else if (event.impact === "negative") {
    priceImpact = -(Math.random() * 5 + 1) // -1% to -6%
  }

  return {
    stock: stock.symbol,
    stockName: stock.name,
    eventType: event.type,
    message: `${stock.name} (${stock.symbol}) ${event.message}`,
    impact: event.impact,
    priceImpact: priceImpact,
    timestamp: new Date().toISOString(),
  }
}

// Apply market event to stocks
export const applyMarketEvent = (stocks, event) => {
  return stocks.map((stock) => {
    if (stock.symbol === event.stock) {
      const newPrice = stock.price * (1 + event.priceImpact / 100)
      const newChange = stock.change + event.priceImpact

      return {
        ...stock,
        price: Number.parseFloat(newPrice.toFixed(2)),
        change: Number.parseFloat(newChange.toFixed(2)),
      }
    }
    return stock
  })
}

