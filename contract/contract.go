package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)


type SmartContract struct {
    contractapi.Contract
}

// Register Manufacturer
func (s *SmartContract) RegisterManufacturer(ctx contractapi.TransactionContextInterface, id string, name string, brand string) error {
    manufacturer := Manufacturer{ID: id, Name: name, Brand: brand}
    manBytes, _ := json.Marshal(manufacturer)
    return ctx.GetStub().PutState("MANU_"+id, manBytes)
}

// Manufacture Battery
func (s *SmartContract) ManufactureBattery(ctx contractapi.TransactionContextInterface, batteryID string, manufacturerID string, rawMaterialIDs []string, createdAt string) error {
    battery := Battery{
        ID: batteryID,
        ManufacturerID: manufacturerID,
        RawMaterials: rawMaterialIDs,
        Status: "Manufactured",
        CreatedAt: createdAt,
        UpdatedAt: createdAt,
    }
    batBytes, _ := json.Marshal(battery)
    return ctx.GetStub().PutState("BATT_"+batteryID, batBytes)
}

// Transfer Battery Ownership
func (s *SmartContract) TransferBattery(ctx contractapi.TransactionContextInterface, batteryID string, newOwnerID string, carID string, updatedAt string) error {
    batBytes, err := ctx.GetStub().GetState("BATT_" + batteryID)
    if err != nil || batBytes == nil {
        return fmt.Errorf("battery not found")
    }
    var battery Battery
    json.Unmarshal(batBytes, &battery)
    battery.OwnerID = newOwnerID
    battery.CarID = carID
    battery.Status = "Installed"
    battery.UpdatedAt = updatedAt
    newBatBytes, _ := json.Marshal(battery)
    return ctx.GetStub().PutState("BATT_"+batteryID, newBatBytes)
}

// Add Test Result
func (s *SmartContract) TestBattery(ctx contractapi.TransactionContextInterface, batteryID, testerID, result, date string) error {
    test := TestResult{BatteryID: batteryID, TesterID: testerID, Result: result, Date: date}
    testBytes, _ := json.Marshal(test)
    return ctx.GetStub().PutState("TEST_"+batteryID+"_"+date, testBytes)
}

// Recycle Battery
func (s *SmartContract) RecycleBattery(ctx contractapi.TransactionContextInterface, batteryID, recyclerID, updatedAt string) error {
    batBytes, err := ctx.GetStub().GetState("BATT_" + batteryID)
    if err != nil || batBytes == nil {
        return fmt.Errorf("battery not found")
    }
    var battery Battery
    json.Unmarshal(batBytes, &battery)
    battery.Status = "Recycled"
    battery.OwnerID = recyclerID
    battery.UpdatedAt = updatedAt
    newBatBytes, _ := json.Marshal(battery)
    return ctx.GetStub().PutState("BATT_"+batteryID, newBatBytes)
}

// Query Battery by ID
func (s *SmartContract) QueryBattery(ctx contractapi.TransactionContextInterface, batteryID string) (*Battery, error) {
    batBytes, err := ctx.GetStub().GetState("BATT_" + batteryID)
    if err != nil || batBytes == nil {
        return nil, fmt.Errorf("battery not found")
    }
    var battery Battery
    json.Unmarshal(batBytes, &battery)
    return &battery, nil
}

func main() {
    chaincode, err := contractapi.NewChaincode(&SmartContract{})
    if err != nil {
        panic(err.Error())
    }
    if err := chaincode.Start(); err != nil {
        panic(err.Error())
    }
}



