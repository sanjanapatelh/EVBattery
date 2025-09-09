import React, { useState, useEffect } from 'react';
import './IndustryStats.css';

const IndustryStats: React.FC = () => {
  const [counters, setCounters] = useState({
    evSales: 0,
    batteryProduction: 0,
    recyclingRate: 0,
    carbonReduction: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  const targetCounters = {
    evSales: 10000000,
    batteryProduction: 500000,
    recyclingRate: 95,
    carbonReduction: 1500000
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.industry-stats');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;

    const animateCounters = () => {
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          evSales: Math.floor(targetCounters.evSales * progress),
          batteryProduction: Math.floor(targetCounters.batteryProduction * progress),
          recyclingRate: Math.floor(targetCounters.recyclingRate * progress),
          carbonReduction: Math.floor(targetCounters.carbonReduction * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targetCounters);
        }
      }, interval);

      return timer;
    };

    const timer = animateCounters();
    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      icon: '🚗',
      value: counters.evSales.toLocaleString(),
      label: 'EVs Sold Globally',
      suffix: '+',
      color: '#667eea'
    },
    {
      icon: '🔋',
      value: counters.batteryProduction.toLocaleString(),
      label: 'Batteries Produced',
      suffix: '+',
      color: '#764ba2'
    },
    {
      icon: '♻️',
      value: counters.recyclingRate,
      label: 'Recycling Rate',
      suffix: '%',
      color: '#f093fb'
    },
    {
      icon: '🌱',
      value: counters.carbonReduction.toLocaleString(),
      label: 'CO₂ Tons Reduced',
      suffix: '+',
      color: '#4facfe'
    }
  ];

  return (
    <section className="industry-stats">
      <div className="container">
        <div className="section-header">
          <h2>Industry Impact</h2>
          <p>Transforming the electric vehicle landscape with sustainable solutions</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card"
              style={{ '--stat-color': stat.color } as React.CSSProperties}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">
                {stat.value}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-progress">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: `${index * 0.2}s`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-info">
          <div className="info-card">
            <h3>Market Growth</h3>
            <p>The EV market is experiencing unprecedented growth with our system enabling transparent and sustainable operations across the entire supply chain.</p>
          </div>
          <div className="info-card">
            <h3>Sustainability Goals</h3>
            <p>Our platform helps achieve ambitious sustainability targets through comprehensive tracking and optimized recycling processes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryStats;
