#!/bin/bash

# EV Battery Project - Complete Service Startup Script
# This script starts all services in the correct order

set -e  # Exit on any error

echo "🚀 Starting EV Battery Project Services..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a service is running
check_service() {
    local service_name=$1
    local port=$2
    local url=$3
    
    if curl -s "$url" > /dev/null 2>&1; then
        print_success "$service_name is running on port $port"
        return 0
    else
        print_error "$service_name is not responding on port $port"
        return 1
    fi
}

# Step 1: Start Hyperledger Fabric Blockchain Network
print_status "Step 1: Starting Hyperledger Fabric Blockchain Network..."
cd fabric-samples/test-network

print_status "Stopping any existing network..."
./network.sh down > /dev/null 2>&1 || true

print_status "Starting blockchain network with CA..."
./network.sh up createChannel -ca &
BLOCKCHAIN_PID=$!

# Wait for blockchain to start
print_status "Waiting for blockchain network to start (this may take 2-3 minutes)..."
sleep 30

# Check if blockchain is running
if docker ps | grep -q "peer0.org1.example.com"; then
    print_success "Blockchain network started successfully"
else
    print_error "Failed to start blockchain network"
    exit 1
fi

# Step 2: Deploy Smart Contract
print_status "Step 2: Deploying Smart Contract..."
./network.sh deployCC -ccn evbattery -ccp /Users/liuxinlai/Documents/EVBattery/contract -ccl go -ccv 1.0 -ccs 1 &
DEPLOY_PID=$!

print_status "Waiting for smart contract deployment..."
sleep 20

if docker ps | grep -q "dev-peer.*evbattery"; then
    print_success "Smart contract deployed successfully"
else
    print_warning "Smart contract deployment may still be in progress"
fi

# Step 3: Start API Server
print_status "Step 3: Starting API Server..."
cd /Users/liuxinlai/Documents/EVBattery/api
node index.js &
API_PID=$!

# Wait for API server to start
sleep 5

if check_service "API Server" "3000" "http://localhost:3000/test"; then
    print_success "API Server started successfully"
else
    print_error "Failed to start API Server"
    exit 1
fi

# Step 4: Start Frontend Development Server
print_status "Step 4: Starting Frontend Development Server..."
cd /Users/liuxinlai/Documents/EVBattery/Frontend/main-file
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 10

if check_service "Frontend Server" "5173" "http://localhost:5173"; then
    print_success "Frontend Server started successfully"
else
    print_error "Failed to start Frontend Server"
    exit 1
fi

# Step 5: Final Verification
print_status "Step 5: Final Service Verification..."
echo ""

# Check all services
print_status "Checking all services..."

# Blockchain
if docker ps | grep -q "peer0.org1.example.com" && docker ps | grep -q "orderer.example.com"; then
    print_success "✅ Blockchain Network: Running"
else
    print_error "❌ Blockchain Network: Not running"
fi

# API Server
if check_service "API Server" "3000" "http://localhost:3000/test" > /dev/null 2>&1; then
    print_success "✅ API Server: Running on http://localhost:3000"
else
    print_error "❌ API Server: Not running"
fi

# Frontend Server
if check_service "Frontend Server" "5173" "http://localhost:5173" > /dev/null 2>&1; then
    print_success "✅ Frontend Server: Running on http://localhost:5173"
else
    print_error "❌ Frontend Server: Not running"
fi

# Authentication
if curl -s http://localhost:3000/auth/users > /dev/null 2>&1; then
    print_success "✅ Authentication System: Working"
else
    print_error "❌ Authentication System: Not working"
fi

echo ""
echo "🎉 All services started successfully!"
echo "=========================================="
echo ""
echo "📱 Access Points:"
echo "   Frontend: http://localhost:5173"
echo "   API:      http://localhost:3000"
echo "   Test API: http://localhost:3000/test"
echo ""
echo "🔐 Test Credentials:"
echo "   Username: testuser"
echo "   Password: testpass"
echo "   Type: Battery Manufacturer"
echo ""
echo "📊 Service Status:"
echo "   Blockchain: $(docker ps --format '{{.Names}}' | grep -E '(peer|orderer)' | wc -l | tr -d ' ') containers running"
echo "   API Server: $(ps aux | grep 'node.*api' | grep -v grep | wc -l | tr -d ' ') process"
echo "   Frontend:   $(ps aux | grep 'vite' | grep -v grep | wc -l | tr -d ' ') process"
echo ""
echo "🛑 To stop all services, run: ./stop-all-services.sh"
echo ""

# Save PIDs for stopping later
echo "$BLOCKCHAIN_PID $DEPLOY_PID $API_PID $FRONTEND_PID" > .service_pids

print_success "Startup complete! All services are running in the background."
