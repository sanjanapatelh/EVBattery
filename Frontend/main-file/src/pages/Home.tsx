import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

interface UserCredential {
  id: string;
  username: string;
  name: string;
  userType: string;
}

const Home: React.FC = () => {
  const [credentials, setCredentials] = useState<UserCredential[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserCredentials();
  }, []);

  const fetchUserCredentials = async () => {
    try {
      const allCredentials: UserCredential[] = [];
      
      // Fetch EV owners (consumers, recyclers, EV manufacturers)
      const ownersResponse = await fetch('/api/ev/owners');
      if (ownersResponse.ok) {
        const ownersData = await ownersResponse.json();
        const owners = ownersData.result || [];
        
        // Transform owners into credentials format
        const ownerCreds = owners.map((owner: any) => ({
          id: owner.id,
          username: owner.externalId?.toLowerCase().replace('_', '') || owner.id,
          name: owner.name,
          userType: owner.companyCode === 'BMANU' ? 'Battery Manufacturer' : 
                   owner.companyCode === 'EVMANU' ? 'EV Manufacturer' : 
                   owner.companyCode === 'REC' ? 'Recycler' : 'EV Consumer'
        }));
        
        allCredentials.push(...ownerCreds);
      }
      
      // Fetch battery manufacturers
      const bmResponse = await fetch('/api/manufacturer/battery-manufacturers');
      if (bmResponse.ok) {
        const bmData = await bmResponse.json();
        const batteryManufacturers = bmData.result || [];
        
        // Transform battery manufacturers into credentials format
        const bmCreds = batteryManufacturers.map((bm: any) => ({
          id: bm.id,
          username: bm.externalId?.toLowerCase().replace('_', '') || bm.name?.toLowerCase().replace(/\s+/g, '') || bm.id,
          name: bm.name,
          userType: 'Battery Manufacturer'
        }));
        
        allCredentials.push(...bmCreds);
      }
      
      // Add special case for user_001 (EV Manufacturer)
      allCredentials.push({
        id: 'user_001',
        username: 'user_001',
        name: 'Tesla Motors',
        userType: 'EV Manufacturer'
      });
      
      setCredentials(allCredentials);
    } catch (error) {
      console.error('Error fetching credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>EV Battery Management System</h1>
        <p>Comprehensive blockchain-based battery lifecycle management</p>
      </div>

      <div className="test-credentials-section">
        <h2>Available Users:</h2>
        
        {loading ? (
          <div className="loading-spinner">Loading users...</div>
        ) : credentials.length > 0 ? (
          <div className="credentials-grid">
            {credentials.map((cred) => (
              <div key={cred.id} className="credential-item">
                <strong>{cred.userType}:</strong>
                <br />
                {cred.username} / password123
                <br />
                <small>Name: {cred.name}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-users">
            <p>No users registered yet. Please register users first.</p>
          </div>
        )}
      </div>

      <div className="action-buttons">
        <Link to="/signin" className="btn btn-primary">
          🚀 Start Testing - Go to Sign In
        </Link>
      </div>
    </div>
  );
};

export default Home;
