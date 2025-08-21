#!/bin/bash

TEST_NETWORK_DIR="./fabric-samples/test-network"

echo "🔁 Navigating to test network..."
cd $TEST_NETWORK_DIR || { echo "❌ Could not find $TEST_NETWORK_DIR"; exit 1; }

echo "🔍 Querying committed chaincodes on 'mychannel'..."
peer lifecycle chaincode querycommitted -C mychannel

echo ""
echo "📦 Listing installed chaincodes..."
peer lifecycle chaincode queryinstalled

echo ""
echo "🐳 Docker containers related to Fabric:"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" | grep fabric

echo ""
echo "✅ Config check complete. If peers, orderer, CA, and 'libchain' show up — everything is healthy."

cd - > /dev/null
