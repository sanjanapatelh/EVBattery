# EV Battery System Deployment Guide

This guide explains how to deploy the complete EV Battery system using the automated deployment scripts.

## 🚀 Quick Start

### 1. Complete Deployment (Recommended for first time)
```bash
./deploy.sh
```
This will:
- Install Fabric binaries and samples
- Start the blockchain network with CA
- Deploy the EV Battery chaincode
- Test the deployment
- Start the API server

### 2. Start API Server Only (After blockchain is deployed)
```bash
./start-api.sh
```

### 3. Start Frontend Only (After API server is running)
```bash
./start-frontend.sh
```

## 📋 Prerequisites

Before running the deployment scripts, ensure you have:

- **Docker** installed and running
- **Node.js** (v14 or higher) and npm
- **Go** (v1.16 or higher)
- **Git** for cloning the repository

## 🔧 Manual Deployment Steps

If you prefer to deploy manually, follow these steps:

### Step 1: Install Fabric Binaries
```bash
cd test-network
curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh
chmod +x install-fabric.sh
./install-fabric.sh docker samples binary
```

### Step 2: Start Network
```bash
./network.sh down
./network.sh up createChannel -ca
```

### Step 3: Deploy Chaincode
```bash
./network.sh deployCC -ccn evbattery -ccp ../../contract -ccl go
```

### Step 4: Set Environment Variables
```bash
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=$PWD/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
```

### Step 5: Test Chaincode
```bash
# Test chaincode status
peer lifecycle chaincode querycommitted --channelID mychannel --name evbattery

# Test manufacturer registration
peer chaincode invoke -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile $PWD/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
  -C mychannel \
  -n evbattery \
  -c '{"function":"RegisterBatteryManufacturer","Args":["manu001","EXT001","UNI001","COMP001","Tesla Motors","Tesla"]}'

# Test query
peer chaincode query -C mychannel -n evbattery -c '{"function":"QueryBatteryManufacturer","Args":["manu001"]}'
```

### Step 6: Start API Server
```bash
cd ../../api
npm install
npm start
```

### Step 7: Start Frontend
```bash
cd ../Frontend/main-file
npm install
npm run dev
```

## 🧪 Testing the System

### Test Credentials
Use these test credentials to log into the system:

- **EV Manufacturer**: `ev_manufacturer1` / `password123`
- **Battery Manufacturer**: `battery_manufacturer1` / `password123`
- **EV Consumer**: `ev_consumer1` / `password123`
- **Recycler**: `recycler1` / `password123`

### Test API Endpoints
```bash
# Test battery types
curl http://localhost:3000/api/battery/types

# Test batteries
curl http://localhost:3000/api/battery

# Test EV types
curl http://localhost:3000/api/ev/types

# Test EVs
curl http://localhost:3000/api/ev
```

## 🗂️ Script Options

### Main Deployment Script (`deploy.sh`)
```bash
./deploy.sh [OPTION]

Options:
  deploy      Deploy the EV Battery system (default)
  clean       Clean up the network
  test        Test the deployed chaincode
  help        Show help message
```

### Examples
```bash
# Deploy the complete system
./deploy.sh

# Clean up the network
./deploy.sh clean

# Test the deployed chaincode
./deploy.sh test

# Show help
./deploy.sh help
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill processes on specific ports
lsof -ti:3000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
lsof -ti:5174 | xargs kill -9
```

#### 2. Docker Issues
```bash
# Check Docker status
docker info

# Restart Docker if needed
sudo systemctl restart docker
```

#### 3. Chaincode Deployment Failed
```bash
# Check network status
docker ps -a

# Restart network
cd test-network
./network.sh down
./network.sh up createChannel -ca
./network.sh deployCC -ccn evbattery -ccp ../../contract -ccl go
```

#### 4. API Server Won't Start
```bash
# Check if blockchain network is running
docker ps | grep fabric

# Check API dependencies
cd api
npm install
```

## 📁 File Structure

```
EVBattery/
├── deploy.sh              # Main deployment script
├── start-api.sh           # API server startup script
├── start-frontend.sh      # Frontend startup script
├── contract/              # Smart contract code
│   ├── main.go
│   ├── types.go
│   ├── battery_lifecycle.go
│   ├── ev_binding.go
│   ├── registrations.go
│   └── queries.go
├── api/                   # Backend API server
│   ├── index.js
│   ├── package.json
│   └── routes/
├── Frontend/main-file/    # React frontend
│   ├── package.json
│   └── src/
└── test-network/          # Fabric test network
```

## 🚨 Important Notes

1. **Always run scripts from the EVBattery root directory**
2. **Ensure Docker is running before deployment**
3. **The blockchain network must be running before starting the API server**
4. **The API server must be running before starting the frontend**
5. **Use Ctrl+C to stop servers gracefully**

## 🔄 Redeployment

To redeploy the system:

```bash
# Clean up existing deployment
./deploy.sh clean

# Deploy again
./deploy.sh
```

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Check Docker and network logs
4. Ensure ports are not in use by other applications

## 🎯 What Gets Deployed

- **Hyperledger Fabric Network** with CA support
- **EV Battery Smart Contract** with all functions
- **Backend API Server** with manufacturer-based data filtering
- **Frontend Dashboard** with role-based access control
- **Complete Authentication System** with user isolation

The system provides complete manufacturer isolation where each user can only see and manage their own data! 🚀
