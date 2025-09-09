import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../component/dashboard/DashboardLayout';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

interface BatteryType {
  id: string;
  universalId: string;
  code: string;
  description: string;
  chemistry: string;
  capacity: number;
  voltage: number;
  manufacturerId: string;
}

interface Battery {
  id: string;
  externalId: string;
  universalId: string;
  batteryTypeId: string;
  manufacturerId: string;
  status: string;
  createdAt: string;
}

const BatteryManufacturerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [batteryTypes, setBatteryTypes] = useState<BatteryType[]>([]);
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [showCreateTypeModal, setShowCreateTypeModal] = useState(false);
  const [showCreateBatteryModal, setShowCreateBatteryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Stats state
  const [stats, setStats] = useState({
    totalBatteryTypes: 0,
    totalBatteries: 0,
    activeBatteries: 0,
    completedBatteries: 0
  });

  // Fetch real data from backend for this specific manufacturer
  useEffect(() => {
    if (user) {
      fetchBatteryTypes();
      fetchBatteries();
    }
  }, [user]);

  const fetchBatteryTypes = async () => {
    try {
      // Use the manufacturer ID from the logged-in user
      const manufacturerId = user?.externalId || user?.id;
      const response = await fetch(`/api/battery/types?manufacturerId=${manufacturerId}`);
      if (response.ok) {
        const data = await response.json();
        setBatteryTypes(data.result || []);
        setStats(prev => ({ ...prev, totalBatteryTypes: (data.result || []).length }));
      } else {
        console.error('Failed to fetch battery types');
        toast.error('Failed to fetch battery types');
        setStats(prev => ({ ...prev, totalBatteryTypes: 0 }));
      }
    } catch (error) {
      console.error('Error fetching battery types:', error);
      toast.error('Error fetching battery types');
    }
  };

  const fetchBatteries = async () => {
    try {
      // Use the manufacturer ID from the logged-in user
      const manufacturerId = user?.externalId || user?.id;
      const response = await fetch(`/api/battery?manufacturerId=${manufacturerId}`);
      if (response.ok) {
        const data = await response.json();
        setBatteries(data.result || []);
        setStats(prev => ({ 
          ...prev, 
          totalBatteries: (data.result || []).length,
          activeBatteries: (data.result || []).filter((b: Battery) => b.status === 'Manufactured').length,
          completedBatteries: (data.result || []).filter((b: Battery) => b.status === 'Completed').length
        }));
      } else {
        console.error('Failed to fetch batteries');
        toast.error('Failed to fetch batteries');
        setStats(prev => ({ 
          ...prev, 
          totalBatteries: 0,
          activeBatteries: 0,
          completedBatteries: 0
        }));
      }
    } catch (error) {
      console.error('Error fetching batteries:', error);
      toast.error('Error fetching batteries');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleCreateBatteryType = async (formData: any) => {
    setIsLoading(true);
    try {
      // Use the manufacturer ID from the logged-in user
      const manufacturerId = user?.externalId || user?.id;
      const requestData = { ...formData, manufacturerId };
      
      const response = await fetch('/api/battery/types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Battery type created successfully!');
        setShowCreateTypeModal(false);
        // Refresh battery types list
        fetchBatteryTypes();
      } else {
        toast.error('Failed to create battery type');
      }
    } catch (error) {
      toast.error('Error creating battery type');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBattery = async (formData: any) => {
    setIsLoading(true);
    try {
      // Use the manufacturer ID from the logged-in user
      const manufacturerId = user?.externalId || user?.id;
      const requestData = { ...formData, manufacturerId };
      
      const response = await fetch('/api/battery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Battery created successfully!');
        setShowCreateBatteryModal(false);
        // Refresh batteries list
        fetchBatteries();
      } else {
        toast.error('Failed to create battery');
      }
    } catch (error) {
      toast.error('Error creating battery');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <DashboardLayout title="Battery Manufacturer Dashboard" userType="battery-manufacturer">
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading battery data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Battery Manufacturer Dashboard" userType="battery-manufacturer">
      <div className="dashboard-grid">
        {/* Action Buttons */}
        <div className="dashboard-section">
          <div className="action-buttons">
            <button 
              className="action-btn primary"
              onClick={() => setShowCreateTypeModal(true)}
            >
              🔋 Create Battery Type
            </button>
            <button 
              className="action-btn primary"
              onClick={() => setShowCreateBatteryModal(true)}
            >
              ⚡ Create Battery
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔋</div>
            <div className="stat-content">
              <h3>{stats.totalBatteryTypes}</h3>
              <p>Battery Types</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h3>{stats.totalBatteries}</h3>
              <p>Total Batteries</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.activeBatteries}</h3>
              <p>Active Batteries</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>{stats.completedBatteries}</h3>
              <p>Completed Batteries</p>
            </div>
          </div>
        </div>

        {/* Battery Types */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Available Battery Types</h3>
          </div>
          {batteryTypes.length === 0 ? (
            <div className="empty-state">
              <p>No battery types available. Create your first battery type!</p>
            </div>
          ) : (
            <div className="battery-types-grid">
              {batteryTypes.map((type) => (
                <div key={type.id} className="battery-type-card">
                  <div className="type-header">
                    <h4>{type.code}</h4>
                    <span className="chemistry-badge">{type.chemistry}</span>
                  </div>
                  <div className="type-details">
                    <p><strong>Description:</strong> {type.description}</p>
                    <p><strong>Capacity:</strong> {type.capacity}Ah</p>
                    <p><strong>Voltage:</strong> {type.voltage}V</p>
                    <p><strong>ID:</strong> {type.universalId}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Batteries */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Available Batteries</h3>
          </div>
          {batteries.length === 0 ? (
            <div className="empty-state">
              <p>No batteries available. Create your first battery!</p>
            </div>
          ) : (
            <div className="batteries-grid">
              {batteries.map((battery) => (
                <div key={battery.id} className="battery-card">
                  <div className="battery-header">
                    <h4>Battery {battery.externalId}</h4>
                    <span className="status-badge available">Available</span>
                  </div>
                  <div className="battery-details">
                    <p><strong>Universal ID:</strong> {battery.universalId}</p>
                    <p><strong>Type ID:</strong> {battery.batteryTypeId}</p>
                    <p><strong>Created:</strong> {battery.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Battery Type Modal */}
      {showCreateTypeModal && (
        <CreateBatteryTypeModal
          onClose={() => setShowCreateTypeModal(false)}
          onSubmit={handleCreateBatteryType}
          isLoading={isLoading}
        />
      )}

      {/* Create Battery Modal */}
      {showCreateBatteryModal && (
        <CreateBatteryModal
          onClose={() => setShowCreateBatteryModal(false)}
          onSubmit={handleCreateBattery}
          isLoading={isLoading}
          batteryTypes={batteryTypes}
        />
      )}
    </DashboardLayout>
  );
};

// Create Battery Type Modal Component
const CreateBatteryTypeModal: React.FC<{
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}> = ({ onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    universalId: '',
    code: '',
    description: '',
    chemistry: '',
    capacity: '',
    voltage: '',
    manufacturerId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Battery Type</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Universal ID</label>
            <input
              type="text"
              value={formData.universalId}
              onChange={(e) => setFormData({...formData, universalId: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Chemistry</label>
            <input
              type="text"
              value={formData.chemistry}
              onChange={(e) => setFormData({...formData, chemistry: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Capacity (Ah)</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Voltage (V)</label>
            <input
              type="number"
              value={formData.voltage}
              onChange={(e) => setFormData({...formData, voltage: e.target.value})}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Battery Type'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Create Battery Modal Component
const CreateBatteryModal: React.FC<{
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  batteryTypes: BatteryType[];
}> = ({ onClose, onSubmit, isLoading, batteryTypes }) => {
  const [formData, setFormData] = useState({
    externalId: '',
    universalId: '',
    batteryTypeId: '',
    manufacturerId: '',
    createdAt: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Battery</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>External ID</label>
            <input
              type="text"
              value={formData.externalId}
              onChange={(e) => setFormData({...formData, externalId: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Universal ID</label>
            <input
              type="text"
              value={formData.universalId}
              onChange={(e) => setFormData({...formData, universalId: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Battery Type</label>
            <select
              value={formData.batteryTypeId}
              onChange={(e) => setFormData({...formData, batteryTypeId: e.target.value})}
              required
            >
              <option value="">Select Battery Type</option>
              {batteryTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.code} - {type.description}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Battery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BatteryManufacturerDashboard;
