import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import './QuotesSection.css';

function QuotesSection() {
  // Practical tooltip examples for real-world usage
  const demoTooltips = {
    row1: [
      { id: 1, icon: '💾', content: 'Save Document', type: 'save' },
      { id: 2, icon: '✏️', content: 'Edit Profile', type: 'edit' },
      { id: 3, icon: '🗑️', content: 'Delete Item', type: 'delete' },
      { id: 4, icon: '📤', content: 'Share with Friends', type: 'share' },
      { id: 5, icon: '❤️', content: 'Add to Favorites', type: 'favorite' },
      { id: 6, icon: '🔍', content: 'Search Results', type: 'search' },
      { id: 7, icon: '⚙️', content: 'Settings', type: 'settings' },
      { id: 8, icon: '📊', content: 'View Analytics', type: 'analytics' },
    ],
    row2: [
      { id: 9, icon: '💬', content: '5 new messages', type: 'notification' },
      {
        id: 10,
        icon: '✅',
        content: 'Task completed successfully!',
        type: 'success',
      },
      {
        id: 11,
        icon: '⚠️',
        content: 'Please check your input',
        type: 'warning',
      },
      { id: 12, icon: '❌', content: 'Connection failed', type: 'error' },
      {
        id: 13,
        icon: 'ℹ️',
        content: 'Learn more about this feature',
        type: 'info',
      },
      {
        id: 14,
        icon: '🔒',
        content: 'Premium Feature - Upgrade Now',
        type: 'premium',
      },
      { id: 15, icon: '📧', content: 'Send Email', type: 'email' },
      { id: 16, icon: '📱', content: 'Mobile App Available', type: 'mobile' },
    ],
    row3: [
      { id: 17, icon: '👤', content: 'View Profile', type: 'profile' },
      { id: 18, icon: '🔔', content: 'Enable Notifications', type: 'bell' },
      { id: 19, icon: '📁', content: 'Open Folder', type: 'folder' },
      { id: 20, icon: '🌐', content: 'Visit Website', type: 'web' },
      { id: 21, icon: '⭐', content: 'Rate 5 Stars', type: 'rating' },
      { id: 22, icon: '🎯', content: 'Set Goal', type: 'goal' },
      { id: 23, icon: '🔄', content: 'Sync Data', type: 'sync' },
      { id: 24, icon: '📈', content: 'Growth +25%', type: 'growth' },
    ],
  };

  const renderCSSTooltip = (item, placement) => {
    return (
      <div
        className={`css-tooltip css-tooltip--${item.type} css-tooltip--${placement}`}
      >
        <div className="css-tooltip-arrow"></div>
        <div className="css-tooltip-content">{item.content}</div>
      </div>
    );
  };

  const renderTooltip = (item) => {
    const styles = {
      basic: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '4px',
      },
      arrow: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: '8px',
      },
      colorful: {
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '12px',
      },
      dark: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #333',
      },
      large: {
        backgroundColor: '#f8f9fa',
        color: '#212529',
        padding: '16px 20px',
        borderRadius: '8px',
        minWidth: '200px',
      },
      animated: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '6px',
        animation: 'pulse 2s infinite',
      },
      bordered: {
        backgroundColor: '#fff',
        color: '#333',
        padding: '10px 14px',
        border: '2px solid #007bff',
        borderRadius: '4px',
      },
      gradient: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '10px',
      },
      rich: {
        backgroundColor: '#fff',
        color: '#333',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxWidth: '300px',
      },
      success: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #c3e6cb',
      },
      warning: {
        backgroundColor: '#fff3cd',
        color: '#856404',
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #ffeeba',
      },
      error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #f5c6cb',
      },
      info: {
        backgroundColor: '#d1ecf1',
        color: '#0c5460',
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #bee5eb',
      },
      custom: {
        backgroundColor: '#6f42c1',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '20px',
        clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)',
      },
      premium: {
        background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
        color: '#333',
        padding: '12px 18px',
        borderRadius: '8px',
        fontWeight: 'bold',
      },
      playful: {
        backgroundColor: '#ff6b9d',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '20px',
        transform: 'rotate(-2deg)',
      },
      rainbow: {
        background:
          'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8f00ff)',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '8px',
      },
      soft: {
        backgroundColor: '#f8f9fa',
        color: '#495057',
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
      glow: {
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '6px',
        boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88',
      },
      celebration: {
        backgroundColor: '#ff6b6b',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        animation: 'bounce 1s infinite',
      },
      elegant: {
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '14px 18px',
        borderRadius: '4px',
        fontFamily: 'serif',
        letterSpacing: '0.5px',
      },
      futuristic: {
        background: 'linear-gradient(45deg, #0f3460, #16537e)',
        color: '#00d4ff',
        padding: '10px 14px',
        borderRadius: '0',
        clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
      },
      gaming: {
        backgroundColor: '#0d1421',
        color: '#00ff41',
        padding: '10px 14px',
        borderRadius: '4px',
        border: '1px solid #00ff41',
        fontFamily: 'monospace',
      },
      fluid: {
        background:
          'linear-gradient(270deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4)',
        backgroundSize: '800% 800%',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '20px',
        animation: 'gradientShift 3s ease infinite',
      },
    };

    return (
      <div
        className={`demo-tooltip demo-tooltip--${item.type}`}
        style={styles[item.type]}
      >
        {item.content}
      </div>
    );
  };

  return (
    <section className="quotes-section">
      <div className="quotes-background">
        <h2 className="quotes-title">Infinite Styling Possibilities</h2>
        <p className="quotes-subtitle">
          With headless architecture, you control every pixel. From minimalist
          to bold - create any design you envision with complete styling
          freedom.
        </p>

        <div className="slider-container">
          {/* Row 1 - Left to Right */}
          <div className="slider-row">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView="auto"
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                stopOnLastSlide: false,
                reverseDirection: false,
              }}
              speed={8000}
              loop={true}
              allowTouchMove={false}
              grabCursor={false}
              watchSlidesProgress={false}
              className="tooltip-swiper"
            >
              {[
                ...demoTooltips.row1,
                ...demoTooltips.row1,
                ...demoTooltips.row1,
                ...demoTooltips.row1,
                ...demoTooltips.row1,
              ].map((item, index) => (
                <SwiperSlide key={`row1-${index}`} className="tooltip-slide">
                  {renderCSSTooltip(item, 'top')}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="slider-row">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView="auto"
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                stopOnLastSlide: false,
                reverseDirection: true,
              }}
              speed={9000}
              loop={true}
              allowTouchMove={false}
              grabCursor={false}
              watchSlidesProgress={false}
              className="tooltip-swiper"
            >
              {[
                ...demoTooltips.row2,
                ...demoTooltips.row2,
                ...demoTooltips.row2,
                ...demoTooltips.row2,
                ...demoTooltips.row2,
              ].map((item, index) => (
                <SwiperSlide key={`row2-${index}`} className="tooltip-slide">
                  {renderCSSTooltip(item, 'top')}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Row 3 - Left to Right (Slower) */}
          <div className="slider-row">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView="auto"
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                stopOnLastSlide: false,
                reverseDirection: false,
              }}
              speed={10000}
              loop={true}
              allowTouchMove={false}
              grabCursor={false}
              watchSlidesProgress={false}
              className="tooltip-swiper"
            >
              {[
                ...demoTooltips.row3,
                ...demoTooltips.row3,
                ...demoTooltips.row3,
                ...demoTooltips.row3,
                ...demoTooltips.row3,
              ].map((item, index) => (
                <SwiperSlide key={`row3-${index}`} className="tooltip-slide">
                  {renderCSSTooltip(item, 'top')}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Floating particles for ambient effect */}
        <div className="ambient-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 25}s`,
                animationDuration: `${20 + Math.random() * 15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuotesSection;
