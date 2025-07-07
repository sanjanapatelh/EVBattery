const express = require('express');
const router = express.Router();
const { invoke } = require('../utils/fabric');

router.post('/', async (req, res) => {
  const { externalId, universalId, companyCode, name, address } = req.body;
  const args = [externalId, universalId, companyCode, name, address];
  invoke('RegisterCarOwner', args, res);
});

router.get('/:id', async (req, res) => {
  invoke('QueryCarOwner', [req.params.id], res);
});

module.exports = router;