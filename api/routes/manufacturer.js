const express = require('express');
const router = express.Router();
const { invoke } = require('../utils/fabric');

router.post('/battery', async (req, res) => {
  const { externalId, universalId, companyCode, name, brand } = req.body;
  const args = [externalId, universalId, companyCode, name, brand];
  invoke('RegisterBatteryManufacturer', args, res);
});

router.post('/ev', async (req, res) => {
  const { externalId, universalId, companyCode, name, brand } = req.body;
  const args = [externalId, universalId, companyCode, name, brand];
  invoke('RegisterEVManufacturer', args, res);
});

router.get('/battery/:id', async (req, res) => {
  invoke('QueryBatteryManufacturer', [req.params.id], res);
});

router.get('/ev/:id', async (req, res) => {
  invoke('QueryEVManufacturer', [req.params.id], res);
});

module.exports = router;