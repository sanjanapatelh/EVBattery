#!/bin/bash

# EV Battery Frontend Startup Script
# This script starts the frontend development server

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}[INFO]${NC} Starting EV Battery Frontend..."

# Check if we're in the right directory
if [ ! -d "Frontend/main-file" ]; then
    echo -e "${RED}[ERROR]${NC} Frontend directory not found. Please run this script from the EVBattery root directory."
    exit 1
fi

# Navigate to frontend directory
cd Frontend/main-file

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}[INFO]${NC} Installing frontend dependencies..."
    npm install
fi

# Check if API server is running
echo -e "${BLUE}[INFO]${NC} Checking if API server is running..."
if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${YELLOW}[WARNING]${NC} API server doesn't seem to be running on http://localhost:3000"
    echo -e "${BLUE}[INFO]${NC} Please start the API server first using './start-api.sh'"
    echo -e "${BLUE}[INFO]${NC} Or if the API server is running on a different port, you can proceed."
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start the frontend development server
echo -e "${BLUE}[INFO]${NC} Starting frontend development server..."
echo -e "${GREEN}[SUCCESS]${NC} Frontend server is starting..."
echo -e "${BLUE}[INFO]${NC} The server will be available at http://localhost:5173 or http://localhost:5174"
echo -e "${BLUE}[INFO]${NC} Press Ctrl+C to stop the server"

npm run dev
