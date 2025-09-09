import React, { useState } from 'react';
import DivAnimateYAxis from "../component/utils/DivAnimateYAxis";
import UserRegistrationForm from "../component/form/UserRegistrationForm";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import InnerLayout from "../component/layout/InnerLayout";

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
    setSelectedUserType(typeId);
  };

  const handleBackToSelection = () => {
    setSelectedUserType('');
  };

  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Sign Up" />
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          width: '100%'
        }}>
          <div style={{
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2d3748',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              {selectedUserType ? `Register as ${userTypes.find(t => t.id === selectedUserType)?.title}` : "Select User Type"}
            </h3>
            
            {!selectedUserType && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }}>
                <h4 style={{
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  textAlign: 'center',
                  marginBottom: '0.5rem'
                }}>Available User Types</h4>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#718096',
                  textAlign: 'center',
                  marginBottom: '3rem'
                }}>Select your user type to register</p>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 'clamp(1rem, 2.2vw, 2rem)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  flexWrap: 'wrap',
                  width: '100%'
                }}>
                  {userTypes.map((type) => (
                    <div
                      key={type.id}
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
                      onClick={() => handleCardClick(type.id)}
                    >
                      <div style={{
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
                        <span style={{
                          fontSize: '3rem',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.2))'
                        }}>
                          {type.icon}
                        </span>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gap: '.5rem',
                        justifyItems: 'center',
                        textAlign: 'center'
                      }}>
                        <h5 style={{
                          fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)',
                          fontWeight: '800',
                          color: '#0f172a',
                          lineHeight: '1.15'
                        }}>
                          {type.title}
                        </h5>
                        <p style={{
                          color: '#334155',
                          fontWeight: '500',
                          maxWidth: '200px'
                        }}>
                          {type.description}
                        </p>
                      </div>
                      
                      <div style={{
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
              </div>
            )}
            
            {selectedUserType && (
              <div style={{
                maxWidth: '600px',
                width: '100%',
                margin: '0 auto',
                padding: '2rem',
                background: '#ffffff',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <button 
                    type="button"
                    onClick={handleBackToSelection}
                    style={{
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '500'
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
      </InnerLayout>
    </main>
  );
};

export default SignUpSection;
