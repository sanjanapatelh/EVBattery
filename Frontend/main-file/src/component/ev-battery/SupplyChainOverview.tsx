import React, { useState } from 'react';
import './SupplyChainOverview.css';

interface SupplyChainStage {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  color: string;
  nextStage?: string;
}

const SupplyChainOverview: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [showFlow, setShowFlow] = useState(false);

  const supplyChainStages: SupplyChainStage[] = [
    {
      id: 'battery-manufacturing',
      title: 'Battery Manufacturing',
      icon: '🔋',
      description: 'Advanced lithium-ion battery production with quality assurance',
      details: [
        'Raw material sourcing and processing',
        'Cell manufacturing and assembly',
        'Quality testing and certification',
        'Battery type registration on blockchain'
      ],
      color: '#667eea',
      nextStage: 'ev-manufacturing'
    },
    {
      id: 'ev-manufacturing',
      title: 'EV Manufacturing',
      icon: '🚗',
      description: 'Electric vehicle assembly with integrated battery systems',
      details: [
        'Battery integration and testing',
        'Vehicle assembly and quality control',
        'Performance testing and validation',
        'EV registration on blockchain'
      ],
      color: '#764ba2',
      nextStage: 'distribution'
    },
    {
      id: 'distribution',
      title: 'Distribution & Sales',
      icon: '📦',
      description: 'Efficient logistics and customer delivery systems',
      details: [
        'Inventory management',
        'Logistics and transportation',
        'Customer delivery and setup',
        'Ownership transfer on blockchain'
      ],
      color: '#f093fb',
      nextStage: 'consumer-usage'
    },
    {
      id: 'consumer-usage',
      title: 'Consumer Usage',
      icon: '👤',
      description: 'Daily operation and maintenance tracking',
      details: [
        'Usage monitoring and analytics',
        'Performance optimization',
        'Maintenance scheduling',
        'Battery health tracking'
      ],
      color: '#4facfe',
      nextStage: 'end-of-life'
    },
    {
      id: 'end-of-life',
      title: 'End of Life',
      icon: '⏰',
      description: 'Battery lifecycle assessment and recycling preparation',
      details: [
        'Battery performance evaluation',
        'Recycling eligibility assessment',
        'Environmental impact analysis',
        'Recycling preparation'
      ],
      color: '#43e97b',
      nextStage: 'recycling'
    },
    {
      id: 'recycling',
      title: 'Recycling & Recovery',
      icon: '♻️',
      description: 'Sustainable material recovery and environmental protection',
      details: [
        'Battery disassembly',
        'Material separation and recovery',
        'Environmental compliance',
        'Circular economy contribution'
      ],
      color: '#fa709a'
    }
  ];

  const handleStageClick = (stageId: string) => {
    setSelectedStage(stageId);
    setShowFlow(true);
  };

  const closeFlow = () => {
    setShowFlow(false);
    setSelectedStage(null);
  };

  const getSelectedStage = () => {
    return supplyChainStages.find(stage => stage.id === selectedStage);
  };

  return (
    <section className="supply-chain-overview">
      <div className="container">
        <div className="section-header">
          <h2>Complete Supply Chain Journey</h2>
          <p>Explore the end-to-end lifecycle of EV batteries from manufacturing to sustainable recycling</p>
        </div>

        <div className="stages-grid">
          {supplyChainStages.map((stage, index) => (
            <div
              key={stage.id}
              className={`stage-card ${selectedStage === stage.id ? 'active' : ''}`}
              onClick={() => handleStageClick(stage.id)}
              style={{ '--stage-color': stage.color } as React.CSSProperties}
            >
              <div className="stage-icon">{stage.icon}</div>
              <h3 className="stage-title">{stage.title}</h3>
              <p className="stage-description">{stage.description}</p>
              <div className="stage-number">{index + 1}</div>
              {stage.nextStage && (
                <div className="stage-arrow">
                  <span>→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Flow Modal */}
        {showFlow && selectedStage && (
          <div className="flow-modal-overlay" onClick={closeFlow}>
            <div className="flow-modal" onClick={(e) => e.stopPropagation()}>
              <div className="flow-modal-header">
                <button className="close-btn" onClick={closeFlow}>×</button>
                <h3>{getSelectedStage()?.title}</h3>
                <div className="stage-icon-large">{getSelectedStage()?.icon}</div>
              </div>
              
              <div className="flow-modal-content">
                <div className="flow-description">
                  <p>{getSelectedStage()?.description}</p>
                </div>
                
                <div className="flow-details">
                  <h4>Key Processes:</h4>
                  <ul>
                    {getSelectedStage()?.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="flow-navigation">
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
          </div>
        )}

        <div className="cta-section">
          <p>Click on any stage to explore the detailed process flow</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowFlow(true)}
          >
            View Complete Flow
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupplyChainOverview;
