import React, { useState } from 'react';
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import UserRegistrationForm from "../form/UserRegistrationForm";
import "../../styles/UserRegistration.css";

type Props = {};

const SignUpSection: React.FC<Props> = () => {
  const [selectedUserType, setSelectedUserType] = useState<string>('');

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
      description: '',
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
    setSelectedUserType(typeId);
  };

  const handleBackToSelection = () => {
    setSelectedUserType('');
  };

  return (
    <section className="rv-account-form-section" style={{
      padding: 'clamp(2rem, 4vw, 5rem) 1rem',
      background: 'radial-gradient(1200px 600px at 50% -200px, rgba(99,102,241,.08), transparent 60%), linear-gradient(#fff, #fff)'
    }}>
      <DivAnimateYAxis className="container">
        <div className="row justify-content-center">
                     <div className="col-12 auth-container" style={{
             margin: '0 auto',
             maxWidth: '1100px',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             gap: '2rem',
             minHeight: '80vh'
           }}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <h3 className="section-title" style={{
                fontSize: 'clamp(1.75rem, 2.2vw, 2.5rem)',
                fontWeight: '800',
                color: '#0f172a',
                letterSpacing: '.2px',
                margin: '0'
              }}>
                {selectedUserType ? `Register as ${userTypes.find(t => t.id === selectedUserType)?.title}` : "Select User Type"}
              </h3>
              
              {!selectedUserType && (
                <p className="section-subtitle" style={{
                  marginTop: '.5rem',
                  color: '#475569',
                  fontSize: 'clamp(1rem, 1.1vw, 1.1rem)'
                }}>
                  Choose your role in the EV ecosystem
                </p>
              )}
            </div>
            
            {!selectedUserType && (
                           <div className="cards-grid" style={{
               width: '100%',
               display: 'flex',
               flexDirection: 'row',
               gap: 'clamp(1rem, 2.2vw, 2rem)',
               alignItems: 'center',
               justifyContent: 'center',
               maxWidth: '1200px',
               margin: '0 auto',
               flexWrap: 'nowrap'
             }}>
                {userTypes.map((type) => (
                  <div
                    key={type.id}
                    className="type-card"
                    onClick={() => handleCardClick(type.id)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      width: '280px',
                      padding: '1.5rem',
                      borderRadius: '20px',
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 10px 24px rgba(2, 6, 23, 0.06)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'transform .18s ease, box-shadow .18s ease, border-color .18s ease'
                    }}
                  >
                    <div className="type-card__icon" style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      marginInline: 'auto',
                      boxShadow: '0 18px 36px rgba(0,0,0,.18)',
                      border: '4px solid rgba(255,255,255,.35)',
                      background: type.color
                    }}>
                      <span className="type-card__emoji" style={{
                        fontSize: '3rem',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.2))'
                      }}>
                        {type.icon}
                      </span>
                    </div>
                    
                    <div className="type-card__content" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '.5rem',
                      textAlign: 'center',
                      flex: 1
                    }}>
                      <h5 className="type-card__title" style={{
                        fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)',
                        fontWeight: '800',
                        color: '#0f172a',
                        lineHeight: '1.15',
                        margin: '0'
                      }}>
                        {type.title}
                      </h5>
                      <p className="type-card__desc" style={{
                        color: '#334155',
                        fontWeight: '500',
                        maxWidth: '200px',
                        margin: '0'
                      }}>
                        {type.description}
                      </p>
                    </div>
                    
                    <div className="type-card__arrow" style={{
                      fontSize: '1.6rem',
                      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: '700'
                    }}>
                      →
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {selectedUserType && (
              <div className="form-card" style={{
                width: 'min(720px, 92vw)',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '22px',
                padding: 'clamp(1.25rem, 2vw, 2rem)',
                boxShadow: '0 20px 50px rgba(2, 6, 23, 0.12)'
              }}>
                <div className="form-card__header" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <button 
                    type="button" 
                    className="btn-back"
                    onClick={handleBackToSelection}
                    style={{
                      border: '0',
                      background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      color: '#fff',
                      padding: '.6rem 1rem',
                      borderRadius: '999px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'filter .15s ease, transform .15s ease'
                    }}
                  >
                    ← Back to User Type Selection
                  </button>
                </div>
                <UserRegistrationForm userType={selectedUserType} />
              </div>
            )}
          </div>
        </div>
      </DivAnimateYAxis>
    </section>
  );
};

export default SignUpSection;
  