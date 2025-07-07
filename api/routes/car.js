const express = require('express');
const router = express.Router();
const { invoke } = require('../utils/fabric');

router.post('/', async (req, res) => {
  const { batteryId, externalId, make, model, year, manufacturerId, createdAt } = req.body;
  const args = [batteryId, externalId, make, model, year, manufacturerId, createdAt];
  invoke('BindBatteryToCar', args, res);
});

router.post('/transfer', async (req, res) => {
  const { carId, newOwnerId, updatedAt } = req.body;
  const args = [carId, newOwnerId, updatedAt];
  invoke('TransferCarToOwner', args, res);
});

router.get('/:id', async (req, res) => {
  const args = [req.params.id];
  invoke('QueryCar', args, res);
});

module.exports = router;