## Facbric set up  

```bash
curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
./install-fabric.sh docker samples binary
./network.sh down
./network.sh up
docker ps -a 
./network.sh createChannel
./network.sh up createChannel
docker images | grep fabric-ccenv

./network.sh down./monitordocker.sh fabric_test
./network.sh up createChannel -ca


**************************************************

>> Path and deploy chaincode - run from test network

./network.sh down
./network.sh up createChannel -c mychannel -ca
./network.sh deployCC -ccn libchain -ccp ../../contract -ccl go


**************************************************

## Test 

```b
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=$PWD/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051



>> Call :


peer chaincode invoke -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile $PWD/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
  -C mychannel \
  -n libchain \
  -c '{"function":"RegisterBatteryManufacturer","Args":["EXT001","UNIV-BATT-M001","BMCO","BatteryCo","VoltPro"]}'


peer chaincode invoke -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile $PWD/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
  -C mychannel \
  -n libchain \
  -c '{"function":"RegisterEVManufacturer","Args":["EXT002","UNIV-EVM-M001","EVCO","EVMaker","AutoEdge"]}'



>> Query :

peer chaincode query -C mychannel -n libchain -c '{"function":"QueryBattery","Args":["battery001"]}'

******************************************************************

Postman : 

docker ps
npm init -y
npm install express body-parser fabric-network
#start loclhost 3000


******************************************************************

Wallet :

rm -rf wallet/
npm install fabric-ca-client fabric-network
node enrollAdmin.js    
node registerUser.js 
node index.js 

lsof -i :3000


*****************************************************************

Certificate : 
organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt


******************************************************************

Testing Chain Code :

peer lifecycle chaincode querycommitted --channelID mychannel --name evbattery
lsof -nP -i :3000
kill -9 pid
```


***************************************************************

## Frontend 

npm install 
npm install react-router-dom