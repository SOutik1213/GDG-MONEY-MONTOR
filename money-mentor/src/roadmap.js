"use client"

import { useState, useEffect, useContext } from "react"
import "./roadmap.css"
import Navbar from "./Navbar"
import { LanguageContext } from "./LanguageContext"

// Static data for roadmap steps
const roadmapData = [
  {
    id: 1,
    title: "Financial Foundations",
    description: "Learn the basics of personal finance and why investing is important",
    steps: [
      {
        id: "1.1",
        title: "Understanding Money",
        type: "article",
        completed: false,
        content:
          "Money is more than just currency; it's a tool for achieving your goals and securing your future. This article explores the fundamental concepts of money management, budgeting, and financial planning.",
        duration: "5 min read",
      },
      {
        id: "1.2",
        title: "Budgeting Basics",
        type: "video",
        completed: false,
        content: "Learn how to create and maintain a budget that works for your lifestyle.",
        duration: "8 min video",
      },
      {
        id: "1.3",
        title: "Financial Goals Quiz",
        type: "quiz",
        completed: false,
        content: "Test your understanding of setting SMART financial goals.",
        duration: "5 questions",
      },
    ],
  },
  {
    id: 2,
    title: "Investment Fundamentals",
    description: "Understand different investment options and how they work",
    steps: [
      {
        id: "2.1",
        title: "Types of Investments",
        type: "article",
        completed: false,
        content: "Explore various investment vehicles including stocks, bonds, mutual funds, and more.",
        duration: "7 min read",
      },
      {
        id: "2.2",
        title: "Risk vs. Return",
        type: "video",
        completed: false,
        content: "Understand the relationship between risk and potential returns in investing.",
        duration: "10 min video",
      },
      {
        id: "2.3",
        title: "Investment Basics Quiz",
        type: "quiz",
        completed: false,
        content: "Test your knowledge of basic investment concepts.",
        duration: "8 questions",
      },
    ],
  },
  {
    id: 3,
    title: "Stock Market Basics",
    description: "Learn how the stock market works and how to analyze stocks",
    steps: [
      {
        id: "3.1",
        title: "Stock Market 101",
        type: "article",
        completed: false,
        content: "Learn the fundamentals of how stock markets function and why they exist.",
        duration: "8 min read",
      },
      {
        id: "3.2",
        title: "Reading Stock Charts",
        type: "video",
        completed: false,
        content: "Understand how to interpret stock charts and basic technical analysis.",
        duration: "12 min video",
      },
      {
        id: "3.3",
        title: "Company Valuation Basics",
        type: "article",
        completed: false,
        content: "Learn about P/E ratios, EPS, and other fundamental metrics for evaluating stocks.",
        duration: "10 min read",
      },
      {
        id: "3.4",
        title: "Stock Analysis Quiz",
        type: "quiz",
        completed: false,
        content: "Test your ability to analyze stocks using fundamental and technical indicators.",
        duration: "10 questions",
      },
    ],
  },
  {
    id: 4,
    title: "Building Your Portfolio",
    description: "Learn how to create a diversified investment portfolio",
    steps: [
      {
        id: "4.1",
        title: "Asset Allocation",
        type: "article",
        completed: false,
        content: "Understand how to distribute your investments across different asset classes.",
        duration: "6 min read",
      },
      {
        id: "4.2",
        title: "Diversification Strategies",
        type: "video",
        completed: false,
        content: "Learn techniques to reduce risk through proper diversification.",
        duration: "9 min video",
      },
      {
        id: "4.3",
        title: "Portfolio Building Exercise",
        type: "quiz",
        completed: false,
        content: "Practice creating a balanced portfolio based on different scenarios.",
        duration: "Interactive exercise",
      },
    ],
  },
  {
    id: 5,
    title: "Advanced Investment Strategies",
    description: "Explore more sophisticated investment approaches",
    steps: [
      {
        id: "5.1",
        title: "Value Investing",
        type: "article",
        completed: false,
        content: "Learn about Warren Buffett's approach to finding undervalued companies.",
        duration: "12 min read",
      },
      {
        id: "5.2",
        title: "Growth Investing",
        type: "video",
        completed: false,
        content: "Understand how to identify companies with high growth potential.",
        duration: "11 min video",
      },
      {
        id: "5.3",
        title: "Investment Strategies Quiz",
        type: "quiz",
        completed: false,
        content: "Test your understanding of different investment approaches.",
        duration: "8 questions",
      },
    ],
  },
]

function Roadmap({ onLogout, onPageChange, currentPage }) {
  const { translate } = useContext(LanguageContext)
  const [roadmap, setRoadmap] = useState(roadmapData)
  const [activeModule, setActiveModule] = useState(1)
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(null)

  // Calculate overall progress
  useEffect(() => {
    const calculateProgress = () => {
      let completedSteps = 0
      let totalSteps = 0

      roadmap.forEach((module) => {
        module.steps.forEach((step) => {
          totalSteps++
          if (step.completed) completedSteps++
        })
      })

      return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0
    }

    setProgress(calculateProgress())
  }, [roadmap])

  // Mark step as completed
  const completeStep = (moduleId, stepId) => {
    setRoadmap((prevRoadmap) => {
      return prevRoadmap.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            steps: module.steps.map((step) => {
              if (step.id === stepId) {
                return { ...step, completed: true }
              }
              return step
            }),
          }
        }
        return module
      })
    })
  }

  // Handle step click
  const handleStepClick = (moduleId, step) => {
    setActiveStep(step)

    // If it's a quiz and not completed, show the quiz modal
    if (step.type === "quiz" && !step.completed) {
      // In a real app, you would show a quiz modal here
      // For this MVP, we'll just mark it as completed after a delay
      setTimeout(() => {
        completeStep(moduleId, step.id)
        // Show a success message or update UI
      }, 1000)
    }
  }

  // Get icon for step type
  const getStepIcon = (type) => {
    switch (type) {
      case "article":
        return "📄"
      case "video":
        return "🎬"
      case "quiz":
        return "❓"
      default:
        return "📌"
    }
  }

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        <div className="roadmap-header">
          <h1>{translate("roadmap")}</h1>
          <p>Your step-by-step guide to becoming a confident investor</p>

          <div className="roadmap-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-text">{progress}% Complete</div>
          </div>
        </div>

        <div className="roadmap-container">
          <div className="roadmap-modules">
            {roadmap.map((module) => {
              // Calculate module progress
              const totalSteps = module.steps.length
              const completedSteps = module.steps.filter((step) => step.completed).length
              const moduleProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0

              return (
                <div
                  key={module.id}
                  className={`roadmap-module ${activeModule === module.id ? "active" : ""}`}
                  onClick={() => setActiveModule(module.id)}
                >
                  <div className="module-header">
                    <div className="module-number">{module.id}</div>
                    <div className="module-title">{module.title}</div>
                    <div className="module-progress">{moduleProgress}%</div>
                  </div>
                  <div className="module-description">{module.description}</div>
                  <div className="module-progress-bar">
                    <div className="module-progress-fill" style={{ width: `${moduleProgress}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="roadmap-steps">
            <div className="steps-header">
              <h2>{roadmap.find((m) => m.id === activeModule)?.title || "Module Steps"}</h2>
              <p>{roadmap.find((m) => m.id === activeModule)?.description || ""}</p>
            </div>

            <div className="steps-list">
              {roadmap
                .find((m) => m.id === activeModule)
                ?.steps.map((step) => (
                  <div
                    key={step.id}
                    className={`step-item ${step.completed ? "completed" : ""} ${activeStep?.id === step.id ? "active" : ""}`}
                    onClick={() => handleStepClick(activeModule, step)}
                  >
                    <div className="step-icon">{getStepIcon(step.type)}</div>
                    <div className="step-content">
                      <div className="step-title">{step.title}</div>
                      <div className="step-info">
                        <span className="step-type">{step.type.charAt(0).toUpperCase() + step.type.slice(1)}</span>
                        <span className="step-duration">{step.duration}</span>
                      </div>
                    </div>
                    <div className="step-status">
                      {step.completed ? (
                        <span className="status-completed">✓</span>
                      ) : (
                        <span className="status-pending">→</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {activeStep && (
            <div className="step-details card">
              <div className="card-header">
                <h2>{activeStep.title}</h2>
                <div className="step-type-badge">{activeStep.type}</div>
              </div>
              <div className="card-content">
                <p className="step-content-text">{activeStep.content}</p>

                {activeStep.type === "article" && (
                  <div className="article-preview">
                    <p>
                      This is a preview of the article content. In a full implementation, this would be the complete
                      article.
                    </p>
                    <p>
                      The article would cover all aspects of {activeStep.title.toLowerCase()} in detail, with examples
                      and practical advice.
                    </p>
                  </div>
                )}

                {activeStep.type === "video" && (
                  <div className="video-placeholder">
                    <div className="video-container">
                      <div className="video-play-button">▶</div>
                      <div className="video-title">{activeStep.title}</div>
                      <div className="video-duration">{activeStep.duration}</div>
                    </div>
                  </div>
                )}

                {activeStep.type === "quiz" && (
                  <div className="quiz-preview">
                    <p>This quiz will test your knowledge of {activeStep.title.toLowerCase()}.</p>
                    <p>
                      In a full implementation, this would be an interactive quiz with multiple-choice questions and
                      immediate feedback.
                    </p>

                    {!activeStep.completed && (
                      <button className="btn btn-primary" onClick={() => completeStep(activeModule, activeStep.id)}>
                        Take Quiz
                      </button>
                    )}
                  </div>
                )}

                {activeStep.completed ? (
                  <div className="completion-status completed">
                    <span className="status-icon">✓</span>
                    <span className="status-text">Completed</span>
                  </div>
                ) : (
                  <div className="completion-status">
                    <button className="btn btn-primary" onClick={() => completeStep(activeModule, activeStep.id)}>
                      Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Roadmap

