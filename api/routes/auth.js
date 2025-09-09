const express = require('express');
const router = express.Router();
const { getContract } = require('../utils/fabric');

// In-memory storage for user credentials (in production, use a proper database)
const userCredentials = new Map();

// Register user credentials after successful registration
router.post('/register-credentials', (req, res) => {
  try {
    const { username, password, userId, userType } = req.body;
    
    if (!username || !password || !userId || !userType) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: username, password, userId, userType' 
      });
    }
    
    // Store credentials
    userCredentials.set(username, {
      username,
      password,
      userId,
      userType,
      createdAt: new Date().toISOString()
    });
    
    console.log('Registered credentials for:', username, 'Type:', userType);
    res.json({ success: true, message: 'Credentials registered successfully' });
  } catch (error) {
    console.error('Error registering credentials:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username and password are required' 
      });
    }
    
    // Check credentials
    const credential = userCredentials.get(username);
    if (!credential) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }
    
    if (credential.password !== password) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }
    
    console.log('Login successful for:', username, 'Type:', credential.userType);
    
    // Fetch user data from blockchain
    let userData = null;
    
    try {
      const { contract, gateway } = await getContract();
      
      if (credential.userType === 'battery-manufacturer') {
        const result = await contract.evaluateTransaction('QueryBatteryManufacturer', credential.userId);
        const manufacturer = JSON.parse(result.toString());
        userData = {
          id: manufacturer.id,
          name: manufacturer.name,
          username: username,
          userType: 'battery-manufacturer',
          externalId: manufacturer.externalId,
          universalId: manufacturer.universalId,
          companyCode: manufacturer.companyCode
        };
      } else if (credential.userType === 'ev-manufacturer') {
        const result = await contract.evaluateTransaction('QueryEVManufacturer', credential.userId);
        const manufacturer = JSON.parse(result.toString());
        userData = {
          id: manufacturer.id,
          name: manufacturer.name,
          username: username,
          userType: 'ev-manufacturer',
          externalId: manufacturer.externalId,
          universalId: manufacturer.universalId,
          companyCode: manufacturer.companyCode
        };
      } else if (credential.userType === 'recycler') {
        const result = await contract.evaluateTransaction('QueryRecycler', credential.userId);
        const recycler = JSON.parse(result.toString());
        userData = {
          id: recycler.id,
          name: recycler.name,
          username: username,
          userType: 'recycler',
          externalId: recycler.externalId,
          universalId: recycler.universalId,
          companyCode: recycler.companyCode
        };
      } else if (credential.userType === 'ev-consumer') {
        const result = await contract.evaluateTransaction('QueryEVOwner', credential.userId);
        const owner = JSON.parse(result.toString());
        userData = {
          id: owner.id,
          name: owner.name,
          username: username,
          userType: 'ev-consumer',
          externalId: owner.externalId,
          universalId: owner.universalId,
          companyCode: owner.companyCode
        };
      }
      
      await gateway.disconnect();
      
      if (userData) {
        res.json({ success: true, user: userData });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'Failed to fetch user data from blockchain' 
        });
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch user data from blockchain' 
      });
    }
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!', timestamp: new Date().toISOString() });
});

// Get all registered users (for debugging)
router.get('/users', (req, res) => {
  try {
    const users = Array.from(userCredentials.values()).map(cred => ({
      username: cred.username,
      userType: cred.userType,
      userId: cred.userId,
      createdAt: cred.createdAt
    }));
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
