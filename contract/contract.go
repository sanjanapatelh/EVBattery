package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}



// ---------------------- Utility ----------------------

func generateUUID(prefix string) string {
	return fmt.Sprintf("%s_%d", prefix, time.Now().UnixNano())
}


// ---------------------- Registration ----------------------

func (s *SmartContract) RegisterBatteryManufacturer(ctx contractapi.TransactionContextInterface, externalID, universalID, companyCode, name, brand string) (string, error) {
	id := generateUUID("BMANU")
	entity := BatteryManufacturer{
		ID: id, ExternalID: externalID, UniversalID: universalID,
		CompanyCode: companyCode, Name: name, Brand: brand, Type: "Battery",
	}
	bytes, _ := json.Marshal(entity)
	return id, ctx.GetStub().PutState("BMANU_"+id, bytes)
}

func (s *SmartContract) RegisterEVManufacturer(ctx contractapi.TransactionContextInterface, externalID, universalID, companyCode, name, brand string) (string, error) {
	id := generateUUID("EVMANU")
	entity := EVManufacturer{
		ID: id, ExternalID: externalID, UniversalID: universalID,
		CompanyCode: companyCode, Name: name, Brand: brand, Type: "EV",
	}
	bytes, _ := json.Marshal(entity)
	return id, ctx.GetStub().PutState("EVMANU_"+id, bytes)
}

func (s *SmartContract) RegisterRecycler(ctx contractapi.TransactionContextInterface, externalID, universalID, companyCode, name, location string) (string, error) {
	id := generateUUID("RECY")
	entity := Recycler{
		ID: id, ExternalID: externalID, UniversalID: universalID,
		CompanyCode: companyCode, Name: name, Location: location,
	}
	bytes, _ := json.Marshal(entity)
	return id, ctx.GetStub().PutState("RECY_"+id, bytes)
}

func (s *SmartContract) RegisterCarOwner(ctx contractapi.TransactionContextInterface, externalID, universalID, companyCode, name, address string) (string, error) {
	id := generateUUID("OWNER")
	entity := CarOwner{
		ID: id, ExternalID: externalID, UniversalID: universalID,
		CompanyCode: companyCode, Name: name, Address: address,
	}
	bytes, _ := json.Marshal(entity)
	return id, ctx.GetStub().PutState("OWNER_"+id, bytes)
}

// ---------------------- Battery Lifecycle ----------------------

func (s *SmartContract) ManufactureBattery(ctx contractapi.TransactionContextInterface, externalID, manufacturerID string, rawMaterials []string, proportion, createdAt string) (string, error) {
	id := generateUUID("BATT")
	battery := Battery{
		ID: id, ExternalID: externalID, ManufacturerID: manufacturerID,
		RawMaterials: rawMaterials, 
		Status: "Manufactured", CreatedAt: createdAt, UpdatedAt: createdAt,
	}
	bytes, _ := json.Marshal(battery)
	return id, ctx.GetStub().PutState("BATT_"+id, bytes)
}

func (s *SmartContract) TestBattery(ctx contractapi.TransactionContextInterface, batteryID, testerID, result, date string) error {
	test := TestResult{BatteryID: batteryID, TesterID: testerID, Result: result, Date: date}
	testBytes, _ := json.Marshal(test)
	return ctx.GetStub().PutState("TEST_"+batteryID+"_"+date, testBytes)
}

func (s *SmartContract) RecycleBattery(ctx contractapi.TransactionContextInterface, batteryID, recyclerID, updatedAt string) error {
	batBytes, err := ctx.GetStub().GetState("BATT_" + batteryID)
	if err != nil || batBytes == nil {
		return fmt.Errorf("battery not found")
	}
	var battery Battery
	json.Unmarshal(batBytes, &battery)
	battery.Status = "Recycled"
	battery.UpdatedAt = updatedAt
	newBatBytes, _ := json.Marshal(battery)
	return ctx.GetStub().PutState("BATT_"+batteryID, newBatBytes)
}


// ---------------------- Car Binding & Transfer ----------------------

func (s *SmartContract) BindBatteryToCar(ctx contractapi.TransactionContextInterface, batteryID, carExternalID, make, model, year, autoManufacturerID, createdAt string) (string, error) {
	batBytes, err := ctx.GetStub().GetState("BATT_" + batteryID)
	if err != nil || batBytes == nil {
		return "", fmt.Errorf("battery not found")
	}
	carID := generateUUID("CAR")
	car := Car{
		ID: carID, ExternalID: carExternalID,
		Model: model, Year: year,
		ManufacturerID: autoManufacturerID,
		BatteryID: batteryID, OwnerID: "",
		CreatedAt: createdAt, UpdatedAt: createdAt,
	}
	carBytes, _ := json.Marshal(car)
	if err := ctx.GetStub().PutState("CAR_"+carID, carBytes); err != nil {
		return "", err
	}

	var battery Battery
	json.Unmarshal(batBytes, &battery)
	battery.Status = "Installed"
	battery.UpdatedAt = createdAt
	newBatBytes, _ := json.Marshal(battery)
	ctx.GetStub().PutState("BATT_"+batteryID, newBatBytes)

	return carID, nil
}

func (s *SmartContract) TransferCarToOwner(ctx contractapi.TransactionContextInterface, carID, newOwnerID, updatedAt string) error {
	carBytes, err := ctx.GetStub().GetState("CAR_" + carID)
	if err != nil || carBytes == nil {
		return fmt.Errorf("car not found")
	}
	var car Car
	json.Unmarshal(carBytes, &car)
	car.OwnerID = newOwnerID
	car.UpdatedAt = updatedAt
	newCarBytes, _ := json.Marshal(car)
	return ctx.GetStub().PutState("CAR_"+carID, newCarBytes)
}


// query functions 


func (s *SmartContract) QueryBattery(ctx contractapi.TransactionContextInterface, batteryID string) (*Battery, error) {
	batBytes, err := ctx.GetStub().GetState("BATT_" + batteryID)
	if err != nil || batBytes == nil {
		return nil, fmt.Errorf("battery not found")
	}
	var battery Battery
	json.Unmarshal(batBytes, &battery)
	return &battery, nil
}

func (s *SmartContract) QueryCar(ctx contractapi.TransactionContextInterface, carID string) (*Car, error) {
	carBytes, err := ctx.GetStub().GetState("CAR_" + carID)
	if err != nil || carBytes == nil {
		return nil, fmt.Errorf("car not found")
	}
	var car Car
	json.Unmarshal(carBytes, &car)
	return &car, nil
}

func (s *SmartContract) QueryBatteryManufacturer(ctx contractapi.TransactionContextInterface, id string) (*BatteryManufacturer, error) {
	data, err := ctx.GetStub().GetState("BMANU_" + id)
	if err != nil || data == nil {
		return nil, fmt.Errorf("battery manufacturer not found")
	}
	var entity BatteryManufacturer
	json.Unmarshal(data, &entity)
	return &entity, nil
}

func (s *SmartContract) QueryEVManufacturer(ctx contractapi.TransactionContextInterface, id string) (*EVManufacturer, error) {
	data, err := ctx.GetStub().GetState("AMANU_" + id)
	if err != nil || data == nil {
		return nil, fmt.Errorf("EV manufacturer not found")
	}
	var entity EVManufacturer
	json.Unmarshal(data, &entity)
	return &entity, nil
}

func (s *SmartContract) QueryRecycler(ctx contractapi.TransactionContextInterface, id string) (*Recycler, error) {
	data, err := ctx.GetStub().GetState("RECY_" + id)
	if err != nil || data == nil {
		return nil, fmt.Errorf("recycler not found")
	}
	var entity Recycler
	json.Unmarshal(data, &entity)
	return &entity, nil
}

func (s *SmartContract) QueryCarOwner(ctx contractapi.TransactionContextInterface, id string) (*CarOwner, error) {
	data, err := ctx.GetStub().GetState("OWNER_" + id)
	if err != nil || data == nil {
		return nil, fmt.Errorf("car owner not found")
	}
	var entity CarOwner
	json.Unmarshal(data, &entity)
	return &entity, nil
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
