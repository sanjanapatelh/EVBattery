const express = require('express');
const router = express.Router();
const { invoke } = require('../utils/fabric');

router.post('/', async (req, res) => {
  const { externalId, manufacturerId, rawMaterials, proportion, createdAt } = req.body;
  const args = [externalId, manufacturerId, JSON.stringify(rawMaterials), proportion, createdAt];
  invoke('ManufactureBattery', args, res);
});

router.get('/:id', async (req, res) => {
  const args = [req.params.id];
  invoke('QueryBattery', args, res);
});

router.post('/test', async (req, res) => {
  const { batteryId, testerId, result, date } = req.body;
  const args = [batteryId, testerId, result, date];
  invoke('TestBattery', args, res);
});

router.post('/recycle', async (req, res) => {
  const { batteryId, recyclerId, updatedAt } = req.body;
  const args = [batteryId, recyclerId, updatedAt];
  invoke('RecycleBattery', args, res);
});

module.exports = router;