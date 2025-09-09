import React, { useState } from 'react';
import HeaderSection3 from "../component/header/HeaderSection3";
import FooterSection from "../component/footer/FooterSection";
import './Services.css';

interface SupplyChainStage {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  processes: string[];
  benefits: string[];
  color: string;
  nextStage?: string;
}

const Services: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const supplyChainStages: SupplyChainStage[] = [
    {
      id: 'battery-manufacturing',
      title: 'Battery Manufacturing',
      icon: '🔋',
      description: 'Advanced lithium-ion battery production with comprehensive quality assurance and blockchain registration',
      details: [
        'Raw material sourcing and processing',
        'Cell manufacturing and assembly',
        'Quality testing and certification',
        'Battery type registration on blockchain',
        'Performance validation and safety testing'
      ],
      processes: [
        'Material procurement and quality control',
        'Cell design and manufacturing',
        'Battery pack assembly',
        'Testing and certification',
        'Blockchain registration and tracking'
      ],
      benefits: [
        'Transparent supply chain tracking',
        'Quality assurance and compliance',
        'Reduced manufacturing defects',
        'Improved battery performance',
        'Sustainable material sourcing'
      ],
      color: '#667eea',
      nextStage: 'ev-manufacturing'
    },
    {
      id: 'ev-manufacturing',
      title: 'EV Manufacturing',
      icon: '🚗',
      description: 'Electric vehicle assembly with integrated battery systems and comprehensive testing protocols',
      details: [
        'Battery integration and testing',
        'Vehicle assembly and quality control',
        'Performance testing and validation',
        'EV registration on blockchain',
        'Safety and compliance verification'
      ],
      processes: [
        'Battery system integration',
        'Vehicle assembly and testing',
        'Performance optimization',
        'Safety validation',
        'Blockchain registration'
      ],
      benefits: [
        'Optimized battery integration',
        'Enhanced vehicle performance',
        'Improved safety standards',
        'Transparent manufacturing process',
        'Quality assurance tracking'
      ],
      color: '#764ba2',
      nextStage: 'distribution'
    },
    {
      id: 'distribution',
      title: 'Distribution & Sales',
      icon: '📦',
      description: 'Efficient logistics and customer delivery systems with ownership transfer tracking',
      details: [
        'Inventory management and tracking',
        'Logistics and transportation',
        'Customer delivery and setup',
        'Ownership transfer on blockchain',
        'Customer support and training'
      ],
      processes: [
        'Inventory optimization',
        'Route planning and logistics',
        'Customer delivery coordination',
        'Ownership transfer processing',
        'Post-sale support'
      ],
      benefits: [
        'Reduced delivery times',
        'Improved customer satisfaction',
        'Transparent ownership transfer',
        'Better inventory management',
        'Enhanced customer support'
      ],
      color: '#f093fb',
      nextStage: 'consumer-usage'
    },
    {
      id: 'consumer-usage',
      title: 'Consumer Usage',
      icon: '👤',
      description: 'Daily operation monitoring, maintenance tracking, and performance optimization',
      details: [
        'Usage monitoring and analytics',
        'Performance optimization',
        'Maintenance scheduling',
        'Battery health tracking',
        'User behavior analysis'
      ],
      processes: [
        'Real-time monitoring',
        'Performance analytics',
        'Predictive maintenance',
        'Battery health assessment',
        'User experience optimization'
      ],
      benefits: [
        'Extended battery lifespan',
        'Optimized performance',
        'Reduced maintenance costs',
        'Better user experience',
        'Data-driven insights'
      ],
      color: '#4facfe',
      nextStage: 'end-of-life'
    },
    {
      id: 'end-of-life',
      title: 'End of Life Assessment',
      icon: '⏰',
      description: 'Comprehensive battery lifecycle assessment and recycling preparation',
      details: [
        'Battery performance evaluation',
        'Recycling eligibility assessment',
        'Environmental impact analysis',
        'Recycling preparation',
        'Sustainability reporting'
      ],
      processes: [
        'Performance degradation analysis',
        'Recycling feasibility study',
        'Environmental impact assessment',
        'Recycling preparation planning',
        'Sustainability documentation'
      ],
      benefits: [
        'Informed recycling decisions',
        'Environmental compliance',
        'Reduced waste generation',
        'Sustainability reporting',
        'Circular economy contribution'
      ],
      color: '#43e97b',
      nextStage: 'recycling'
    },
    {
      id: 'recycling',
      title: 'Recycling & Recovery',
      icon: '♻️',
      description: 'Sustainable material recovery and environmental protection with circular economy principles',
      details: [
        'Battery disassembly and processing',
        'Material separation and recovery',
        'Environmental compliance',
        'Circular economy contribution',
        'Sustainability reporting'
      ],
      processes: [
        'Safe battery disassembly',
        'Material extraction and purification',
        'Environmental compliance verification',
        'Recycled material processing',
        'Sustainability impact assessment'
      ],
      benefits: [
        'Material recovery and reuse',
        'Environmental protection',
        'Regulatory compliance',
        'Circular economy support',
        'Reduced carbon footprint'
      ],
      color: '#fa709a'
    }
  ];

  const handleStageClick = (stageId: string) => {
    setSelectedStage(stageId);
    setShowTimeline(true);
  };

  const closeTimeline = () => {
    setShowTimeline(false);
    setSelectedStage(null);
  };

  const getSelectedStage = () => {
    return supplyChainStages.find(stage => stage.id === selectedStage);
  };

  return (
    <main>
      <HeaderSection3 />
      
      <section className="services-hero">
        <div className="container">
          <div className="hero-content">
            <h1>EV Battery Supply Chain Services</h1>
            <p>Comprehensive end-to-end management solutions for the electric vehicle industry</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowTimeline(true)}
            >
              Explore Complete Flow
            </button>
          </div>
        </div>
      </section>

      <section className="supply-chain-services">
        <div className="container">
          <div className="section-header">
            <h2>Our Supply Chain Services</h2>
            <p>Click on any stage to explore detailed processes, benefits, and implementation details</p>
          </div>

          <div className="stages-timeline">
            {supplyChainStages.map((stage, index) => (
              <div key={stage.id} className="timeline-item">
                <div 
                  className={`stage-card ${selectedStage === stage.id ? 'active' : ''}`}
                  onClick={() => handleStageClick(stage.id)}
                  style={{ '--stage-color': stage.color } as React.CSSProperties}
                >
                  <div className="stage-icon">{stage.icon}</div>
                  <h3 className="stage-title">{stage.title}</h3>
                  <p className="stage-description">{stage.description}</p>
                  <div className="stage-number">{index + 1}</div>
                </div>
                
                {stage.nextStage && (
                  <div className="timeline-connector">
                    <div className="connector-line"></div>
                    <div className="connector-arrow">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline Modal */}
      {showTimeline && selectedStage && (
        <div className="timeline-modal-overlay" onClick={closeTimeline}>
          <div className="timeline-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close-btn" onClick={closeTimeline}>×</button>
              <h3>{getSelectedStage()?.title}</h3>
              <div className="stage-icon-large">{getSelectedStage()?.icon}</div>
            </div>
            
            <div className="modal-content">
              <div className="stage-overview">
                <h4>Overview</h4>
                <p>{getSelectedStage()?.description}</p>
              </div>
              
              <div className="stage-details">
                <h4>Key Details</h4>
                <ul>
                  {getSelectedStage()?.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="stage-processes">
                <h4>Core Processes</h4>
                <ul>
                  {getSelectedStage()?.processes.map((process, index) => (
                    <li key={index}>{process}</li>
                  ))}
                </ul>
              </div>

              <div className="stage-benefits">
                <h4>Benefits</h4>
                <ul>
                  {getSelectedStage()?.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {getSelectedStage()?.nextStage && (
                <div className="next-stage-info">
                  <span>Next Stage:</span>
                  <strong>
                    {supplyChainStages.find(s => s.id === getSelectedStage()?.nextStage)?.title}
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h3>Ready to Implement Our Solutions?</h3>
            <p>Transform your EV operations with our comprehensive supply chain management platform</p>
            <div className="cta-buttons">
              <a href="/sign-up" className="btn btn-primary">Get Started</a>
              <a href="/contact" className="btn btn-outline">Contact Us</a>
            </div>
            
            <div className="services-auth-section">
              <p className="auth-text">Get Started Today</p>
              <div className="auth-quick-links">
                <a href="/sign-in" className="auth-quick-link">
                  <i className="fa-solid fa-sign-in-alt"></i>
                  Sign In
                </a>
                <a href="/sign-up" className="auth-quick-link">
                  <i className="fa-solid fa-user-plus"></i>
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection
        logo="assets/img/rv-9-logo-light.png"
        footerFormStyle="rv-9-footer-nwsltr__form"
      />
      
      {/* Floating Authentication Button */}
      <div className="floating-auth-button">
        <div className="auth-toggle">
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="auth-dropdown">
          <Link to="/sign-in" className="auth-dropdown-item">
            <i className="fa-solid fa-sign-in-alt"></i>
            Sign In
          </Link>
          <Link to="/sign-up" className="auth-dropdown-item">
            <i className="fa-solid fa-user-plus"></i>
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Services;
