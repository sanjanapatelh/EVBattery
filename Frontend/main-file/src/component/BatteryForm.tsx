import React, { useState } from 'react';
import { batteryAPI } from '../services/api';
import useApi from '../hooks/useApi';

interface BatteryFormData {
  externalId: string;
  universalId: string;
  batteryTypeId: string;
  manufacturerId: string;
  createdAt: string;
}

const BatteryForm: React.FC = () => {
  const [formData, setFormData] = useState<BatteryFormData>({
    externalId: '',
    universalId: '',
    batteryTypeId: '',
    manufacturerId: '',
    createdAt: new Date().toISOString().split('T')[0],
  });

  const { execute: createBattery, loading, error, data, reset } = useApi(batteryAPI.createBattery);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBattery(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      externalId: '',
      universalId: '',
      batteryTypeId: '',
      manufacturerId: '',
      createdAt: new Date().toISOString().split('T')[0],
    });
    reset();
  };

  return (
    <div className="battery-form">
      <h2>Create New Battery</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {data && (
        <div className="alert alert-success" role="alert">
          Battery created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="externalId" className="form-label">
            External ID
          </label>
          <input
            type="text"
            className="form-control"
            id="externalId"
            name="externalId"
            value={formData.externalId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="universalId" className="form-label">
            Universal ID
          </label>
          <input
            type="text"
            className="form-control"
            id="universalId"
            name="universalId"
            value={formData.universalId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="batteryTypeId" className="form-label">
            Battery Type ID
          </label>
          <input
            type="text"
            className="form-control"
            id="batteryTypeId"
            name="batteryTypeId"
            value={formData.batteryTypeId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="manufacturerId" className="form-label">
            Manufacturer ID
          </label>
          <input
            type="text"
            className="form-control"
            id="manufacturerId"
            name="manufacturerId"
            value={formData.manufacturerId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="createdAt" className="form-label">
            Created Date
          </label>
          <input
            type="date"
            className="form-control"
            id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Battery'}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default BatteryForm;
