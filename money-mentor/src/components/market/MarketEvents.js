"use client"

import { useState, useEffect } from "react"
import "./MarketEvents.css"

function MarketEvents({ events, onEventClick }) {
  const [activeEvent, setActiveEvent] = useState(null)

  useEffect(() => {
    if (events.length > 0 && !activeEvent) {
      setActiveEvent(events[0])
    }
  }, [events, activeEvent])

  const handleEventClick = (event) => {
    setActiveEvent(event)
    if (onEventClick) {
      onEventClick(event)
    }
  }

  if (events.length === 0) {
    return null
  }

  return (
    <div className="market-events-container">
      <div className="market-events-header">
        <h3>Market Events</h3>
      </div>
      <div className="market-events-list">
        {events.map((event, index) => (
          <div
            key={index}
            className={`event-item ${activeEvent === event ? "active" : ""} ${event.impact}`}
            onClick={() => handleEventClick(event)}
          >
            <div className="event-time">
              {new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="event-content">
              <div className="event-stock">{event.stock}</div>
              <div className="event-message">{event.message}</div>
              <div className={`event-impact ${event.impact}`}>
                {event.priceImpact > 0 ? "+" : ""}
                {event.priceImpact.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketEvents

