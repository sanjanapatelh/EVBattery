const express = require('express');
const router = express.Router();
const { invoke } = require('../utils/fabric');

router.post('/', async (req, res) => {
  const { batteryId, externalId, universalId, typeId, manufacturerId, createdAt } = req.body;
  const args = [batteryId, externalId, universalId, typeId, manufacturerId, createdAt];
  invoke('BindBatteryToEV', args, res);
});

router.post('/transfer', async (req, res) => {
  const { evId, newOwnerId, updatedAt } = req.body;
  const args = [evId, newOwnerId, updatedAt];
  invoke('TransferEVToOwner', args, res);
});

router.get('/:id', async (req, res) => {
  const args = [req.params.id];
  invoke('QueryEV', args, res);
});

module.exports = router;