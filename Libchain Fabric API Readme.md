# EV Battery Chaincode with REST API and Postman

This guide documents the complete steps to deploy your Hyperledger Fabric chaincode, set up a REST API using Node.js, and interact with it via Postman.

---

## Prerequisites

- Docker & Docker Compose
- Go and Node.js installed
- `fabric-samples` repository cloned
- Chaincode in Go (e.g., `contract.go`)

---

## 1. Start Fabric Network with CA

```bash
cd fabric-samples/test-network
./network.sh down
./network.sh up createChannel -ca
```

---

## 2. Deploy Chaincode

```bash
./network.sh deployCC -ccn libchain -ccp ../your-chaincode-folder -ccl go
```

- `-ccn`: Chaincode name (e.g., `libchain`)
- `-ccp`: Path to folder containing `contract.go`

---

## 3. Enroll Identities

From your API project folder:

```bash
node enrollAdmin.js
node registerUser.js
```

> This will create wallet identities: `admin.id` and `appUser.id`

---

## 4. Start the API Server

```bash
node index.js
```

> API runs at `http://localhost:3000`

---

## 5. Use Postman to Interact with Chaincode

### Endpoint

```
POST http://localhost:3000/api/invoke
```

**Headers:**

```
Content-Type: application/json
```

### 📦 Sample Calls

#### Register Manufacturer

```json
{
  "fcn": "RegisterManufacturer",
  "args": ["manu001", "Panasonic", "LithiumMax"]
}
```

#### Manufacture Battery

```json
{
  "fcn": "ManufactureBattery",
  "args": ["BAT123", "manu001", ["RM001", "RM002"], "2025-06-30"]
}
```

#### Transfer Battery

```json
{
  "fcn": "TransferBattery",
  "args": ["BAT123", "user001", "CAR123", "2025-06-30"]
}
```

#### Recycle Battery

```json
{
  "fcn": "RecycleBattery",
  "args": ["BAT123", "recycler01", "2025-06-30"]
}
```

#### Test Battery

```json
{
  "fcn": "TestBattery",
  "args": ["BAT123", "tester01", "Passed", "2025-06-30"]
}
```

#### Query Battery

```json
{
  "fcn": "QueryBattery",
  "args": ["BAT123"]
}
```

---

## 6. Debug & Utilities

### Check Deployed Chaincode

```bash
peer lifecycle chaincode querycommitted --channelID mychannel --name libchain
```

### Check Running Containers

```bash
docker ps
```

### Restart Cleanly

```bash
./network.sh down
./network.sh up createChannel -ca
./network.sh deployCC -ccn libchain -ccp ../your-chaincode-folder -ccl go
```

Then re-run:

```bash
node enrollAdmin.js
node registerUser.js
node index.js
```

---

## 7. Project Structure

```
api/
├── enrollAdmin.js
├── registerUser.js
├── index.js
├── wallet/
│   ├── admin.id
│   └── appUser.id
└── connection-org1.json
```

---

## ✅ You're Ready!

Use Postman or integrate further into your app. Let me know if you need this in PDF or Dockerized format.

