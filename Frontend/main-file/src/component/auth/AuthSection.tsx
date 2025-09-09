import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import AuthForm from "../form/AuthForm";
import { useState } from "react";

type Props = {
  login?: boolean;
};

const AuthSection = ({ login }: Props) => {
  const [userType, setUserType] = useState("");

  const userTypes = [
    {
      id: 'ev-manufacturer',
      title: 'EV Manufacturer',
      icon: '🚗',
      description: 'Manufacture electric vehicles',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'battery-manufacturer',
      title: 'Battery Manufacturer',
      icon: '🔋',
      description: 'Produce EV batteries',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'ev-consumer',
      title: 'EV Consumer',
      icon: '👤',
      description: 'Own electric vehicles',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'recycler',
      title: 'Recycler',
      icon: '♻️',
      description: 'Recycle EV batteries',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const handleCardClick = (typeId: string) => {
    setUserType(typeId);
  };

  return (
    <section className="rv-account-form-section">
      <DivAnimateYAxis className="container">
        <div className="row justify-content-center">
          <div className="col-12 auth-container">
            <h3 className="single-form-title">
              {login ? "Log In" : "User Types"}
            </h3>
            
            {!login && (
              <div className="user-type-selection">
                <h4 className="selection-title">Available User Types</h4>
                <p className="selection-subtitle">The system supports these different user roles</p>
                
                <div className="user-type-row">
                  {userTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`user-type-card ${userType === type.id ? 'selected' : ''}`}
                      onClick={() => handleCardClick(type.id)}
                    >
                      <div className="card-icon" style={{ background: type.color }}>
                        <span>{type.icon}</span>
                      </div>
                      <div className="card-content">
                        <h5 className="card-title">{type.title}</h5>
                        <p className="card-description">{type.description}</p>
                      </div>
                      <div className="card-arrow">→</div>
                    </div>
                  ))}
                </div>
                
                <div className="registration-info">
                  <p className="info-text">
                    To register for any of these user types, please contact your system administrator 
                    or use the sign-up page with the appropriate credentials.
                  </p>
                  <div className="info-actions">
                    <a href="/sign-in" className="btn-primary">Sign In</a>
                    <a href="/" className="btn-secondary">Back to Home</a>
                  </div>
                </div>
              </div>
            )}
            
            {login && (
              <AuthForm login={login} userType={userType} />
            )}
          </div>
        </div>
      </DivAnimateYAxis>
    </section>
  );
};

export default AuthSection;
