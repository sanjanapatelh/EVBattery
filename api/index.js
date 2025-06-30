const express = require('express');
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// Load connection profile
const ccpPath = path.resolve(__dirname, 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const walletPath = path.join(__dirname, 'wallet');

async function getGateway() {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser2',  // Make sure this identity exists in wallet
        discovery: { enabled: true, asLocalhost: true },
    });
    return gateway;
}

app.post('/api/invoke', async (req, res) => {
    try {
        const { fcn, args } = req.body;
        const gateway = await getGateway();
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('libchain'); // use your actual chaincode name
        const result = await contract.submitTransaction(fcn, ...args);
        await gateway.disconnect();
        res.json({ success: true, result: result.toString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});
