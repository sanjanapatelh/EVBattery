import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../component/dashboard/DashboardLayout';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

interface Battery {
  id: string;
  externalId: string;
  universalId: string;
  typeId: string;  // Changed from batteryTypeId to typeId to match API
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

const RecyclerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [batteriesForRecycling, setBatteriesForRecycling] = useState<Battery[]>([]);
  const [activeRecyclingJobs, setActiveRecyclingJobs] = useState<RecyclingJob[]>([]);
  const [completedJobs, setCompletedJobs] = useState<RecyclingJob[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showRecyclingModal, setShowRecyclingModal] = useState(false);
  const [selectedBattery, setSelectedBattery] = useState<Battery | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    fetchBatteriesForRecycling();
    fetchRecyclingJobs();
  }, []); // Remove user dependency to prevent infinite loop

  const fetchBatteriesForRecycling = async () => {
    try {
      // Get batteries that are ready for recycling
      const response = await fetch('/api/battery');
      if (response.ok) {
        const data = await response.json();
        // Filter batteries that are ready for recycling
        const forRecycling = (data.result || []).filter((battery: Battery) => 
          battery.status === 'End of Life' || 
          battery.status === 'For Recycling' ||
          battery.status === 'Damaged'
        );
        setBatteriesForRecycling(forRecycling);
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
      // Get recycling jobs for this recycler
      const response = await fetch(`/api/recycling/recycler/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        const jobs = data.result || [];
        setActiveRecyclingJobs(jobs.filter((job: RecyclingJob) => job.status === 'In Progress'));
        setCompletedJobs(jobs.filter((job: RecyclingJob) => job.status === 'Completed'));
      } else {
        console.error('Failed to fetch recycling jobs');
        toast.error('Failed to fetch recycling jobs');
      }
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
      const response = await fetch('/api/recycling/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batteryId: battery.id,
          recyclerId: user.id,
          startDate: new Date().toISOString(),
          status: 'In Progress'
        }),
      });

      if (response.ok) {
        toast.success('Recycling job started successfully!');
        setShowRecyclingModal(false);
        setSelectedBattery(null);
        // Refresh both lists
        fetchBatteriesForRecycling();
        fetchRecyclingJobs();
      } else {
        toast.error('Failed to start recycling job');
      }
    } catch (error) {
      toast.error('Error starting recycling job');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteRecycling = async (jobId: string) => {
    try {
      const response = await fetch(`/api/recycling/${jobId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Completed',
          completionDate: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success('Recycling job completed!');
        fetchRecyclingJobs();
      } else {
        toast.error('Failed to complete recycling job');
      }
    } catch (error) {
      toast.error('Error completing recycling job');
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
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading dashboard data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Recycler Dashboard" userType="recycler">
      <div className="dashboard-grid">
        {/* Batteries Ready for Recycling */}
        <div className="dashboard-section">
          <h3>Batteries Ready for Recycling</h3>
          <p className="section-description">
            Batteries that have reached end of life and need recycling
          </p>
          {batteriesForRecycling.length === 0 ? (
            <div className="empty-state">
              <p>No batteries are currently ready for recycling.</p>
            </div>
          ) : (
            <div className="batteries-grid">
              {batteriesForRecycling.map((battery) => (
                <div key={battery.id} className="battery-card recycling">
                  <div className="battery-header">
                    <h4>Battery {battery.externalId}</h4>
                    <span className={`status-badge ${battery.status?.toLowerCase().replace(' ', '-') || 'for-recycling'}`}>
                      {battery.status || 'For Recycling'}
                    </span>
                  </div>
                  <div className="battery-details">
                    <p><strong>Universal ID:</strong> {battery.universalId}</p>
                    <p><strong>Type ID:</strong> {battery.typeId}</p>
                    <p><strong>Original Manufacturer:</strong> {battery.manufacturerId}</p>
                    <p><strong>Created:</strong> {battery.createdAt}</p>
                    <p><strong>Last Updated:</strong> {battery.updatedAt}</p>
                  </div>
                  <div className="battery-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => openRecyclingModal(battery)}
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
          <h3>Active Recycling Jobs</h3>
          {activeRecyclingJobs.length === 0 ? (
            <div className="empty-state">
              <p>No active recycling jobs at the moment.</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {activeRecyclingJobs.map((job) => (
                <div key={job.id} className="job-card active">
                  <div className="job-header">
                    <h4>Job #{job.id}</h4>
                    <span className="status-badge in-progress">In Progress</span>
                  </div>
                  <div className="job-details">
                    <p><strong>Battery ID:</strong> {job.batteryId}</p>
                    <p><strong>Start Date:</strong> {job.startDate}</p>
                    <p><strong>Notes:</strong> {job.notes || 'No notes'}</p>
                  </div>
                  <div className="job-actions">
                    <button 
                      className="btn btn-success"
                      onClick={() => handleCompleteRecycling(job.id)}
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Recycling Jobs */}
        <div className="dashboard-section">
          <h3>Completed Recycling Jobs</h3>
          {completedJobs.length === 0 ? (
            <div className="empty-state">
              <p>No completed recycling jobs yet.</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {completedJobs.map((job) => (
                <div key={job.id} className="job-card completed">
                  <div className="job-header">
                    <h4>Job #{job.id}</h4>
                    <span className="status-badge completed">Completed</span>
                  </div>
                  <div className="job-details">
                    <p><strong>Battery ID:</strong> {job.batteryId}</p>
                    <p><strong>Start Date:</strong> {job.startDate}</p>
                    <p><strong>Completion Date:</strong> {job.completionDate}</p>
                    <p><strong>Notes:</strong> {job.notes || 'No notes'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Start Recycling Modal */}
      {showRecyclingModal && selectedBattery && (
        <div className="modal-overlay" onClick={() => setShowRecyclingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Start Recycling Process</h3>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowRecyclingModal(false)}
              >
                ×
              </button>
            </div>
            <div className="recycling-details">
              <h4>Battery {selectedBattery.externalId}</h4>
              <p><strong>Universal ID:</strong> {selectedBattery.universalId}</p>
              <p><strong>Type ID:</strong> {selectedBattery.typeId}</p>
              <p><strong>Manufacturer:</strong> {selectedBattery.manufacturerId}</p>
              <p><strong>Current Status:</strong> {selectedBattery.status}</p>
              
              <div className="recycling-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowRecyclingModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => handleStartRecycling(selectedBattery)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Starting...' : 'Start Recycling Process'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RecyclerDashboard;
