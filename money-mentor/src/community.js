"use client"

import { useState } from "react"
import "./community.css"
import Navbar from "./Navbar"

function Community({ onLogout, onPageChange }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Larry Book",
      title: "How to build a diversified portfolio?",
      content:
        "I'm new to investing and trying to understand how to properly diversify my portfolio. Should I focus on different sectors, different asset classes, or both? What percentage allocation would you recommend for someone with moderate risk tolerance?",
      likes: 24,
      comments: 8,
      tags: ["Portfolio", "Diversification", "Beginner"],
      timestamp: "2 days ago",
    },
    {
      id: 2,
      author: "Apurva Pichai",
      title: "Tax-saving investment options for salaried professionals",
      content:
        "With the financial year coming to an end, I'm looking for the best tax-saving investment options. I've already maxed out my 80C through EPF contributions. What other options should I consider that can help reduce my tax burden while also providing good returns?",
      likes: 42,
      comments: 15,
      tags: ["Tax Planning", "80C", "Investment"],
      timestamp: "5 days ago",
    },
    {
      id: 3,
      author: "Sergey Bran",
      title: "Best Mutual Funds for 2025: High Returns & Low Risk",
      content:
        "Looking to invest in mutual funds but unsure where to start? I'm searching for the best equity and debt mutual funds for 2025 that offer a balance of returns and risk. Any recommendations for funds with consistent performance over the years?",
      likes: 78,
      comments: 32,
      tags: ["Mutual Funds", "Investing", "Wealth Growth"],
      timestamp: "1 day ago",
    },
    {
      id: 4,
      author: "Elon Scarf",
      title: "How much should I keep in my emergency fund?",
      content:
        "I’ve been trying to build an emergency fund but unsure how much is enough. Some say 3 months' expenses, others recommend 6 months or more. What's the best approach to determine the ideal amount based on my income and expenses?",
      likes: 65,
      comments: 21,
      tags: ["Emergency Fund", "Savings", "Financial Planning"],
      timestamp: "3 days ago",
    },
    {
      id: 5,
      author: "Mynameis Jeff",
      title: "Best Stocks to Buy for Long-Term Wealth Creation",
      content:
        "I'm planning to invest in stocks for long-term wealth creation (10+ years). What are some fundamentally strong stocks or sectors that are expected to perform well in the next decade? Any insights from experienced investors?",
      likes: 112,
      comments: 45,
      tags: ["Stock Market", "Investing", "Long-Term Wealth"],
      timestamp: "2 days ago",
    },  
  ])

  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: "",
  })

  const handleCreatePost = (e) => {
    e.preventDefault()
    // This would normally save the post to a database
    // For now, we'll just close the form
    setShowCreatePost(false)

    // Reset form
    setNewPost({
      title: "",
      content: "",
      tags: "",
    })

    alert("Post creation is currently disabled in this demo.")
  }

  return (
    <div className="community-page">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} />

      <div className="community-container">
        <div className="community-header">
          <h1>Investment Community</h1>
          <p>Connect with fellow investors, share insights, and learn from others' experiences</p>
          <button className="create-post-button" onClick={() => setShowCreatePost(true)}>
            Create Post
          </button>
        </div>

        {showCreatePost && (
          <div className="create-post-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Create a New Post</h2>
                <button className="close-button" onClick={() => setShowCreatePost(false)}>
                  &times;
                </button>
              </div>
              <form className="post-form" onSubmit={handleCreatePost}>
                <div className="form-group">
                  <label htmlFor="post-title">Title</label>
                  <input
                    type="text"
                    id="post-title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Enter a descriptive title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="post-content">Content</label>
                  <textarea
                    id="post-content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Share your thoughts, questions, or insights..."
                    rows="6"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="post-tags">Tags (comma separated)</label>
                  <input
                    type="text"
                    id="post-tags"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    placeholder="e.g., Investing, Stocks, Mutual Funds"
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowCreatePost(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="community-content">
          <div className="community-sidebar">
            <div className="sidebar-section">
              <h3>Popular Tags</h3>
              <div className="tag-list">
                <a href="#" className="tag">
                  Investing
                </a>
                <a href="#" className="tag">
                  Mutual Funds
                </a>
                <a href="#" className="tag">
                  Stocks
                </a>
                <a href="#" className="tag">
                  Tax Planning
                </a>
                <a href="#" className="tag">
                  Retirement
                </a>
                <a href="#" className="tag">
                  SIP
                </a>
                <a href="#" className="tag">
                  Market Analysis
                </a>
                <a href="#" className="tag">
                  Beginner
                </a>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Community Guidelines</h3>
              <ul className="guidelines-list">
                <li>Be respectful and supportive</li>
                <li>No financial advice, only educational content</li>
                <li>No promotion or spam</li>
                <li>Cite sources when sharing information</li>
                <li>Protect your personal information</li>
              </ul>
            </div>
          </div>

          <div className="posts-container">
            <div className="posts-filter">
              <button className="filter-button active">Latest</button>
              <button className="filter-button">Popular</button>
              <button className="filter-button">Unanswered</button>
            </div>

            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-header">
                <div className="post-author">
                <div className="author-avatar">
                  {post.author
                    .split(" ") // Split name into words
                    .map(word => word[0]) // Take the first letter of each word
                    .join("") // Join them to form initials
                    .toUpperCase()} {/* Ensure uppercase */}
                  </div>
                  <span className="author-name">{post.author}</span>
                  <span className="post-time">{post.timestamp}</span>
                </div>

                </div>
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-text">{post.content}</p>
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span className="post-tag" key={index}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="post-actions">
                  <button className="action-button">
                    <span className="action-icon">👍</span>
                    <span className="action-count">{post.likes}</span>
                  </button>
                  <button className="action-button">
                    <span className="action-icon">💬</span>
                    <span className="action-count">{post.comments}</span>
                  </button>
                  <button className="action-button">
                    <span className="action-icon">🔖</span>
                    <span className="action-text">Save</span>
                  </button>
                  <button className="action-button">
                    <span className="action-icon">↗️</span>
                    <span className="action-text">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community

