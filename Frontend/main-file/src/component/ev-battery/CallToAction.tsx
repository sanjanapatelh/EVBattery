import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';

const CallToAction: React.FC = () => {
  return (
    <section className="call-to-action">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Ready to Revolutionize Your EV Operations?</h2>
            <p>
              Join thousands of manufacturers, consumers, and recyclers who are already 
              transforming the electric vehicle industry with our blockchain-powered platform.
            </p>
            
            <div className="cta-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">✅</span>
                <span>Free 30-day trial</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✅</span>
                <span>No setup fees</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✅</span>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
          
          <div className="cta-actions">
            <Link to="/sign-up" className="btn btn-primary">
              Start Free Trial
            </Link>
            <Link to="/services" className="btn btn-outline">
              View Demo
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Contact Sales
            </Link>
          </div>
        </div>
        
        <div className="cta-footer">
          <p>Trusted by leading companies worldwide</p>
          <div className="trusted-logos">
            <div className="logo-placeholder">Tesla</div>
            <div className="logo-placeholder">BMW</div>
            <div className="logo-placeholder">Volkswagen</div>
            <div className="logo-placeholder">Ford</div>
          </div>
        </div>
        
        <div className="cta-auth-section">
          <p className="auth-text">Quick Access</p>
          <div className="auth-quick-links">
            <Link to="/sign-in" className="auth-quick-link">
              <i className="fa-solid fa-sign-in-alt"></i>
              Sign In
            </Link>
            <Link to="/sign-up" className="auth-quick-link">
              <i className="fa-solid fa-user-plus"></i>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
