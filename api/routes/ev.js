const express = require('express');
const router = express.Router();
const { getContract } = require('../utils/fabric');

router.post('/', async (req, res) => {
  try {
    const { batteryId, externalId, universalId, manufacturerId, createdAt } = req.body;
    
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('CreateEV', batteryId, externalId, universalId, manufacturerId, createdAt);
    await gateway.disconnect();
    
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error creating EV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/transfer', async (req, res) => {
  try {
    const { evId, newOwnerId, updatedAt } = req.body;
    const args = [evId, newOwnerId, updatedAt];
    
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('TransferEVToOwner', ...args);
    await gateway.disconnect();
    
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error transferring EV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all EV types
router.get('/types', async (req, res) => {
  try {
    const { manufacturerId } = req.query;
    
    if (manufacturerId) {
      // Get EV types by specific manufacturer
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllEVTypesByManufacturer', manufacturerId);
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    } else {
      // Get all EV types
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllEVTypes');
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    }
  } catch (error) {
    console.error('Error fetching EV types:', error);
    res.status(500).json({ error: 'Failed to fetch EV types' });
  }
});

// Get all EVs
router.get('/', async (req, res) => {
  try {
    const { manufacturerId, ownerId } = req.query;
    
    if (manufacturerId) {
      // Get EVs by specific manufacturer
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllEVsByManufacturer', manufacturerId);
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    } else if (ownerId) {
      // Get EVs by specific owner
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllEVsByOwner', ownerId);
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    } else {
      // Get all EVs
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllEVs');
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    }
  } catch (error) {
    console.error('Error fetching EVs:', error);
    res.status(500).json({ error: 'Failed to fetch EVs' });
  }
});

// Get all EV owners
router.get('/owners', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('QueryAllEVOwners');
    await gateway.disconnect();
    const parsedResult = JSON.parse(result.toString());
    res.json({ success: true, result: parsedResult || [] });
  } catch (error) {
    console.error('Error fetching all EV owners:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('QueryEV', req.params.id);
    await gateway.disconnect();
    const parsedResult = JSON.parse(result.toString());
    res.json({ success: true, result: parsedResult });
  } catch (error) {
    console.error('Error fetching EV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get EV owner by ID
router.get('/owner/:id', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('QueryEVOwner', req.params.id);
    await gateway.disconnect();
    const parsedResult = JSON.parse(result.toString());
    res.json({ success: true, result: parsedResult });
  } catch (error) {
    console.error('Error fetching EV owner:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;