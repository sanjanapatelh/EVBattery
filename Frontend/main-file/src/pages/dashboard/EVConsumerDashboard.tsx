import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../component/dashboard/DashboardLayout';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

interface EV {
  id: string;
  externalId: string;
  universalId: string;
  batteryId: string;
  manufacturerId: string;
  status: string;
  createdAt: string;
  price?: number;
  typeId?: string;
}

interface Battery {
  id: string;
  externalId: string;
  universalId: string;
  typeId: string;  // Changed from batteryTypeId to typeId to match API
  manufacturerId: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

const EVConsumerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [availableEVs, setAvailableEVs] = useState<EV[]>([]);
  const [myEVs, setMyEVs] = useState<EV[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showEVDetailsModal, setShowEVDetailsModal] = useState(false);
  const [showBatteryDetailsModal, setShowBatteryDetailsModal] = useState(false);
  const [showRecyclerAssignmentModal, setShowRecyclerAssignmentModal] = useState(false);
  const [selectedEV, setSelectedEV] = useState<EV | null>(null);
  const [selectedBattery, setSelectedBattery] = useState<Battery | null>(null);
  const [availableRecyclers, setAvailableRecyclers] = useState<any[]>([]);
  const [selectedRecyclerId, setSelectedRecyclerId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Stats state
  const [stats, setStats] = useState({
    availableEVs: 0,
    myEVs: 0,
    totalRecyclers: 0,
    recyclingJobs: 0
  });

  // Require authentication
  if (!user) {
    return (
      <DashboardLayout title="EV Consumer Dashboard" userType="ev-consumer">
        <div className="loading-container">
          <p>Please login to access the dashboard.</p>
        </div>
      </DashboardLayout>
    );
  }

  useEffect(() => {
    fetchAvailableEVs();
    fetchMyEVs();
  }, []); // Remove user dependency to prevent infinite loop

  const fetchAvailableEVs = async () => {
    try {
      // Get all EVs available for purchase from EV manufacturers
      const response = await fetch('/api/ev');
      if (response.ok) {
        const data = await response.json();
        // Filter only EVs available for purchase (not sold yet)
        const available = (data.result || []).filter((ev: EV) => 
          ev.status === 'Created' || ev.status === 'Available'
        );
        setAvailableEVs(available);
        setStats(prev => ({ ...prev, availableEVs: available.length }));
      } else {
        console.error('Failed to fetch available EVs');
        toast.error('Failed to fetch available EVs');
        setAvailableEVs([]); // Ensure it's always an array
        setStats(prev => ({ ...prev, availableEVs: 0 }));
      }
    } catch (error) {
      console.error('Error fetching available EVs:', error);
      toast.error('Error fetching available EVs');
      setAvailableEVs([]); // Ensure it's always an array
    }
  };

  const fetchMyEVs = async () => {
    try {
      // Get EVs owned by this consumer using the correct endpoint
      const response = await fetch(`/api/ev?ownerId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('My EVs data:', data);
        setMyEVs(data.result || []);
        setStats(prev => ({ ...prev, myEVs: (data.result || []).length }));
      } else {
        console.error('Failed to fetch my EVs');
        toast.error('Failed to fetch my EVs');
        setMyEVs([]); // Ensure it's always an array
        setStats(prev => ({ ...prev, myEVs: 0 }));
      }
    } catch (error) {
      console.error('Error fetching my EVs:', error);
      toast.error('Error fetching my EVs');
      setMyEVs([]); // Ensure it's always an array
    } finally {
      setIsLoadingData(false);
    }
  };

  const handlePurchaseEV = async (ev: EV) => {
    setIsLoading(true);
    try {
      // In a real app, this would involve payment processing
      // For now, we'll just update the EV status to 'Sold'
      const response = await fetch(`/api/ev/${ev.id}/purchase`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerId: user.id,
          status: 'Sold',
          updatedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success('EV purchased successfully!');
        setShowPurchaseModal(false);
        setSelectedEV(null);
        // Refresh both lists
        fetchAvailableEVs();
        fetchMyEVs();
      } else {
        toast.error('Failed to purchase EV');
      }
    } catch (error) {
      toast.error('Error purchasing EV');
    } finally {
      setIsLoading(false);
    }
  };

  const openPurchaseModal = (ev: EV) => {
    setSelectedEV(ev);
    setShowPurchaseModal(true);
  };

  const openEVDetails = async (ev: EV) => {
    setSelectedEV(ev);
    setShowEVDetailsModal(true);
  };

  const openBatteryInfo = async (ev: EV) => {
    if (!ev.batteryId) {
      toast.error('No battery information available for this EV');
      return;
    }
    
    try {
      const response = await fetch(`/api/battery/${ev.batteryId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedBattery(data.result);
        setShowBatteryDetailsModal(true);
      } else {
        toast.error('Failed to fetch battery details');
      }
    } catch (error) {
      console.error('Error fetching battery details:', error);
      toast.error('Error fetching battery details');
    }
  };

  const openRecyclerAssignment = async (ev: EV) => {
    setSelectedEV(ev);
    await fetchAvailableRecyclers();
    setShowRecyclerAssignmentModal(true);
  };

  const fetchAvailableRecyclers = async () => {
    try {
      const response = await fetch('/api/manufacturer/recyclers');
      if (response.ok) {
        const data = await response.json();
        setAvailableRecyclers(data.result || []);
      } else {
        toast.error('Failed to fetch recyclers');
      }
    } catch (error) {
      console.error('Error fetching recyclers:', error);
      toast.error('Error fetching recyclers');
    }
  };

  const handleAssignToRecycler = async () => {
    if (!selectedEV || !selectedRecyclerId) {
      toast.error('Please select a recycler');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/battery/recycle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batteryId: selectedEV.batteryId,
          recyclerId: selectedRecyclerId,
          updatedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success('EV assigned to recycler successfully!');
        setShowRecyclerAssignmentModal(false);
        setSelectedEV(null);
        setSelectedRecyclerId('');
        // Refresh the EVs list
        fetchMyEVs();
      } else {
        toast.error('Failed to assign EV to recycler');
      }
    } catch (error) {
      console.error('Error assigning EV to recycler:', error);
      toast.error('Error assigning EV to recycler');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <DashboardLayout title="EV Consumer Dashboard" userType="ev-consumer">
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading dashboard data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="EV Consumer Dashboard" userType="ev-consumer">
      <div className="dashboard-grid">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🚗</div>
            <div className="stat-content">
              <h3>{stats.availableEVs}</h3>
              <p>Available EVs</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>{stats.myEVs}</h3>
              <p>My EVs</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">♻️</div>
            <div className="stat-content">
              <h3>{stats.totalRecyclers}</h3>
              <p>Recyclers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h3>{stats.recyclingJobs}</h3>
              <p>Recycling Jobs</p>
            </div>
          </div>
        </div>

        {/* Available EVs from EV Manufacturers */}
        <div className="dashboard-section">
          <h3>Available EVs for Purchase</h3>
          <p className="section-description">
            Browse and purchase EVs from EV manufacturers
          </p>
          {(!availableEVs || availableEVs.length === 0) ? (
            <div className="empty-state">
              <p>No EVs available for purchase at the moment.</p>
            </div>
          ) : (
            <div className="evs-grid">
              {(availableEVs || []).map((ev) => (
                <div key={ev.id} className="ev-card">
                  <div className="ev-header">
                    <h4>EV {ev.externalId}</h4>
                    <span className={`status-badge ${ev.status?.toLowerCase().replace(' ', '-') || 'available'}`}>
                      {ev.status || 'Available'}
                    </span>
                  </div>
                  <div className="ev-details">
                    <p><strong>Universal ID:</strong> {ev.universalId}</p>
                    <p><strong>Battery ID:</strong> {ev.batteryId}</p>
                    <p><strong>EV Manufacturer:</strong> {ev.manufacturerId}</p>
                    <p><strong>Created:</strong> {ev.createdAt}</p>
                    {ev.price && <p><strong>Price:</strong> ${ev.price.toLocaleString()}</p>}
                  </div>
                  <div className="ev-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => openPurchaseModal(ev)}
                    >
                      Purchase EV
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Transferred EVs */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>My Transferred EVs</h3>
            <p className="section-description">
              EVs that have been transferred to you from manufacturers
            </p>
          </div>
          {(!myEVs || myEVs.length === 0) ? (
            <div className="empty-state">
              <div className="empty-icon">🚗</div>
              <p>No EVs have been transferred to you yet.</p>
              <p className="empty-subtitle">EVs will appear here once manufacturers transfer ownership to you.</p>
            </div>
          ) : (
            <div className="evs-grid">
              {(myEVs || []).map((ev) => (
                <div key={ev.id} className="ev-card transferred">
                  <div className="ev-header">
                    <div className="ev-title">
                      <h4>EV {ev.externalId || ev.id}</h4>
                      <span className="ev-id">ID: {ev.id}</span>
                    </div>
                    <span className={`status-badge transferred`}>
                      Transferred
                    </span>
                  </div>
                  
                  <div className="ev-details">
                    <div className="detail-row">
                      <div className="detail-group">
                        <label>Universal ID:</label>
                        <span>{ev.universalId || 'N/A'}</span>
                      </div>
                      <div className="detail-group">
                        <label>Battery ID:</label>
                        <span>{ev.batteryId || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="detail-row">
                      <div className="detail-group">
                        <label>EV Manufacturer:</label>
                        <span>{ev.manufacturerId || 'N/A'}</span>
                      </div>
                      <div className="detail-group">
                        <label>Transfer Date:</label>
                        <span>{ev.createdAt ? new Date(ev.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="detail-row">
                      <div className="detail-group">
                        <label>Status:</label>
                        <span className="status-text">{ev.status || 'Transferred'}</span>
                      </div>
                      <div className="detail-group">
                        <label>Type ID:</label>
                        <span>{ev.typeId || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ev-actions">
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => openEVDetails(ev)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => openBatteryInfo(ev)}
                    >
                      Battery Info
                    </button>
                    <button 
                      className="btn btn-warning btn-sm"
                      onClick={() => openRecyclerAssignment(ev)}
                    >
                      Assign to Recycler
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Purchase EV Modal */}
      {showPurchaseModal && selectedEV && (
        <div className="modal-overlay" onClick={() => setShowPurchaseModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Purchase EV</h3>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowPurchaseModal(false)}
              >
                ×
              </button>
            </div>
            <div className="purchase-details">
              <h4>EV {selectedEV.externalId}</h4>
              <p><strong>Universal ID:</strong> {selectedEV.universalId}</p>
              <p><strong>Battery ID:</strong> {selectedEV.batteryId}</p>
              <p><strong>Manufacturer:</strong> {selectedEV.manufacturerId}</p>
              {selectedEV.price && <p><strong>Price:</strong> ${selectedEV.price.toLocaleString()}</p>}
              
              <div className="purchase-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowPurchaseModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => handlePurchaseEV(selectedEV)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Confirm Purchase'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EV Details Modal */}
      {showEVDetailsModal && selectedEV && (
        <div className="modal-overlay" onClick={() => setShowEVDetailsModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>EV Details</h3>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowEVDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="ev-details-content">
              <div className="ev-details-grid">
                <div className="detail-section">
                  <h4>Basic Information</h4>
                  <div className="detail-item">
                    <label>EV ID:</label>
                    <span>{selectedEV.id}</span>
                  </div>
                  <div className="detail-item">
                    <label>External ID:</label>
                    <span>{selectedEV.externalId || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Universal ID:</label>
                    <span>{selectedEV.universalId || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Type ID:</label>
                    <span>{selectedEV.typeId || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Manufacturing Details</h4>
                  <div className="detail-item">
                    <label>Manufacturer ID:</label>
                    <span>{selectedEV.manufacturerId || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Battery ID:</label>
                    <span>{selectedEV.batteryId || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className="status-text">{selectedEV.status || 'Transferred'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Created Date:</label>
                    <span>{selectedEV.createdAt ? new Date(selectedEV.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowEVDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Battery Details Modal */}
      {showBatteryDetailsModal && selectedBattery && (
        <div className="modal-overlay" onClick={() => setShowBatteryDetailsModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Battery Details</h3>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowBatteryDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="battery-details-content">
              <div className="battery-details-grid">
                <div className="detail-section">
                  <h4>Battery Information</h4>
                  <div className="detail-item">
                    <label>Battery ID:</label>
                    <span>{selectedBattery.id}</span>
                  </div>
                  <div className="detail-item">
                    <label>External ID:</label>
                    <span>{selectedBattery.externalId || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Universal ID:</label>
                    <span>{selectedBattery.universalId || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Type ID:</label>
                    <span>{selectedBattery.typeId || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Manufacturing Details</h4>
                  <div className="detail-item">
                    <label>Manufacturer ID:</label>
                    <span>{selectedBattery.manufacturerId || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className="status-text">{selectedBattery.status || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Created Date:</label>
                    <span>{selectedBattery.createdAt ? new Date(selectedBattery.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Last Updated:</label>
                    <span>{selectedBattery.updatedAt ? new Date(selectedBattery.updatedAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowBatteryDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recycler Assignment Modal */}
      {showRecyclerAssignmentModal && selectedEV && (
        <div className="modal-overlay" onClick={() => setShowRecyclerAssignmentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Assign EV to Recycler</h3>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowRecyclerAssignmentModal(false)}
              >
                ×
              </button>
            </div>
            <div className="recycler-assignment-content">
              <div className="assignment-info">
                <h4>EV: {selectedEV.externalId || selectedEV.id}</h4>
                <p>Select a recycler to assign this EV for battery recycling:</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="recyclerSelect">Select Recycler:</label>
                {availableRecyclers.length > 0 ? (
                  <select 
                    id="recyclerSelect"
                    value={selectedRecyclerId}
                    onChange={(e) => setSelectedRecyclerId(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">-- Select a recycler --</option>
                    {availableRecyclers.map((recycler) => (
                      <option key={recycler.id} value={recycler.id}>
                        {recycler.name} ({recycler.id})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="no-recyclers">
                    <p>No recyclers available at the moment.</p>
                  </div>
                )}
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowRecyclerAssignmentModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-warning"
                  onClick={handleAssignToRecycler}
                  disabled={isLoading || !selectedRecyclerId}
                >
                  {isLoading ? 'Assigning...' : 'Assign to Recycler'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EVConsumerDashboard;
