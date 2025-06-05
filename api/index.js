const express = require('express');
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const ccpPath = path.resolve(__dirname, 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
const walletPath = path.join(__dirname, 'wallet');

async function getGateway() {
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser', // Or whatever user you enrolled
        discovery: { enabled: true, asLocalhost: true }
    });
    return gateway;
}

// Invoke (submitTransaction)
app.post('/api/invoke', async (req, res) => {
    try {
        const { function: fcn, args } = req.body;
        const gateway = await getGateway();
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('libchain');
        const result = await contract.submitTransaction(fcn, ...args);
        await gateway.disconnect();
        res.json({ result: result.toString() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query (evaluateTransaction)
app.post('/api/query', async (req, res) => {
    try {
        const { function: fcn, args } = req.body;
        const gateway = await getGateway();
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('libchain');
        const result = await contract.evaluateTransaction(fcn, ...args);
        await gateway.disconnect();
        res.json({ result: result.toString() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`API server running at http://localhost:${PORT}`));
