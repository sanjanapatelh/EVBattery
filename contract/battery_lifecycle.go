package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func (s *SmartContract) RegisterBatteryType(ctx contractapi.TransactionContextInterface, universalID, code, description, chemistry string, capacity, voltage float64, manufacturerID string) (string, error) {
	id, err := generateUniqueID(ctx, "BTYPE")
	if err != nil {
		return "", err
	}

	typeObj := BatteryType{ID: id, UniversalID: universalID, Code: code, Description: description, Chemistry: chemistry, Capacity: capacity, Voltage: voltage, ManufacturerID: manufacturerID}
	data, _ := json.Marshal(typeObj)
	return id, ctx.GetStub().PutState("BTYPE_"+id, data)
}

func (s *SmartContract) ManufactureBattery(ctx contractapi.TransactionContextInterface, externalID, universalID, batteryTypeID, manufacturerID, createdAt string) (string, error) {
	typeBytes, err := ctx.GetStub().GetState("BTYPE_" + batteryTypeID)
	if err != nil || typeBytes == nil {
		return "", fmt.Errorf("battery type not found")
	}
	var batteryType BatteryType
	json.Unmarshal(typeBytes, &batteryType)
	serialKey := "battery_" + batteryTypeID
	serial, _ := getNextSerial(ctx, serialKey)
	id := generateStructuredID("B", batteryType.Code, serial)
	asset := Battery{ID: id, ExternalID: externalID, UniversalID: universalID, TypeID: batteryTypeID, ManufacturerID: manufacturerID, Status: "Manufactured", CreatedAt: createdAt, UpdatedAt: createdAt}
	bytes, _ := json.Marshal(asset)
	updateSerial(ctx, serialKey, serial)
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
	newBytes, _ := json.Marshal(battery)
	return ctx.GetStub().PutState("BATT_"+batteryID, newBytes)
}
