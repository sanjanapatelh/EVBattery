import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HeaderSection4 from '../header/HeaderSection4';
import '../../styles/Dashboard.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  userType: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  userType 
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Debug logging
  console.log('DashboardLayout render:', { user, userType, title });

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };

  const getUserTypeIcon = () => {
    switch (userType) {
      case 'ev-manufacturer':
        return '🚗';
      case 'battery-manufacturer':
        return '🔋';
      case 'ev-consumer':
        return '👤';
      case 'recycler':
        return '♻️';
      default:
        return '👤';
    }
  };

  const getUserTypeName = () => {
    switch (userType) {
      case 'ev-manufacturer':
        return 'EV Manufacturer';
      case 'battery-manufacturer':
        return 'Battery Manufacturer';
      case 'ev-consumer':
        return 'EV Consumer';
      case 'recycler':
        return 'Recycler';
      default:
        return 'User';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Use our improved HeaderSection4 instead of basic header */}
      <HeaderSection4 />
      
      {/* Dashboard Title Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px 20px',
        marginBottom: '30px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 0 15px 0'
          }}>
            {title}
          </h1>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: '600',
            display: 'inline-block',
            backdropFilter: 'blur(10px)'
          }}>
            {getUserTypeIcon()} {getUserTypeName()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
