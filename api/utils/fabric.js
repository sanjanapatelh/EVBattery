
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, './connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

// Use peer MSP identity instead of wallet
const mspPath = path.join(__dirname, '../../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp');

async function getContract() {
  const gateway = new Gateway();
  
  // Read the peer MSP identity
  const certPath = path.join(mspPath, 'signcerts', 'cert.pem');
  const keyPath = path.join(mspPath, 'keystore');
  
  // Find the private key file
  const keyFiles = fs.readdirSync(keyPath);
  const keyFile = keyFiles[0]; // Usually the first file is the private key
  
  const cert = fs.readFileSync(certPath, 'utf8');
  const key = fs.readFileSync(path.join(keyPath, keyFile), 'utf8');
  
  await gateway.connect(ccp, {
    identity: {
      credentials: {
        certificate: cert,
        privateKey: key,
      },
      mspId: 'Org1MSP',
      type: 'X.509',
    },
    discovery: { enabled: true, asLocalhost: true }
  });
  
  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('evbattery');
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

module.exports = { invoke, getContract };
