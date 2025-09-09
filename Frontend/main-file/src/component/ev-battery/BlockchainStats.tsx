import React, { useState, useEffect } from 'react';
import './BlockchainStats.css';

interface BlockchainData {
  totalBatteries: number;
  totalCars: number;
  totalRecycling: number;
  activeManufacturers: number;
  totalTransactions: number;
  lastUpdated: string;
}

interface DataStatus {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  isDataAvailable: boolean;
}

const BlockchainStats: React.FC = () => {
  const [stats, setStats] = useState<BlockchainData>({
    totalBatteries: 0,
    totalCars: 0,
    totalRecycling: 0,
    activeManufacturers: 0,
    totalTransactions: 0,
    lastUpdated: new Date().toISOString()
  });

  const [dataStatus, setDataStatus] = useState<DataStatus>({
    isLoading: true,
    hasError: false,
    errorMessage: '',
    isDataAvailable: false
  });

  useEffect(() => {
    fetchPublicStats();
    // Update stats every 30 seconds to simulate real-time blockchain data
    const interval = setInterval(fetchPublicStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPublicStats = async () => {
    try {
      setDataStatus(prev => ({ ...prev, isLoading: true, hasError: false }));
      
      // Fetch public stats from the blockchain API
      const [batteryResponse, carResponse, recyclingResponse, manufacturerResponse] = await Promise.all([
        fetch('/api/battery/public-stats'),
        fetch('/api/ev/public-stats'),
        fetch('/api/recycling/public-stats'),
        fetch('/api/manufacturer/public-stats')
      ]);

      let totalBatteries = 0;
      let totalCars = 0;
      let totalRecycling = 0;
      let activeManufacturers = 0;
      let hasData = false;

      if (batteryResponse.ok) {
        const batteryData = await batteryResponse.json();
        totalBatteries = batteryData.totalCount || 0;
        if (totalBatteries > 0) hasData = true;
      }

      if (carResponse.ok) {
        const carData = await carResponse.json();
        totalCars = carData.totalCount || 0;
        if (totalCars > 0) hasData = true;
      }

      if (recyclingResponse.ok) {
        const recyclingData = await recyclingResponse.json();
        totalRecycling = recyclingData.totalCount || 0;
        if (totalRecycling > 0) hasData = true;
      }

      if (manufacturerResponse.ok) {
        const manufacturerData = await manufacturerResponse.json();
        activeManufacturers = manufacturerData.activeCount || 0;
        if (activeManufacturers > 0) hasData = true;
      }

      setStats({
        totalBatteries,
        totalCars,
        totalRecycling,
        activeManufacturers,
        totalTransactions: totalBatteries + totalCars + totalRecycling,
        lastUpdated: new Date().toISOString()
      });

      setDataStatus({
        isLoading: false,
        hasError: false,
        errorMessage: '',
        isDataAvailable: hasData
      });

    } catch (error) {
      console.error('Error fetching public stats:', error);
      setDataStatus({
        isLoading: false,
        hasError: true,
        errorMessage: 'Failed to connect to blockchain network',
        isDataAvailable: false
      });
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const renderStatCard = (icon: string, label: string, value: number | string, change: string, changeType: 'positive' | 'neutral' | 'negative' = 'positive') => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-number">{value}</h3>
        <p className="stat-label">{label}</p>
        <div className="stat-details">
          <span className={`stat-change ${changeType}`}>{change}</span>
        </div>
      </div>
    </div>
  );

  const renderLoadingCards = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="stat-card loading">
          <div className="stat-icon skeleton"></div>
          <div className="stat-content">
            <div className="stat-number skeleton"></div>
            <div className="stat-label skeleton"></div>
            <div className="stat-details">
              <div className="stat-change skeleton"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  const renderErrorState = () => (
    <div className="error-state">
      <div className="error-icon">⚠️</div>
      <h3>Network Connection Issue</h3>
      <p>{dataStatus.errorMessage}</p>
      <button onClick={fetchPublicStats} className="retry-button">
        <i className="fa-solid fa-refresh"></i>
        Retry Connection
      </button>
    </div>
  );

  const renderNoDataState = () => (
    <div className="no-data-state">
      <div className="no-data-icon">📊</div>
      <h3>No Data Available</h3>
      <p>The blockchain network is currently empty. Data will appear here once the first transactions are recorded.</p>
      <div className="demo-stats">
        <h4>Demo Statistics</h4>
        <div className="stats-grid">
          {renderStatCard('🔋', 'Total Batteries', '15,420', '+25 today')}
          {renderStatCard('🚗', 'Electric Vehicles', '8,920', '+15 today')}
          {renderStatCard('♻️', 'Recycled Batteries', '3,240', '+8 today')}
          {renderStatCard('🏭', 'Active Manufacturers', '156', 'Active network')}
          {renderStatCard('📊', 'Total Transactions', '27,580', '+48 today')}
          {renderStatCard('🌱', 'Uptime', '99.9%', 'Blockchain reliability')}
        </div>
      </div>
    </div>
  );

  if (dataStatus.isLoading) {
    return (
      <section className="blockchain-stats">
        <div className="container">
          <div className="stats-header">
            <h2 className="stats-title">
              <span className="blockchain-icon">🔗</span>
              Live Blockchain Data
            </h2>
            <p className="stats-subtitle">
              Connecting to the EV Battery blockchain network...
            </p>
          </div>
          <div className="stats-grid">
            {renderLoadingCards()}
          </div>
        </div>
      </section>
    );
  }

  if (dataStatus.hasError) {
    return (
      <section className="blockchain-stats">
        <div className="container">
          <div className="stats-header">
            <h2 className="stats-title">
              <span className="blockchain-icon">🔗</span>
              Live Blockchain Data
            </h2>
            <p className="stats-subtitle">
              Transparent, real-time statistics from the EV Battery blockchain network
            </p>
          </div>
          {renderErrorState()}
        </div>
      </section>
    );
  }

  if (!dataStatus.isDataAvailable) {
    return (
      <section className="blockchain-stats">
        <div className="container">
          <div className="stats-header">
            <h2 className="stats-title">
              <span className="blockchain-icon">🔗</span>
              Live Blockchain Data
            </h2>
            <p className="stats-subtitle">
              Transparent, real-time statistics from the EV Battery blockchain network
            </p>
          </div>
          {renderNoDataState()}
        </div>
      </section>
    );
  }

  return (
    <section className="blockchain-stats">
      <div className="container">
        <div className="stats-header">
          <h2 className="stats-title">
            <span className="blockchain-icon">🔗</span>
            Live Blockchain Data
          </h2>
          <p className="stats-subtitle">
            Transparent, real-time statistics from the EV Battery blockchain network
          </p>
          <div className="last-updated">
            <span className="update-indicator"></span>
            Last updated: {getTimeAgo(stats.lastUpdated)}
          </div>
        </div>

        <div className="stats-grid">
          {renderStatCard('🔋', 'Total Batteries', formatNumber(stats.totalBatteries), '+25 today')}
          {renderStatCard('🚗', 'Electric Vehicles', formatNumber(stats.totalCars), '+15 today')}
          {renderStatCard('♻️', 'Recycled Batteries', formatNumber(stats.totalRecycling), '+8 today')}
          {renderStatCard('🏭', 'Active Manufacturers', formatNumber(stats.activeManufacturers), 'Active network', 'neutral')}
          {renderStatCard('📊', 'Total Transactions', formatNumber(stats.totalTransactions), '+48 today')}
          {renderStatCard('🌱', 'Uptime', '99.9%', 'Blockchain reliability', 'neutral')}
        </div>

        <div className="blockchain-info">
          <div className="info-card">
            <h4>🔒 Immutable Records</h4>
            <p>All data is permanently recorded on the blockchain, ensuring transparency and trust.</p>
          </div>
          <div className="info-card">
            <h4>⚡ Real-time Updates</h4>
            <p>Statistics update automatically as new transactions are added to the network.</p>
          </div>
          <div className="info-card">
            <h4>🌐 Public Access</h4>
            <p>Anyone can verify the data independently through the blockchain explorer.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockchainStats;
