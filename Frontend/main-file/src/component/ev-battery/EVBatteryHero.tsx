import React from 'react';
import { Link } from 'react-router-dom';
import './EVBatteryHero.css';

const EVBatteryHero: React.FC = () => {
  return (
    <section className="ev-battery-hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="floating-elements">
          <div className="floating-battery">🔋</div>
          <div className="floating-ev">🚗</div>
          <div className="floating-recycle">♻️</div>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-highlight">EV Battery</span>
              <br />
              Management System
            </h1>
            <p className="hero-subtitle">
              Revolutionizing the electric vehicle industry with blockchain-powered 
              supply chain transparency, from battery manufacturing to sustainable recycling
            </p>
            
            <div className="hero-buttons">
              <Link to="/sign-up" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/services" className="btn btn-outline">
                Explore Supply Chain
              </Link>
            </div>
            
            <div className="hero-auth-links">
              <span className="auth-divider">Already have an account?</span>
              <div className="auth-buttons">
                <Link to="/sign-in" className="btn btn-ghost">
                  <i className="fa-solid fa-sign-in-alt"></i>
                  Sign In
                </Link>
                <Link to="/sign-up" className="btn btn-ghost">
                  <i className="fa-solid fa-user-plus"></i>
                  Sign Up
                </Link>
              </div>
            </div>
            
            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <span>Blockchain Security</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <span>Real-time Tracking</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">♻️</div>
                <span>Sustainable Recycling</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image">
              <div className="supply-chain-preview">
                <div className="chain-node battery-manufacturer">
                  <span>🔋</span>
                  <p>Battery<br/>Manufacturer</p>
                </div>
                <div className="chain-arrow">→</div>
                <div className="chain-node ev-manufacturer">
                  <span>🚗</span>
                  <p>EV<br/>Manufacturer</p>
                </div>
                <div className="chain-arrow">→</div>
                <div className="chain-node consumer">
                  <span>👤</span>
                  <p>Consumer</p>
                </div>
                <div className="chain-arrow">→</div>
                <div className="chain-node recycler">
                  <span>♻️</span>
                  <p>Recycler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EVBatteryHero;
