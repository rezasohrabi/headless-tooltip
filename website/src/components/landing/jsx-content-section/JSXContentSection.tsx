import React, { useState } from 'react';
import Tooltip from 'headless-tooltip';
import './JSXContentSection.css';

function JSXContentSection() {
  const [likeCount, setLikeCount] = useState(42);
  const [rating, setRating] = useState(4);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const interactiveTooltips = [
    {
      id: 1,
      trigger: '📊',
      x: 15,
      y: 20,
      content: (
        <div className="jsx-tooltip chart-tooltip">
          <h3>📈 Sales Analytics</h3>
          <div className="chart-container">
            <div
              className="chart-bar"
              style={{ height: '60%', background: '#10b981' }}
            >
              <span>Jan: $12K</span>
            </div>
            <div
              className="chart-bar"
              style={{ height: '80%', background: '#3b82f6' }}
            >
              <span>Feb: $18K</span>
            </div>
            <div
              className="chart-bar"
              style={{ height: '100%', background: '#f59e0b' }}
            >
              <span>Mar: $24K</span>
            </div>
          </div>
          <p className="growth">📈 +25% this quarter</p>
        </div>
      ),
    },
    {
      id: 2,
      trigger: '👤',
      x: 80,
      y: 15,
      content: (
        <div className="jsx-tooltip profile-card">
          <div className="profile-header">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%236366f1'/%3E%3Ctext x='30' y='38' text-anchor='middle' fill='white' font-size='24'%3E👨‍💻%3C/text%3E%3C/svg%3E"
              alt="Profile"
            />
            <div>
              <h4>Sarah Johnson</h4>
              <span className="badge">Pro User</span>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat">
              <strong>127</strong>
              <span>Projects</span>
            </div>
            <div className="stat">
              <strong>2.4K</strong>
              <span>Followers</span>
            </div>
            <div className="stat">
              <strong>98%</strong>
              <span>Rating</span>
            </div>
          </div>
          <button className="profile-btn">View Profile</button>
        </div>
      ),
    },
    {
      id: 3,
      trigger: '📝',
      x: 25,
      y: 70,
      content: (
        <div className="jsx-tooltip form-tooltip">
          <h3>✉️ Quick Contact</h3>
          <form className="contact-form">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      ),
    },
    {
      id: 4,
      trigger: '❤️',
      x: 75,
      y: 65,
      content: (
        <div className="jsx-tooltip interactive-tooltip">
          <div className="like-section">
            <h4>💝 Like this post?</h4>
            <div className="like-container">
              <button
                className="like-btn"
                onClick={() => setLikeCount(likeCount + 1)}
              >
                👍 Like ({likeCount})
              </button>
              <div className="social-buttons">
                <button>📤 Share</button>
                <button>💬 Comment</button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      trigger: '⭐',
      x: 50,
      y: 30,
      content: (
        <div className="jsx-tooltip rating-tooltip">
          <h3>⭐ Rate Experience</h3>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star ${star <= rating ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                ⭐
              </button>
            ))}
          </div>
          <p className="rating-text">
            {rating <= 2
              ? '😞 We can do better!'
              : rating <= 3
                ? "😐 It's okay"
                : rating <= 4
                  ? '😊 Pretty good!'
                  : '🎉 Excellent!'}
          </p>
          <button className="submit-rating">Submit Rating</button>
        </div>
      ),
    },
    {
      id: 6,
      trigger: '🛒',
      x: 35,
      y: 85,
      content: (
        <div className="jsx-tooltip shopping-cart">
          <h3>🛍️ Shopping Cart</h3>
          <div className="cart-items">
            <div className="cart-item">
              <span>📱 iPhone 15 Pro</span>
              <span className="price">$999</span>
            </div>
            <div className="cart-item">
              <span>⌚ Apple Watch</span>
              <span className="price">$399</span>
            </div>
            <div className="cart-divider"></div>
            <div className="cart-total">
              <strong>Total: $1,398</strong>
            </div>
          </div>
          <button className="checkout-btn">💳 Checkout Now</button>
        </div>
      ),
    },
    {
      id: 7,
      trigger: '📋',
      x: 65,
      y: 40,
      content: (
        <div className="jsx-tooltip todo-tooltip">
          <h3>✅ Task Manager</h3>
          <div className="todo-list">
            <div className="todo-item completed">
              <input type="checkbox" checked readOnly />
              <span>Design new homepage</span>
            </div>
            <div className="todo-item">
              <input type="checkbox" />
              <span>Review pull requests</span>
            </div>
            <div className="todo-item">
              <input type="checkbox" />
              <span>Update documentation</span>
            </div>
          </div>
          <button className="add-task">+ Add Task</button>
        </div>
      ),
    },
    {
      id: 8,
      trigger: '🎨',
      x: 90,
      y: 50,
      content: (
        <div className="jsx-tooltip palette-tooltip">
          <h3>🎨 Color Palette</h3>
          <div className="color-grid">
            <div
              className="color-swatch"
              style={{ backgroundColor: '#ef4444' }}
            ></div>
            <div
              className="color-swatch"
              style={{ backgroundColor: '#f59e0b' }}
            ></div>
            <div
              className="color-swatch"
              style={{ backgroundColor: '#10b981' }}
            ></div>
            <div
              className="color-swatch"
              style={{ backgroundColor: '#3b82f6' }}
            ></div>
            <div
              className="color-swatch"
              style={{ backgroundColor: '#8b5cf6' }}
            ></div>
            <div
              className="color-swatch"
              style={{ backgroundColor: '#ec4899' }}
            ></div>
          </div>
          <div className="color-info">
            <strong>Primary: #3b82f6</strong>
            <p>Modern blue for buttons and links</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="jsx-content-section">
      <div className="jsx-background">
        <div className="jsx-content">
          <h2 className="jsx-title">Rich Interactive Content</h2>
          <p className="jsx-subtitle">
            Beyond simple text. Build interactive tooltips with forms, buttons,
            charts, and any React component you can imagine. The possibilities
            are endless.
          </p>

          <div className="jsx-demo-area">
            {interactiveTooltips.map((tooltip) => (
              <div
                key={tooltip.id}
                className="jsx-trigger-wrapper"
                style={{
                  left: `${tooltip.x}%`,
                  top: `${tooltip.y}%`,
                  animationDelay: `${tooltip.id * 0.15}s`,
                }}
              >
                <Tooltip
                  content={tooltip.content}
                  placement="top"
                  arrow={true}
                  arrowSize={14}
                  className="jsx-tooltip-container"
                  disableInteractive={false}
                  openDelay={200}
                  closeDelay={300}
                  zIndex={9999}
                >
                  <button className="jsx-trigger">
                    <span className="jsx-emoji">{tooltip.trigger}</span>
                  </button>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JSXContentSection;
