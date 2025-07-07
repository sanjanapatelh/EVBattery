const express = require('express');
const router = express.Router();
const { invoke } = require('../utils/fabric');

router.post('/', async (req, res) => {
  const { externalId, universalId, companyCode, name, location } = req.body;
  const args = [externalId, universalId, companyCode, name, location];
  invoke('RegisterRecycler', args, res);
});

router.get('/:id', async (req, res) => {
  invoke('QueryRecycler', [req.params.id], res);
});

module.exports = router;