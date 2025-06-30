const { Gateway, Wallets } = require('fabric-network');
const { Endorser } = require('fabric-common');
const path = require('path');
const fs = require('fs');

async function main() {
  const ccpPath = path.resolve(__dirname, 'connection-org1.json');
  const ccpRaw = fs.readFileSync(ccpPath, 'utf8');
  const ccp = JSON.parse(ccpRaw);

  const wallet = await Wallets.newFileSystemWallet(path.join(__dirname, 'wallet'));
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: 'appUser2',
    discovery: { enabled: false, asLocalhost: true }
  });

  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('libchain');

  // ✅ Manually construct Endorser with client context
  const client = gateway.client;
  const peerName = 'peer0.org1.example.com';
  const peerInfo = ccp.peers[peerName];
  const tlsCACert = peerInfo.tlsCACerts.pem || fs.readFileSync(path.resolve(__dirname, peerInfo.tlsCACerts.path), 'utf8');

 const peer = new Endorser(peerName, client);
await peer.connect(peerInfo.url.replace(/^grpcs?:\/\//, ''), {
  pem: tlsCACert,
  'ssl-target-name-override': peerInfo.grpcOptions['ssl-target-name-override'],
  requestTimeout: 3000
});


  const tx = contract.createTransaction('RegisterManufacturer');
  tx.setEndorsingPeers([peer]);

  const result = await tx.submit('manu002', 'Tesla', 'TeslaBrand');
  console.log('✅ Transaction result:', result.toString());

  await peer.disconnect();
  await gateway.disconnect();
}

main();
