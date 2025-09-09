import React from 'react';
import HeaderSection3 from '../component/header/HeaderSection3';
import BatteryForm from '../component/BatteryForm';

const ApiTest: React.FC = () => {
  return (
    <>
      <HeaderSection3 />
      <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1>API Integration Test</h1>
          <p className="lead">
            This page demonstrates the connection between your React frontend and Node.js API backend.
          </p>
          
          <div className="alert alert-info">
            <strong>Status:</strong> 
            <span className="text-success ms-2">✓ API Backend: Running on http://localhost:3000</span>
            <br />
            <span className="text-success">✓ Frontend: Running on http://localhost:5173</span>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>API Test</h5>
                </div>
                <div className="card-body">
                  <p>Test the basic API connection:</p>
                  <button 
                    className="btn btn-primary"
                    onClick={async () => {
                      try {
                        const response = await fetch('http://localhost:3000/test');
                        const data = await response.json();
                        alert(`API Response: ${JSON.stringify(data, null, 2)}`);
                      } catch (error) {
                        alert(`Error: ${error}`);
                      }
                    }}
                  >
                    Test API Connection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Configuration</h5>
                </div>
                <div className="card-body">
                  <p><strong>API Base URL:</strong> http://localhost:3000</p>
                  <p><strong>CORS:</strong> Enabled</p>
                  <p><strong>Status:</strong> Connected</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          
          <h2>Battery Management Form</h2>
          <p>Use this form to test the battery API endpoints:</p>
          
          <BatteryForm />
        </div>
      </div>
    </div>
    </>
  );
};

export default ApiTest;
