import React from 'react';
import './KeyFeatures.css';

const KeyFeatures: React.FC = () => {
  const features = [
    {
      icon: '🔒',
      title: 'Blockchain Security',
      description: 'Immutable, tamper-proof records ensuring data integrity and transparency across the entire supply chain.',
      color: '#667eea'
    },
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Live monitoring of battery and EV status, location, and performance metrics throughout their lifecycle.',
      color: '#764ba2'
    },
    {
      icon: '♻️',
      title: 'Sustainable Recycling',
      description: 'End-to-end tracking ensures proper disposal and maximizes material recovery for circular economy.',
      color: '#f093fb'
    },
    {
      icon: '🌍',
      title: 'Environmental Impact',
      description: 'Comprehensive carbon footprint tracking and sustainability metrics for responsible business practices.',
      color: '#4facfe'
    },
    {
      icon: '⚡',
      title: 'Performance Analytics',
      description: 'Advanced analytics and insights to optimize battery performance and extend operational lifespan.',
      color: '#43e97b'
    },
    {
      icon: '🤝',
      title: 'Stakeholder Collaboration',
      description: 'Seamless integration between manufacturers, consumers, and recyclers for efficient operations.',
      color: '#fa709a'
    }
  ];

  return (
    <section className="key-features">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Our System?</h2>
          <p>Advanced technology meets sustainability in the most comprehensive EV battery management solution</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
              style={{ '--feature-color': feature.color } as React.CSSProperties}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-number">{index + 1}</div>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <div className="cta-content">
            <h3>Ready to Transform Your EV Operations?</h3>
            <p>Join the future of sustainable transportation with our comprehensive battery management platform</p>
            <div className="cta-buttons">
              <a href="/sign-up" className="btn btn-primary">Get Started Today</a>
              <a href="/services" className="btn btn-outline">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
