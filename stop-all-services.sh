#!/bin/bash

# EV Battery Project - Service Shutdown Script
# This script stops all running services

echo "🛑 Stopping EV Battery Project Services..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Step 1: Stop Frontend Server
print_status "Stopping Frontend Development Server..."
pkill -f "vite" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true
print_success "Frontend server stopped"

# Step 2: Stop API Server
print_status "Stopping API Server..."
pkill -f "node.*api" 2>/dev/null || true
pkill -f "node index.js" 2>/dev/null || true
print_success "API server stopped"

# Step 3: Stop Blockchain Network
print_status "Stopping Hyperledger Fabric Blockchain Network..."
cd fabric-samples/test-network
./network.sh down 2>/dev/null || true
print_success "Blockchain network stopped"

# Step 4: Clean up any remaining processes
print_status "Cleaning up remaining processes..."
pkill -f "fabric" 2>/dev/null || true
pkill -f "peer" 2>/dev/null || true
pkill -f "orderer" 2>/dev/null || true

# Step 5: Remove PID file if it exists
if [ -f ".service_pids" ]; then
    rm .service_pids
    print_success "Cleaned up service tracking file"
fi

print_success "All services stopped successfully!"
echo ""
echo "📊 Final Status:"
echo "   Frontend:   $(ps aux | grep 'vite' | grep -v grep | wc -l | tr -d ' ') processes"
echo "   API Server: $(ps aux | grep 'node.*api' | grep -v grep | wc -l | tr -d ' ') processes"
echo "   Blockchain: $(docker ps | grep -E '(peer|orderer)' | wc -l | tr -d ' ') containers"
echo ""
echo "✅ Shutdown complete!"
