#!/bin/bash

# Define paths and variables
API_DIR="./api"
CHAINCODE_DIR="./contract"
TEST_NETWORK_DIR="./fabric-samples/test-network"
LOG_FILE="./reset-logs.txt"
CHAINCODE_VERSION="1.$(date +%s)"
ORDERER_CA="$TEST_NETWORK_DIR/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

echo "🕒 Starting reset at $(date)" | tee $LOG_FILE

echo "🚨 Shutting down Fabric network..." | tee -a $LOG_FILE
cd $TEST_NETWORK_DIR || { echo "❌ Cannot enter $TEST_NETWORK_DIR" | tee -a $LOG_FILE; exit 1; }
./network.sh down >> $LOG_FILE 2>&1
cd - > /dev/null

echo "🧹 Cleaning wallet..." | tee -a $LOG_FILE
rm -rf $API_DIR/utils/wallet

echo "🚀 Starting Fabric network with CA..." | tee -a $LOG_FILE
cd $TEST_NETWORK_DIR || { echo "❌ Cannot enter $TEST_NETWORK_DIR" | tee -a $LOG_FILE; exit 1; }
./network.sh up createChannel -c mychannel -ca >> $LOG_FILE 2>&1
cd - > /dev/null

echo "📦 Deploying chaincode 'libchain' (version $CHAINCODE_VERSION)..." | tee -a $LOG_FILE
cd $TEST_NETWORK_DIR || { echo "❌ Cannot enter $TEST_NETWORK_DIR" | tee -a $LOG_FILE; exit 1; }
./network.sh deployCC -ccn libchain -ccp ../../../../contract -ccl go -ccv $CHAINCODE_VERSION >> $LOG_FILE 2>&1
cd - > /dev/null

echo "🔐 Enrolling admin and registering user..." | tee -a $LOG_FILE
cd $API_DIR/utils || { echo "❌ Cannot enter $API_DIR/utils" | tee -a $LOG_FILE; exit 1; }

# Check scripts exist
[[ ! -f enrollAdmin.js || ! -f registerUser.js ]] && {
  echo "❌ Missing enrollment scripts in $API_DIR/utils" | tee -a $LOG_FILE
  exit 1
}

node enrollAdmin.js >> $LOG_FILE 2>&1 || { echo "❌ Failed to enroll admin" | tee -a $LOG_FILE; exit 1; }
node registerUser.js >> $LOG_FILE 2>&1 || { echo "❌ Failed to register user" | tee -a $LOG_FILE; exit 1; }
cd - > /dev/null

echo "🧪 Verifying chaincode 'libchain' on channel 'mychannel'..." | tee -a $LOG_FILE
docker exec peer0.org1.example.com peer lifecycle chaincode querycommitted -C mychannel | tee -a $LOG_FILE
docker exec peer0.org1.example.com peer lifecycle chaincode queryinstalled | tee -a $LOG_FILE

echo "📥 Running test chaincode invoke queries..." | tee -a $LOG_FILE
cd $TEST_NETWORK_DIR

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=$PWD/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

# Invoke RegisterBatteryManufacturer
peer chaincode invoke -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile $ORDERER_CA \
  -C mychannel \
  -n libchain \
  -c '{"function":"RegisterBatteryManufacturer","Args":["EXT001","UNIV-BATT-M001","BMCO","BatteryCo","VoltPro"]}' >> ../../$LOG_FILE 2>&1

if [ $? -ne 0 ]; then
  echo "❌ RegisterBatteryManufacturer invocation failed" | tee -a ../../$LOG_FILE
  exit 1
fi

# Invoke RegisterEVManufacturer
peer chaincode invoke -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile $ORDERER_CA \
  -C mychannel \
  -n libchain \
  -c '{"function":"RegisterEVManufacturer","Args":["EXT002","UNIV-EVM-M001","EVCO","EVMaker","AutoEdge"]}' >> ../../$LOG_FILE 2>&1

if [ $? -ne 0 ]; then
  echo "❌ RegisterEVManufacturer invocation failed" | tee -a ../../$LOG_FILE
  exit 1
fi

cd - > /dev/null

echo "🚀 Starting API server..." | tee -a $LOG_FILE
cd $API_DIR
npm install >> $LOG_FILE 2>&1
nohup node index.js >> ../api-server.log 2>&1 &
echo "✅ API server running in background (log: api-server.log)" | tee -a ../$LOG_FILE
cd - > /dev/null

echo "✅ Reset complete at $(date)" | tee -a $LOG_FILE
