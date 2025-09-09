import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../component/dashboard/DashboardLayout';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Dashboard.css';

interface Battery {
  id: string;
  externalId: string;
  universalId: string;
  typeId: string;
  manufacturerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface RecyclingJob {
  id: string;
  batteryId: string;
  recyclerId: string;
  status: string;
  startDate: string;
  completionDate?: string;
  notes?: string;
}

interface RecyclerProfile {
  id: string;
  externalId: string;
  universalId: string;
  companyCode: string;
  name: string;
  location: string;
}

const RecyclerPage: React.FC = () => {
  const { user } = useAuth();
  const [recyclerProfile, setRecyclerProfile] = useState<RecyclerProfile | null>(null);
  const [batteriesForRecycling, setBatteriesForRecycling] = useState<Battery[]>([]);
  const [activeRecyclingJobs, setActiveRecyclingJobs] = useState<RecyclingJob[]>([]);
  const [completedJobs, setCompletedJobs] = useState<RecyclingJob[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showRecyclingModal, setShowRecyclingModal] = useState(false);
  const [selectedBattery, setSelectedBattery] = useState<Battery | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalBatteries: 0,
    activeJobs: 0,
    completedJobs: 0,
    recyclingRate: 0
  });

  // Require authentication
  if (!user) {
    return (
      <DashboardLayout title="Recycler Dashboard" userType="recycler">
        <div className="loading-container">
          <p>Please login to access the dashboard.</p>
        </div>
      </DashboardLayout>
    );
  }

  useEffect(() => {
    fetchRecyclerProfile();
    fetchBatteriesForRecycling();
    fetchRecyclingJobs();
  }, []);

  const fetchRecyclerProfile = async () => {
    try {
      const response = await fetch(`/api/manufacturer/recyclers`);
      if (response.ok) {
        const data = await response.json();
        const profile = data.result.find((r: RecyclerProfile) => r.id === user.id);
        if (profile) {
          setRecyclerProfile(profile);
        }
      }
    } catch (error) {
      console.error('Error fetching recycler profile:', error);
    }
  };

  const fetchBatteriesForRecycling = async () => {
    try {
      const response = await fetch('/api/battery');
      if (response.ok) {
        const data = await response.json();
        const forRecycling = (data.result || []).filter((battery: Battery) => 
          battery.status === 'End of Life' || 
          battery.status === 'For Recycling' ||
          battery.status === 'Damaged'
        );
        setBatteriesForRecycling(forRecycling);
        setStats(prev => ({ ...prev, totalBatteries: forRecycling.length }));
      } else {
        console.error('Failed to fetch batteries for recycling');
        toast.error('Failed to fetch batteries for recycling');
      }
    } catch (error) {
      console.error('Error fetching batteries for recycling:', error);
      toast.error('Error fetching batteries for recycling');
    }
  };

  const fetchRecyclingJobs = async () => {
    try {
      // For now, we'll simulate recycling jobs since the endpoint might not exist
      const mockJobs: RecyclingJob[] = [
        {
          id: 'JOB_001',
          batteryId: 'BATT_001',
          recyclerId: user.id,
          status: 'In Progress',
          startDate: new Date().toISOString(),
          notes: 'Battery disassembly in progress'
        }
      ];
      
      setActiveRecyclingJobs(mockJobs.filter(job => job.status === 'In Progress'));
      setCompletedJobs(mockJobs.filter(job => job.status === 'Completed'));
      
      setStats(prev => ({ 
        ...prev, 
        activeJobs: mockJobs.filter(job => job.status === 'In Progress').length,
        completedJobs: mockJobs.filter(job => job.status === 'Completed').length
      }));
      
    } catch (error) {
      console.error('Error fetching recycling jobs:', error);
      toast.error('Error fetching recycling jobs');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleStartRecycling = async (battery: Battery) => {
    setIsLoading(true);
    try {
      // Simulate starting recycling process
      const newJob: RecyclingJob = {
        id: `JOB_${Date.now()}`,
        batteryId: battery.id,
        recyclerId: user.id,
        status: 'In Progress',
        startDate: new Date().toISOString(),
        notes: 'Recycling process started'
      };
      
      setActiveRecyclingJobs(prev => [...prev, newJob]);
      setStats(prev => ({ ...prev, activeJobs: prev.activeJobs + 1 }));
      
      toast.success('Recycling process started successfully!');
      setShowRecyclingModal(false);
      setSelectedBattery(null);
    } catch (error) {
      console.error('Error starting recycling:', error);
      toast.error('Failed to start recycling process');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteJob = async (jobId: string) => {
    try {
      setActiveRecyclingJobs(prev => prev.filter(job => job.id !== jobId));
      const completedJob = activeRecyclingJobs.find(job => job.id === jobId);
      if (completedJob) {
        const updatedJob = { ...completedJob, status: 'Completed', completionDate: new Date().toISOString() };
        setCompletedJobs(prev => [...prev, updatedJob]);
        setStats(prev => ({ 
          ...prev, 
          activeJobs: prev.activeJobs - 1,
          completedJobs: prev.completedJobs + 1
        }));
        toast.success('Recycling job completed successfully!');
      }
    } catch (error) {
      console.error('Error completing job:', error);
      toast.error('Failed to complete recycling job');
    }
  };

  const openRecyclingModal = (battery: Battery) => {
    setSelectedBattery(battery);
    setShowRecyclingModal(true);
  };

  if (isLoadingData) {
    return (
      <DashboardLayout title="Recycler Dashboard" userType="recycler">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading recycler dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Recycler Dashboard" userType="recycler">
      <div className="dashboard-container">
        {/* Profile Section */}
        <div className="section-header">
          <h2>Welcome, {recyclerProfile?.name || user.name}!</h2>
          <p>Manage your recycling operations and track battery processing</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔋</div>
            <div className="stat-content">
              <h3>{stats.totalBatteries}</h3>
              <p>Batteries Available</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h3>{stats.activeJobs}</h3>
              <p>Active Jobs</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.completedJobs}</h3>
              <p>Completed Jobs</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{stats.completedJobs > 0 ? Math.round((stats.completedJobs / (stats.completedJobs + stats.activeJobs)) * 100) : 0}%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>

        {/* Batteries for Recycling */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Batteries Available for Recycling</h3>
            <p>Batteries that are ready to be processed for recycling</p>
          </div>
          
          {batteriesForRecycling.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔋</div>
              <h4>No batteries available for recycling</h4>
              <p>Batteries will appear here when they reach end-of-life or are marked for recycling</p>
            </div>
          ) : (
            <div className="battery-grid">
              {batteriesForRecycling.map((battery) => (
                <div key={battery.id} className="battery-card">
                  <div className="battery-header">
                    <h4>Battery {battery.externalId}</h4>
                    <span className={`status-badge ${battery.status.toLowerCase().replace(' ', '-')}`}>
                      {battery.status}
                    </span>
                  </div>
                  <div className="battery-details">
                    <div className="detail-row">
                      <label>Universal ID:</label>
                      <span>{battery.universalId}</span>
                    </div>
                    <div className="detail-row">
                      <label>Type ID:</label>
                      <span>{battery.typeId || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <label>Manufacturer:</label>
                      <span>{battery.manufacturerId}</span>
                    </div>
                    <div className="detail-row">
                      <label>Created:</label>
                      <span>{new Date(battery.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="battery-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => openRecyclingModal(battery)}
                      disabled={isLoading}
                    >
                      Start Recycling
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Recycling Jobs */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Active Recycling Jobs</h3>
            <p>Currently processing batteries for recycling</p>
          </div>
          
          {activeRecyclingJobs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⚡</div>
              <h4>No active recycling jobs</h4>
              <p>Start recycling batteries to see active jobs here</p>
            </div>
          ) : (
            <div className="job-grid">
              {activeRecyclingJobs.map((job) => (
                <div key={job.id} className="job-card active">
                  <div className="job-header">
                    <h4>Job {job.id}</h4>
                    <span className="status-badge in-progress">In Progress</span>
                  </div>
                  <div className="job-details">
                    <div className="detail-row">
                      <label>Battery ID:</label>
                      <span>{job.batteryId}</span>
                    </div>
                    <div className="detail-row">
                      <label>Started:</label>
                      <span>{new Date(job.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                      <label>Notes:</label>
                      <span>{job.notes || 'No notes'}</span>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button
                      className="btn btn-success"
                      onClick={() => handleCompleteJob(job.id)}
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Jobs */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Completed Recycling Jobs</h3>
            <p>Successfully completed recycling operations</p>
          </div>
          
          {completedJobs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <h4>No completed jobs yet</h4>
              <p>Complete your first recycling job to see it here</p>
            </div>
          ) : (
            <div className="job-grid">
              {completedJobs.map((job) => (
                <div key={job.id} className="job-card completed">
                  <div className="job-header">
                    <h4>Job {job.id}</h4>
                    <span className="status-badge completed">Completed</span>
                  </div>
                  <div className="job-details">
                    <div className="detail-row">
                      <label>Battery ID:</label>
                      <span>{job.batteryId}</span>
                    </div>
                    <div className="detail-row">
                      <label>Started:</label>
                      <span>{new Date(job.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                      <label>Completed:</label>
                      <span>{job.completionDate ? new Date(job.completionDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <label>Notes:</label>
                      <span>{job.notes || 'No notes'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recycling Modal */}
      {showRecyclingModal && selectedBattery && (
        <div className="modal-overlay" onClick={() => setShowRecyclingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Start Recycling Process</h3>
              <button
                className="close-btn"
                onClick={() => setShowRecyclingModal(false)}
                type="button"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="battery-info">
                <h4>Battery Details</h4>
                <div className="detail-item">
                  <label>ID:</label>
                  <span>{selectedBattery.id}</span>
                </div>
                <div className="detail-item">
                  <label>External ID:</label>
                  <span>{selectedBattery.externalId}</span>
                </div>
                <div className="detail-item">
                  <label>Status:</label>
                  <span className={`status-badge ${selectedBattery.status.toLowerCase().replace(' ', '-')}`}>
                    {selectedBattery.status}
                  </span>
                </div>
              </div>
              <div className="recycling-process">
                <h4>Recycling Process</h4>
                <p>This will start the recycling process for the selected battery. The battery will be marked as "In Progress" and you can track its status.</p>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowRecyclingModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleStartRecycling(selectedBattery)}
                disabled={isLoading}
              >
                {isLoading ? 'Starting...' : 'Start Recycling'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RecyclerPage;
