const express = require('express');
const router = express.Router();
const { getContract } = require('../utils/fabric');

// Create a new battery
router.post('/', async (req, res) => {
  try {
    const { externalId, universalId, batteryTypeId, manufacturerId, createdAt } = req.body;
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('ManufactureBattery', externalId, universalId, batteryTypeId, manufacturerId, createdAt);
    await gateway.disconnect();
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error manufacturing battery:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new battery type
router.post('/types', async (req, res) => {
  try {
    const { universalId, code, description, chemistry, capacity, voltage, manufacturerId } = req.body;
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('RegisterBatteryType', universalId, code, description, chemistry, capacity.toString(), voltage.toString(), manufacturerId);
    await gateway.disconnect();
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error registering battery type:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test a battery
router.post('/test', async (req, res) => {
  try {
    const { batteryId, testerId, result, date } = req.body;
    const { contract, gateway } = await getContract();
    const testResult = await contract.submitTransaction('TestBattery', batteryId, testerId, result, date);
    await gateway.disconnect();
    res.json({ success: true, result: testResult.toString() });
  } catch (error) {
    console.error('Error testing battery:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Recycle a battery
router.post('/recycle', async (req, res) => {
  try {
    const { batteryId, recyclerId, updatedAt } = req.body;
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction('RecycleBattery', batteryId, recyclerId, updatedAt);
    await gateway.disconnect();
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error('Error recycling battery:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all battery types
router.get('/types', async (req, res) => {
  try {
    const { manufacturerId } = req.query;
    if (manufacturerId) {
      // Use the manufacturer-specific query function
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllBatteryTypesByManufacturer', manufacturerId);
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    } else {
      // For admin purposes, get all types (currently returns empty due to LevelDB)
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllBatteryTypes');
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    }
  } catch (error) {
    console.error('Error fetching battery types:', error);
    res.status(500).json({ error: 'Failed to fetch battery types' });
  }
});

// Get all batteries
router.get('/', async (req, res) => {
  try {
    const { manufacturerId } = req.query;
    if (manufacturerId) {
      // Use the manufacturer-specific query function
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllBatteriesByManufacturer', manufacturerId);
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    } else {
      // For admin purposes, get all batteries (currently returns empty due to LevelDB)
      const { contract, gateway } = await getContract();
      const result = await contract.evaluateTransaction('QueryAllBatteries');
      await gateway.disconnect();
      const parsedResult = JSON.parse(result.toString());
      res.json({ success: true, result: parsedResult || [] });
    }
  } catch (error) {
    console.error('Error fetching batteries:', error);
    res.status(500).json({ error: 'Failed to fetch batteries' });
  }
});

// Get a specific battery by ID
router.get('/:id', async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction('QueryBattery', req.params.id);
    await gateway.disconnect();
    const parsedResult = JSON.parse(result.toString());
    res.json({ success: true, result: parsedResult });
  } catch (error) {
    console.error('Error fetching battery:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;