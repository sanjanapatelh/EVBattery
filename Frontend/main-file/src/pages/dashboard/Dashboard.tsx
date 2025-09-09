import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import EVManufacturerDashboard from './EVManufacturerDashboard';
import BatteryManufacturerDashboard from './BatteryManufacturerDashboard';
import EVConsumerDashboard from './EVConsumerDashboard';
import RecyclerPage from './RecyclerPage';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user type
  switch (user.userType) {
    case 'ev-manufacturer':
      return <EVManufacturerDashboard />;
    case 'battery-manufacturer':
      return <BatteryManufacturerDashboard />;
    case 'ev-consumer':
      return <EVConsumerDashboard />;
    case 'recycler':
      return <RecyclerPage />;
    default:
      return (
        <div className="error-container">
          <h2>Invalid User Type</h2>
          <p>Please contact support for assistance.</p>
        </div>
      );
  }
};

export default Dashboard;
