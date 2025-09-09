#!/bin/bash

# EV Battery API Server Startup Script
# This script starts the API server after the blockchain network is deployed

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}[INFO]${NC} Starting EV Battery API Server..."

# Check if we're in the right directory
if [ ! -d "api" ]; then
    echo -e "${RED}[ERROR]${NC} API directory not found. Please run this script from the EVBattery root directory."
    exit 1
fi

# Navigate to API directory
cd api

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}[INFO]${NC} Installing API dependencies..."
    npm install
fi

# Check if blockchain network is running
echo -e "${BLUE}[INFO]${NC} Checking if blockchain network is running..."
if ! docker ps | grep -q "fabric"; then
    echo -e "${YELLOW}[WARNING]${NC} Blockchain network doesn't seem to be running."
    echo -e "${BLUE}[INFO]${NC} Please run './deploy.sh' first to deploy the blockchain network."
    echo -e "${BLUE}[INFO]${NC} Or if the network is already running, you can proceed."
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start the API server
echo -e "${BLUE}[INFO]${NC} Starting API server on http://localhost:3000..."
echo -e "${GREEN}[SUCCESS]${NC} API server is starting..."
echo -e "${BLUE}[INFO]${NC} Press Ctrl+C to stop the server"

npm start
