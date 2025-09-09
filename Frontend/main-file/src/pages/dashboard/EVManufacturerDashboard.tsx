import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { batteryAPI, evAPI, manufacturerAPI } from '../../services/api';
import '../../styles/Dashboard.css';
import DashboardLayout from '../../component/dashboard/DashboardLayout';
import { toast } from 'react-toastify';

interface Battery {
  id: string;
  externalId: string;
  universalId: string;
  typeId: string;
  manufacturerId: string;
  status: string;
  createdAt: string;
}

interface EV {
  id: string;
  externalId: string;
  universalId: string;
  typeId: string;
  manufacturerId: string;
  batteryId: string;
  ownerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface EVOwner {
  id: string;
  externalId: string;
  universalId: string;
  companyCode: string;
  name: string;
  address: string;
}

const EVManufacturerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [availableBatteries, setAvailableBatteries] = useState<Battery[]>([]);
  const [myEVs, setMyEVs] = useState<EV[]>([]);
  const [transferredEVs, setTransferredEVs] = useState<EV[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Modal states
  const [showCreateEVModal, setShowCreateEVModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Selected items
  const [selectedEV, setSelectedEV] = useState<EV | null>(null);
  const [selectedBattery, setSelectedBattery] = useState<Battery | null>(null);
  const [transferOwnerId, setTransferOwnerId] = useState('');
  
  // Available consumers for dropdown
  const [availableConsumers, setAvailableConsumers] = useState<EVOwner[]>([]);
  const [loadingConsumers, setLoadingConsumers] = useState(false);
  
  // Available battery manufacturers and batteries
  const [availableBatteryManufacturers, setAvailableBatteryManufacturers] = useState<any[]>([]);
  const [selectedBatteryManufacturer, setSelectedBatteryManufacturer] = useState('');
  const [batteriesFromManufacturer, setBatteriesFromManufacturer] = useState<Battery[]>([]);
  const [loadingBatteryManufacturers, setLoadingBatteryManufacturers] = useState(false);
  const [loadingBatteries, setLoadingBatteries] = useState(false);
  
  // Form data for EV creation
  const [formData, setFormData] = useState({
    externalId: '',
    universalId: '',
    batteryId: ''
  });
  
  // Search states
  const [batterySearchTerm, setBatterySearchTerm] = useState('');
  const [evSearchTerm, setEvSearchTerm] = useState('');
  const [transferredSearchTerm, setTransferredSearchTerm] = useState('');

  // User data from authentication context
  const currentUser = user;

  // Require authentication
  if (!currentUser) {
    return (
      <DashboardLayout title="EV Manufacturer Dashboard" userType="ev-manufacturer">
        <div className="loading-container">
          <p>Please login to access the dashboard.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Safe array handling
  const safeAvailableBatteries = Array.isArray(availableBatteries) ? availableBatteries : [];
  const safeMyEVs = Array.isArray(myEVs) ? myEVs : [];
  const safeTransferredEVs = Array.isArray(transferredEVs) ? transferredEVs : [];

  // Stats state
  const [stats, setStats] = useState({
    totalBatteries: 0,
    myEVs: 0,
    transferredEVs: 0,
    availableConsumers: 0
  });

  // Filtered arrays based on search
  const filteredBatteries = safeAvailableBatteries.filter(battery =>
    battery.externalId.toLowerCase().includes(batterySearchTerm.toLowerCase()) ||
    battery.universalId.toLowerCase().includes(batterySearchTerm.toLowerCase()) ||
    battery.status.toLowerCase().includes(batterySearchTerm.toLowerCase())
  );

  const filteredEVs = safeMyEVs.filter(ev =>
    ev.externalId.toLowerCase().includes(evSearchTerm.toLowerCase()) ||
    ev.universalId.toLowerCase().includes(evSearchTerm.toLowerCase()) ||
    ev.status.toLowerCase().includes(evSearchTerm.toLowerCase())
  );

  const filteredTransferredEVs = safeTransferredEVs.filter(ev =>
    ev.externalId.toLowerCase().includes(transferredSearchTerm.toLowerCase()) ||
    ev.universalId.toLowerCase().includes(transferredSearchTerm.toLowerCase()) ||
    ev.ownerId.toLowerCase().includes(transferredSearchTerm.toLowerCase())
  );

  useEffect(() => {
    console.log('EVManufacturerDashboard useEffect running...');
    fetchAvailableBatteries();
    fetchMyEVs();
    fetchTransferredEVs();
    fetchAvailableConsumers();
    fetchAvailableBatteryManufacturers();
  }, []); // Remove user dependency to prevent infinite loop

  useEffect(() => {
    if (selectedBatteryManufacturer) {
      fetchBatteriesFromManufacturer(selectedBatteryManufacturer);
    } else {
      setBatteriesFromManufacturer([]);
    }
  }, [selectedBatteryManufacturer]);

  const fetchAvailableBatteries = async () => {
    try {
      // Dynamically fetch all battery manufacturers first
      const manufacturersResponse = await fetch('/api/manufacturer/battery-manufacturers');
      if (manufacturersResponse.ok) {
        const manufacturersData = await manufacturersResponse.json();
        const manufacturers = manufacturersData.result || [];
        
        console.log('Found battery manufacturers:', manufacturers.map((m: any) => ({ id: m.id, name: m.name })));
        
        let allBatteries: Battery[] = [];
        
        // Fetch batteries from each manufacturer
        for (const manufacturer of manufacturers) {
          console.log('Fetching batteries for manufacturer:', manufacturer.id);
          const response = await fetch(`/api/battery?manufacturerId=${manufacturer.id}`);
          if (response.ok) {
            const data = await response.json();
            const manufacturerBatteries = data.result || [];
            console.log(`Found ${manufacturerBatteries.length} batteries for manufacturer ${manufacturer.id}`);
            allBatteries = [...allBatteries, ...manufacturerBatteries];
          }
        }
        
        console.log('Total batteries found:', allBatteries.length);
        
        // Filter out test batteries and only show legitimate manufacturer batteries
        const available = allBatteries.filter((battery: Battery) => {
          console.log('Filtering battery:', battery.id, 'manufacturer:', battery.manufacturerId, 'status:', battery.status);
          
          // Only show batteries with status "Manufactured"
          if (battery.status !== 'Manufactured') {
            console.log('Filtered out - wrong status:', battery.status);
            return false;
          }
          
          // Filter out test batteries by checking manufacturer ID patterns
          // Legitimate battery manufacturers should have IDs starting with "BMANU_"
          if (!battery.manufacturerId || !battery.manufacturerId.startsWith('BMANU_')) {
            console.log('Filtered out - invalid manufacturer ID:', battery.manufacturerId);
            return false;
          }
          
          // Filter out batteries with empty or test-like IDs
          if (!battery.id || battery.id.length < 5) {
            console.log('Filtered out - invalid battery ID:', battery.id);
            return false;
          }
          
          // Additional check: ensure the manufacturer actually exists in our list
          const manufacturerExists = manufacturers.some((m: any) => m.id === battery.manufacturerId);
          if (!manufacturerExists) {
            console.log('Filtered out - manufacturer not found in list:', battery.manufacturerId);
            return false;
          }
          
          console.log('Battery passed filter:', battery.id);
          return true;
        });
        
        console.log('Final filtered batteries:', available);
        
        setAvailableBatteries(available);
        setStats(prev => ({ ...prev, totalBatteries: available.length }));
      }
    } catch (error) {
      console.error('Error fetching available batteries:', error);
      setAvailableBatteries([]);
      setStats(prev => ({ ...prev, totalBatteries: 0 }));
    }
  };

  const fetchMyEVs = async () => {
    try {
      const response = await fetch(`/api/ev?manufacturerId=${currentUser.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Raw EV data from API:', data);
        // Filter for EVs that don't have an ownerId (meaning they haven't been transferred)
        const unownedEVs = (data.result || []).filter((ev: EV) => !ev.ownerId || ev.ownerId.trim() === '');
        setMyEVs(unownedEVs);
        setStats(prev => ({ ...prev, myEVs: unownedEVs.length }));
        console.log('My EVs (unowned):', unownedEVs);
      } else {
        setMyEVs([]);
        setStats(prev => ({ ...prev, myEVs: 0 }));
      }
    } catch (error) {
      console.error('Error fetching my EVs:', error);
      setMyEVs([]);
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchTransferredEVs = async () => {
    try {
      // Get all EV owners and check which EVs they own that were manufactured by this manufacturer
      const ownersResponse = await fetch('/api/ev/owners');
      if (ownersResponse.ok) {
        const ownersData = await ownersResponse.json();
        const owners = ownersData.result || [];
        
        let allTransferredEVs: EV[] = [];
        
        // For each owner, get their EVs and check if they were manufactured by this manufacturer
        for (const owner of owners) {
          const evsResponse = await fetch(`/api/ev?ownerId=${owner.id}`);
          if (evsResponse.ok) {
            const evsData = await evsResponse.json();
            const ownerEVs = evsData.result || [];
            
            // Filter for EVs manufactured by this manufacturer
            const manufacturerEVs = ownerEVs.filter((ev: EV) => 
              ev.manufacturerId === currentUser.id
            );
            
            allTransferredEVs = [...allTransferredEVs, ...manufacturerEVs];
          }
        }
        
        setTransferredEVs(allTransferredEVs);
        setStats(prev => ({ ...prev, transferredEVs: allTransferredEVs.length }));
        console.log('Transferred EVs found:', allTransferredEVs);
      } else {
        setTransferredEVs([]);
        setStats(prev => ({ ...prev, transferredEVs: 0 }));
      }
    } catch (error) {
      console.error('Error fetching transferred EVs:', error);
      setTransferredEVs([]);
    }
  };

  const fetchAvailableConsumers = async () => {
    try {
      setLoadingConsumers(true);
      const response = await evAPI.getAllEVOwners();
      const data = (response as any).result || [];
      setAvailableConsumers(Array.isArray(data) ? data : []);
      setStats(prev => ({ ...prev, availableConsumers: Array.isArray(data) ? data.length : 0 }));
    } catch (error) {
      console.error('Error fetching available consumers:', error);
      setAvailableConsumers([]);
      setStats(prev => ({ ...prev, availableConsumers: 0 }));
    } finally {
      setLoadingConsumers(false);
    }
  };

  const fetchAvailableBatteryManufacturers = async () => {
    try {
      setLoadingBatteryManufacturers(true);
      console.log('Fetching battery manufacturers...');
      const response = await manufacturerAPI.getAllBatteryManufacturers();
      console.log('Raw response:', response);
      const data = (response as any).result || [];
      console.log('Parsed data:', data);
      setAvailableBatteryManufacturers(Array.isArray(data) ? data : []);
      console.log('Set manufacturers:', Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching battery manufacturers:', error);
      setAvailableBatteryManufacturers([]);
    } finally {
      setLoadingBatteryManufacturers(false);
    }
  };

  const fetchBatteriesFromManufacturer = async (manufacturerId: string) => {
    if (!manufacturerId) return;
    
    try {
      setLoadingBatteries(true);
      const response = await fetch(`/api/battery?manufacturerId=${manufacturerId}`);
      if (response.ok) {
        const data = await response.json();
        setBatteriesFromManufacturer(Array.isArray(data.result) ? data.result : []);
      } else {
        setBatteriesFromManufacturer([]);
      }
    } catch (error) {
      console.error('Error fetching batteries from manufacturer:', error);
      setBatteriesFromManufacturer([]);
    } finally {
      setLoadingBatteries(false);
    }
  };

  const handleCreateEV = async (data: { externalId: string; universalId: string; batteryId: string }) => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      const evData = {
        ...data,
        manufacturerId: currentUser.id,
        createdAt: new Date().toISOString(),
      };
      
      console.log('Creating EV with data:', evData);
      
      const response = await evAPI.createEV(evData);
      console.log('EV created:', response);
      
      // Reset form data
      setFormData({
        externalId: '',
        universalId: '',
        batteryId: '',
      });
      setSelectedBatteryManufacturer('');
      
      // Refresh EVs list
      fetchMyEVs();
      fetchAvailableBatteries();
      setShowCreateEVModal(false);
    } catch (error) {
      console.error('Error creating EV:', error);
      toast.error('Failed to create EV');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferEV = async () => {
    if (!selectedEV || !transferOwnerId.trim()) return;
    
    setIsLoading(true);
    try {
      const transferData = {
        evId: selectedEV.id,
        newOwnerId: transferOwnerId.trim(),
        updatedAt: new Date().toISOString(),
      };
      
      console.log('Transferring EV with data:', transferData);
      console.log('Selected EV:', selectedEV);
      
      const response = await evAPI.transferEV(transferData);
      console.log('EV transferred response:', response);
      
      // Refresh EVs list
      fetchMyEVs();
      fetchTransferredEVs();
      setShowTransferModal(false);
      setSelectedEV(null);
      setTransferOwnerId('');
      toast.success('EV ownership transferred successfully!');
    } catch (error) {
      console.error('Error transferring EV:', error);
      toast.error('Failed to transfer EV ownership');
    } finally {
      setIsLoading(false);
    }
  };

  const openTransferModal = (ev: EV) => {
    setSelectedEV(ev);
    setShowTransferModal(true);
  };

  const openDetailsModal = (ev: EV) => {
    setSelectedEV(ev);
    setShowDetailsModal(true);
  };

  const openEditModal = (ev: EV) => {
    setSelectedEV(ev);
    setShowEditModal(true);
  };

  const openBatteryDetails = (battery: Battery) => {
    setSelectedBattery(battery);
    // You can implement a battery details modal here
  };

  if (isLoadingData) {
    return (
      <DashboardLayout title="EV Manufacturer Dashboard" userType="ev-manufacturer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="EV Manufacturer Dashboard" userType="ev-manufacturer">
      <div className="dashboard-content">
        <div className="dashboard-subtitle">
          <p>Manage your EV production and ownership transfers</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔋</div>
            <div className="stat-content">
              <h3>{stats.totalBatteries}</h3>
              <p>Available Batteries</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚗</div>
            <div className="stat-content">
              <h3>{stats.myEVs}</h3>
              <p>My EVs</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📤</div>
            <div className="stat-content">
              <h3>{stats.transferredEVs}</h3>
              <p>Transferred EVs</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.availableConsumers}</h3>
              <p>Available Consumers</p>
            </div>
          </div>
        </div>

        {/* Available Batteries Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Available Batteries</h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search batteries..."
                value={batterySearchTerm}
                onChange={(e) => setBatterySearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          {filteredBatteries.length === 0 ? (
            <div className="empty-state">
              <p>No batteries available from battery manufacturers.</p>
            </div>
          ) : (
            <div className="batteries-grid">
              {filteredBatteries.map((battery) => (
                <div key={battery.id} className="battery-card" onClick={() => openBatteryDetails(battery)}>
                  <div className="battery-header">
                    <h4>Battery {battery.externalId}</h4>
                    <span className={`status-badge ${battery.status.toLowerCase().replace(' ', '-')}`}>
                      {battery.status}
                    </span>
                  </div>
                  <div className="battery-details">
                    <p><strong>Universal ID:</strong> {battery.universalId}</p>
                    <p><strong>Type ID:</strong> {battery.typeId}</p>
                    <p><strong>Manufacturer:</strong> {battery.manufacturerId}</p>
                    <p><strong>Created:</strong> {battery.createdAt}</p>
                  </div>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-sm">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create EV Button */}
        <div className="action-section">
          <button
            className="btn btn-primary btn-large"
            onClick={() => setShowCreateEVModal(true)}
          >
            Create EV
          </button>
        </div>

        {/* My EVs Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>My EVs</h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search EVs..."
                value={evSearchTerm}
                onChange={(e) => setEvSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          {filteredEVs.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any EVs yet.</p>
            </div>
          ) : (
            <div className="evs-grid">
              {filteredEVs.map((ev) => (
                <div key={ev.id} className="ev-card active">
                  <div className="active-indicator">
                    <span className="active-badge">Active</span>
                  </div>
                  <div className="ev-header">
                    <h4>EV {ev.externalId || ev.id}</h4>
                    <span className="status-badge created">
                      Created
                    </span>
                  </div>
                  <div className="ev-details">
                    <p><strong>Universal ID:</strong> {ev.universalId || 'N/A'}</p>
                    <p><strong>Type ID:</strong> {ev.typeId || 'N/A'}</p>
                    <p><strong>Battery ID:</strong> {ev.batteryId || 'N/A'}</p>
                    <p><strong>Created:</strong> {ev.createdAt || 'N/A'}</p>
                  </div>
                  <div className="ev-actions">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => openTransferModal(ev)}
                    >
                      Transfer Ownership
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openDetailsModal(ev)}
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => openEditModal(ev)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transferred EVs Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Transferred EVs</h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search transferred EVs..."
                value={transferredSearchTerm}
                onChange={(e) => setTransferredSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          {filteredTransferredEVs.length === 0 ? (
            <div className="empty-state">
              <p>No EVs have been transferred yet.</p>
            </div>
          ) : (
            <div className="evs-grid">
              {filteredTransferredEVs.map((ev) => (
                <div key={ev.id} className="ev-card transferred">
                  <div className="transferred-indicator">
                    <span className="transferred-badge">Transferred</span>
                  </div>
                  <div className="ev-header">
                    <h4>EV {ev.externalId}</h4>
                    <span className="status-badge sold">
                      Sold
                    </span>
                  </div>
                  <div className="ev-details">
                    <p><strong>Universal ID:</strong> {ev.universalId || 'N/A'}</p>
                    <p><strong>Type ID:</strong> {ev.typeId || 'N/A'}</p>
                    <p><strong>Battery ID:</strong> {ev.batteryId || 'N/A'}</p>
                    <p><strong>Owner:</strong> {ev.ownerId || 'N/A'}</p>
                    <p><strong>Transferred:</strong> {ev.updatedAt || ev.createdAt || 'N/A'}</p>
                  </div>
                  <div className="ev-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openDetailsModal(ev)}
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => openEditModal(ev)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create EV Modal */}
        {showCreateEVModal && (
          <div className="modal-overlay" onClick={() => setShowCreateEVModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Create New EV</h3>
                <button 
                  type="button" 
                  className="close-btn"
                  onClick={() => setShowCreateEVModal(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCreateEV({
                  externalId: formData.externalId,
                  universalId: formData.universalId,
                  batteryId: formData.batteryId,
                });
              }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="batteryManufacturer">Battery Manufacturer</label>
                    {loadingBatteryManufacturers ? (
                      <div className="loading-spinner">Loading manufacturers...</div>
                    ) : availableBatteryManufacturers.length > 0 ? (
                      <select 
                        id="batteryManufacturer" 
                        value={selectedBatteryManufacturer}
                        onChange={(e) => setSelectedBatteryManufacturer(e.target.value)}
                        className="form-control"
                        required
                      >
                        <option value="">-- Select a battery manufacturer --</option>
                        {availableBatteryManufacturers.map((manufacturer) => (
                          <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name} ({manufacturer.id})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="no-manufacturers">
                        <p>No battery manufacturers available.</p>
                      </div>
                    )}
                  </div>

                  {selectedBatteryManufacturer && (
                    <div className="form-group">
                      <label htmlFor="batteryId">Select Battery</label>
                      {loadingBatteries ? (
                        <div className="loading-spinner">Loading batteries...</div>
                      ) : batteriesFromManufacturer.length > 0 ? (
                        <select 
                          id="batteryId" 
                          value={formData.batteryId}
                          onChange={(e) => setFormData({ ...formData, batteryId: e.target.value })}
                          className="form-control"
                          required
                        >
                          <option value="">-- Select a battery --</option>
                          {batteriesFromManufacturer.map((battery) => (
                            <option key={battery.id} value={battery.id}>
                              {battery.externalId} - {battery.universalId}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="no-batteries">
                          <p>No batteries available from this manufacturer.</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="externalId">External ID</label>
                    <input 
                      type="text" 
                      id="externalId" 
                      value={formData.externalId}
                      onChange={(e) => setFormData({ ...formData, externalId: e.target.value })}
                      className="form-control"
                      placeholder="Enter external ID"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="universalId">Universal ID</label>
                    <input 
                      type="text" 
                      id="universalId" 
                      value={formData.universalId}
                      onChange={(e) => setFormData({ ...formData, universalId: e.target.value })}
                      className="form-control"
                      placeholder="Enter universal ID"
                      required
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowCreateEVModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create EV'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transfer Ownership Modal */}
        {showTransferModal && selectedEV && (
          <div className="modal-overlay" onClick={() => setShowTransferModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Transfer EV Ownership</h3>
                <button 
                  type="button" 
                  className="close-btn"
                  onClick={() => setShowTransferModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Transfer ownership of <strong>EV {selectedEV.externalId}</strong> to:</p>
                
                <div className="form-group">
                  <label htmlFor="newOwnerId">Select Consumer</label>
                  {loadingConsumers ? (
                    <div className="loading-spinner">Loading consumers...</div>
                  ) : availableConsumers.length > 0 ? (
                    <select 
                      id="newOwnerId" 
                      value={transferOwnerId}
                      onChange={(e) => setTransferOwnerId(e.target.value)}
                      className="form-control"
                      required
                    >
                      <option value="">-- Select a consumer --</option>
                      {availableConsumers.map((consumer) => (
                        <option key={consumer.id} value={consumer.id}>
                          {consumer.name} ({consumer.id})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="no-consumers">
                      <p>No consumers available. Please create some consumers first.</p>
                    </div>
                  )}
                  <small className="form-help">
                    Select a consumer from the dropdown. Only existing consumers can receive EV ownership.
                  </small>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowTransferModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleTransferEV}
                  disabled={isLoading || !transferOwnerId.trim()}
                >
                  {isLoading ? 'Transferring...' : 'Transfer Ownership'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EV Details Modal */}
        {showDetailsModal && selectedEV && (
          <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>EV Details - {selectedEV.externalId}</h3>
                <button 
                  type="button" 
                  className="close-btn"
                  onClick={() => setShowDetailsModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="details-grid">
                  <div className="detail-section">
                    <h4>Basic Information</h4>
                    <p><strong>EV ID:</strong> {selectedEV.id}</p>
                    <p><strong>External ID:</strong> {selectedEV.externalId}</p>
                    <p><strong>Universal ID:</strong> {selectedEV.universalId}</p>
                    <p><strong>Type ID:</strong> {selectedEV.typeId || 'N/A'}</p>
                    <p><strong>Battery ID:</strong> {selectedEV.batteryId || 'N/A'}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Manufacturing Details</h4>
                    <p><strong>Manufacturer ID:</strong> {selectedEV.manufacturerId}</p>
                    <p><strong>Created:</strong> {selectedEV.createdAt}</p>
                    <p><strong>Last Updated:</strong> {selectedEV.updatedAt}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Ownership Status</h4>
                    <p><strong>Status:</strong> {selectedEV.status || 'Created'}</p>
                    <p><strong>Owner ID:</strong> {selectedEV.ownerId || 'Not assigned'}</p>
                    <p><strong>Transfer Date:</strong> {selectedEV.ownerId ? selectedEV.updatedAt : 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit EV Modal */}
        {showEditModal && selectedEV && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Edit EV - {selectedEV.externalId}</h3>
                <button 
                  type="button" 
                  className="close-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Edit functionality will be implemented here.</p>
                <p>You can edit EV details before transferring ownership.</p>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  disabled={true}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EVManufacturerDashboard;
