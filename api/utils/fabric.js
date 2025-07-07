
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, './connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const walletPath = path.join(__dirname, './wallet');

async function getContract() {
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: 'appUser2',
    discovery: { enabled: true, asLocalhost: true }
  });
  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('libchain');
  return { contract, gateway };
}

async function invoke(fcn, args, res) {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.submitTransaction(fcn, ...args);
    await gateway.disconnect();
    res.json({ success: true, result: result.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { invoke };
