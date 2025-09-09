#!/bin/bash

# EV Battery Chaincode Deployment Script
# This script automates the complete deployment process for the EV Battery system

set -e  # Exit on any error

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

# Function to check if command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 is not installed. Please install it first."
        exit 1
    fi
}

# Function to check if Docker is running
check_docker() {
    if ! docker info &> /dev/null; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Function to wait for network to be ready
wait_for_network() {
    print_status "Waiting for network to be ready..."
    sleep 10
}

# Main deployment function
deploy_ev_battery() {
    print_status "Starting EV Battery deployment process..."
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    check_command "docker"
    check_command "curl"
    check_docker
    
    # Navigate to test-network directory
    if [ ! -d "test-network" ]; then
        print_error "test-network directory not found. Please run this script from the EVBattery root directory."
        exit 1
    fi
    
    cd test-network
    
    # Step 1: Install Fabric binaries and samples
    print_status "Step 1: Installing Fabric binaries and samples..."
    if [ ! -f "install-fabric.sh" ]; then
        print_status "Downloading Fabric installation script..."
        curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh
        chmod +x install-fabric.sh
    fi
    
    if [ ! -d "bin" ] || [ ! -d "samples" ]; then
        print_status "Installing Fabric binaries and samples..."
        ./install-fabric.sh docker samples binary
    else
        print_warning "Fabric binaries and samples already exist, skipping installation..."
    fi
    
    # Step 2: Bring down existing network
    print_status "Step 2: Bringing down existing network..."
    ./network.sh down
    
    # Step 3: Start network with CA
    print_status "Step 3: Starting network with CA..."
    ./network.sh up createChannel -ca
    
    # Wait for network to be ready
    wait_for_network
    
    # Step 4: Check network status
    print_status "Step 4: Checking network status..."
    docker ps -a
    
    # Step 5: Deploy chaincode
    print_status "Step 5: Deploying EV Battery chaincode..."
    ./network.sh deployCC -ccn evbattery -ccp ../../contract -ccl go
    
    # Wait for deployment
    print_status "Waiting for chaincode deployment to complete..."
    sleep 15
    
    # Step 6: Verify chaincode deployment
    print_status "Step 6: Verifying chaincode deployment..."
    docker images | grep fabric-ccenv
    
    # Step 7: Set environment variables
    print_status "Step 7: Setting environment variables..."
    export PATH=${PWD}/../bin:$PATH
    export FABRIC_CFG_PATH=$PWD/../config/
    
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=$PWD/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
    
    # Step 8: Test chaincode deployment
    print_status "Step 8: Testing chaincode deployment..."
    
    # Test query
    print_status "Testing chaincode query..."
    peer lifecycle chaincode querycommitted --channelID mychannel --name evbattery
    
    # Test basic function call
    print_status "Testing basic function call..."
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls \
        --cafile $PWD/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
        -C mychannel \
        -n evbattery \
        -c '{"function":"RegisterBatteryManufacturer","Args":["manu001","EXT001","UNI001","COMP001","Tesla Motors","Tesla"]}'
    
    # Wait for transaction to be processed
    sleep 5
    
    # Test query
    print_status "Testing query function..."
    peer chaincode query -C mychannel -n evbattery -c '{"function":"QueryBatteryManufacturer","Args":["manu001"]}'
    
    print_success "Chaincode deployment and testing completed successfully!"
    
    # Step 9: Setup API server
    print_status "Step 9: Setting up API server..."
    cd ..
    
    if [ -d "api" ]; then
        cd api
        
        # Install dependencies if not already installed
        if [ ! -d "node_modules" ]; then
            print_status "Installing API dependencies..."
            npm install
        fi
        
        print_status "Starting API server..."
        print_success "API server will start on http://localhost:3000"
        print_status "Press Ctrl+C to stop the server when done testing"
        
        # Start the API server
        npm start
        
    else
        print_warning "API directory not found. Please set up the API server manually."
    fi
}

# Function to clean up
cleanup() {
    print_status "Cleaning up..."
    cd test-network
    ./network.sh down
    print_success "Cleanup completed!"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  deploy      Deploy the EV Battery system (default)"
    echo "  clean       Clean up the network"
    echo "  test        Test the deployed chaincode"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0           # Deploy the system"
    echo "  $0 deploy    # Deploy the system"
    echo "  $0 clean     # Clean up the network"
    echo "  $0 test      # Test the deployed chaincode"
}

# Function to test chaincode
test_chaincode() {
    print_status "Testing deployed chaincode..."
    
    if [ ! -d "test-network" ]; then
        print_error "test-network directory not found. Please run this script from the EVBattery root directory."
        exit 1
    fi
    
    cd test-network
    
    # Set environment variables
    export PATH=${PWD}/../bin:$PATH
    export FABRIC_CFG_PATH=$PWD/../config/
    
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=$PWD/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
    
    # Test chaincode status
    print_status "Testing chaincode status..."
    peer lifecycle chaincode querycommitted --channelID mychannel --name evbattery
    
    # Test manufacturer registration
    print_status "Testing manufacturer registration..."
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls \
        --cafile $PWD/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
        -C mychannel \
        -n evbattery \
        -c '{"function":"RegisterBatteryManufacturer","Args":["manu002","EXT002","UNI002","COMP002","Panasonic Energy","Panasonic"]}'
    
    sleep 5
    
    # Test query
    print_status "Testing query function..."
    peer chaincode query -C mychannel -n evbattery -c '{"function":"QueryBatteryManufacturer","Args":["manu002"]}'
    
    print_success "Chaincode testing completed successfully!"
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        deploy_ev_battery
        ;;
    "clean")
        cleanup
        ;;
    "test")
        test_chaincode
        ;;
    "help"|"-h"|"--help")
        show_usage
        ;;
    *)
        print_error "Unknown option: $1"
        show_usage
        exit 1
        ;;
esac
