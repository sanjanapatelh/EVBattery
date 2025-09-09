const express = require('express');
const router = express.Router();
const { getContract } = require('../utils/fabric');

router.post('/battery', async (req, res) => {
  try {
    const { externalId, universalId, companyCode, name, brand } = req.body;
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('RegisterBatteryManufacturer', externalId, universalId, companyCode, name, brand);
    await gateway.disconnect();
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error registering battery manufacturer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/ev', async (req, res) => {
  try {
    const { externalId, universalId, companyCode, name, brand } = req.body;
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('RegisterEVManufacturer', externalId, universalId, companyCode, name, brand);
    await gateway.disconnect();
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error registering EV manufacturer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/evtype', async (req, res) => {
  try {
    const { universalId, code, description, model, year, manufacturerId } = req.body;
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('RegisterEVType', universalId, code, description, model, year, manufacturerId);
    await gateway.disconnect();
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error registering EV type:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/battery/:id', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('QueryBatteryManufacturer', req.params.id);
    await gateway.disconnect();
    const parsedResult = JSON.parse(result.toString());
    res.json({ success: true, result: parsedResult });
  } catch (error) {
    console.error('Error fetching battery manufacturer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/ev/:id', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('QueryEVManufacturer', req.params.id);
    await gateway.disconnect();
    const parsedResult = JSON.parse(result.toString());
    res.json({ success: true, result: parsedResult });
  } catch (error) {
    console.error('Error fetching EV manufacturer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all battery manufacturers
router.get('/battery-manufacturers', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('QueryAllBatteryManufacturers');
    await gateway.disconnect();
    
    const parsedResult = JSON.parse(result.toString());
    res.json({ success: true, result: parsedResult || [] });
  } catch (error) {
    console.error('Error fetching all battery manufacturers:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Debug endpoint to list all keys
router.get('/debug/keys', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('DebugListAllKeys');
    await gateway.disconnect();
    
    console.log('Debug keys result:', result.toString());
    const parsedResult = JSON.parse(result.toString());
    
    res.json({ success: true, result: parsedResult || [] });
  } catch (error) {
    console.error('Error listing all keys:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test endpoint to check chaincode connection
router.get('/test-connection', async (req, res) => {
  try {
    console.log('Testing chaincode connection...');
    
    const { contract, gateway } = await getContract();
    console.log('Contract obtained:', contract ? 'Yes' : 'No');
    console.log('Gateway obtained:', gateway ? 'Yes' : 'No');
    
    // Try to call a simple query function
    const result = await contract.evaluateTransaction('QueryAllBatteryManufacturers');
    console.log('Query result:', result);
    
    await gateway.disconnect();
    
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Connection test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// User Registration endpoints - consolidated here
router.post('/register/battery-manufacturer', async (req, res) => {
  try {
    const { name, brand, username, password } = req.body;
    
    // Generate IDs on the backend
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const externalId = `bman_${timestamp}_${random}`;
    const universalId = `bman_${timestamp}_${random}`;
    const companyCode = name.replace(/\s+/g, '').toUpperCase();
    
    console.log('Registering battery manufacturer:', { externalId, universalId, companyCode, name, brand, username, password: '***' });
    
    const { contract, gateway } = await getContract();
    console.log('Contract obtained:', contract ? 'Yes' : 'No');
    console.log('Gateway obtained:', gateway ? 'Yes' : 'No');
    
    // Check if the function exists
    console.log('Available functions:', Object.getOwnPropertyNames(contract));
    
    const result = await contract.submitTransaction('RegisterBatteryManufacturer', externalId, universalId, companyCode, name, brand);
    console.log('Transaction result:', result);
    
    await gateway.disconnect();
    
    console.log('Battery manufacturer registration successful:', result.toString());
    
    // Register credentials for login
    const userId = result.toString();
    if (username && password) {
      try {
        await fetch('http://localhost:3000/auth/register-credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
            userId,
            userType: 'battery-manufacturer'
          })
        });
        console.log('Credentials registered for battery manufacturer:', username);
      } catch (error) {
        console.error('Error registering credentials:', error);
      }
    }
    
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error registering battery manufacturer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/register/ev-manufacturer', async (req, res) => {
  try {
    const { name, brand, username, password } = req.body;
    
    // Generate IDs on the backend
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const externalId = `evman_${timestamp}_${random}`;
    const universalId = `evman_${timestamp}_${random}`;
    const companyCode = name.replace(/\s+/g, '').toUpperCase();
    
    console.log('Registering EV manufacturer:', { externalId, universalId, companyCode, name, brand, username, password: '***' });
    
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('RegisterEVManufacturer', externalId, universalId, companyCode, name, brand);
    await gateway.disconnect();
    
    console.log('EV manufacturer registration successful:', result.toString());
    
    // Register credentials for login
    const userId = result.toString();
    if (username && password) {
      try {
        await fetch('http://localhost:3000/auth/register-credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
            userId,
            userType: 'ev-manufacturer'
          })
        });
        console.log('Credentials registered for EV manufacturer:', username);
      } catch (error) {
        console.error('Error registering credentials:', error);
      }
    }
    
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error registering EV manufacturer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/register/ev-consumer', async (req, res) => {
  try {
    const { name, address, username, password } = req.body;
    
    // Generate IDs on the backend
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const externalId = `con_${timestamp}_${random}`;
    const universalId = `con_${timestamp}_${random}`;
    const companyCode = name.replace(/\s+/g, '').toUpperCase();
    
    console.log('Registering EV consumer:', { externalId, universalId, companyCode, name, address, username, password: '***' });
    
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('RegisterEVOwner', externalId, universalId, companyCode, name, address);
    await gateway.disconnect();
    
    console.log('EV consumer registration successful:', result.toString());
    
    // Register credentials for login
    const userId = result.toString();
    if (username && password) {
      try {
        await fetch('http://localhost:3000/auth/register-credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
            userId,
            userType: 'ev-consumer'
          })
        });
        console.log('Credentials registered for EV consumer:', username);
      } catch (error) {
        console.error('Error registering credentials:', error);
      }
    }
    
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error registering EV consumer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/register/recycler', async (req, res) => {
  try {
    const { name, location, username, password } = req.body;
    
    // Generate IDs on the backend
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const externalId = `rec_${timestamp}_${random}`;
    const universalId = `rec_${timestamp}_${random}`;
    const companyCode = name.replace(/\s+/g, '').toUpperCase();
    
    console.log('Registering recycler:', { externalId, universalId, companyCode, name, location, username, password: '***' });
    
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('RegisterRecycler', externalId, universalId, companyCode, name, location);
    await gateway.disconnect();
    
    console.log('Recycler registration successful:', result.toString());
    
    // Register credentials for login
    const userId = result.toString();
    if (username && password) {
      try {
        await fetch('http://localhost:3000/auth/register-credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
            userId,
            userType: 'recycler'
          })
        });
        console.log('Credentials registered for recycler:', username);
      } catch (error) {
        console.error('Error registering credentials:', error);
      }
    }
    
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error registering recycler:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all recyclers
router.get('/recyclers', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('QueryAllRecyclers');
    await gateway.disconnect();
    const parsedResult = JSON.parse(result.toString());
    res.json({ success: true, result: parsedResult || [] });
  } catch (error) {
    console.error('Error fetching recyclers:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Check username availability
router.get('/check-username', async (req, res) => {
  const { username } = req.query;
  try {
    // You'll need to implement this check against your database/blockchain
    // For now, returning a mock response
    const isAvailable = username && username.length >= 3;
    res.json({ available: isAvailable });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Failed to check username availability' });
  }
});

module.exports = router;
