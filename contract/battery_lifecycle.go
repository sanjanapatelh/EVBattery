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

	typeObj := BatteryType{
		ID:             id,
		UniversalID:    universalID,
		Code:           code,
		Description:    description,
		Chemistry:      chemistry,
		Capacity:       capacity,
		Voltage:        voltage,
		ManufacturerID: manufacturerID,
		DocType:        "BatteryType", // Add docType for querying
	}

	// Store the battery type
	data, _ := json.Marshal(typeObj)
	if err := ctx.GetStub().PutState("BTYPE_"+id, data); err != nil {
		return "", err
	}

	// Update the manufacturer's battery types mapping
	if err := s.addBatteryTypeToManufacturer(ctx, manufacturerID, id); err != nil {
		return "", err
	}

	return id, nil
}

// addBatteryTypeToManufacturer adds a battery type ID to the manufacturer's list
func (s *SmartContract) addBatteryTypeToManufacturer(ctx contractapi.TransactionContextInterface, manufacturerID, batteryTypeID string) error {
	mappingKey := "MANU_" + manufacturerID + "_TYPES"

	// Get existing mapping or create new one
	var typeIDs []string
	existingData, err := ctx.GetStub().GetState(mappingKey)
	if err == nil && existingData != nil {
		json.Unmarshal(existingData, &typeIDs)
	}

	// Add new battery type ID if not already present
	found := false
	for _, existingID := range typeIDs {
		if existingID == batteryTypeID {
			found = true
			break
		}
	}

	if !found {
		typeIDs = append(typeIDs, batteryTypeID)
	}

	// Store updated mapping
	mappingData, _ := json.Marshal(typeIDs)
	return ctx.GetStub().PutState(mappingKey, mappingData)
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
	asset := Battery{
		ID:             id,
		ExternalID:     externalID,
		UniversalID:    universalID,
		TypeID:         batteryTypeID,
		ManufacturerID: manufacturerID,
		Status:         "Manufactured",
		CreatedAt:      createdAt,
		UpdatedAt:      createdAt,
		DocType:        "Battery", // Add docType for querying
	}
	bytes, _ := json.Marshal(asset)
	if err := ctx.GetStub().PutState("BATT_"+id, bytes); err != nil {
		return "", err
	}

	// Update the manufacturer's batteries mapping
	if err := s.addBatteryToManufacturer(ctx, manufacturerID, id); err != nil {
		return "", err
	}

	updateSerial(ctx, serialKey, serial)
	return id, nil
}

// addBatteryToManufacturer adds a battery ID to the manufacturer's list
func (s *SmartContract) addBatteryToManufacturer(ctx contractapi.TransactionContextInterface, manufacturerID, batteryID string) error {
	mappingKey := "MANU_" + manufacturerID + "_BATTERIES"

	// Get existing mapping or create new one
	var batteryIDs []string
	existingData, err := ctx.GetStub().GetState(mappingKey)
	if err == nil && existingData != nil {
		json.Unmarshal(existingData, &batteryIDs)
	}

	// Add new battery ID if not already present
	found := false
	for _, existingID := range batteryIDs {
		if existingID == batteryID {
			found = true
			break
		}
	}

	if !found {
		batteryIDs = append(batteryIDs, batteryID)
	}

	// Store updated mapping
	mappingData, _ := json.Marshal(batteryIDs)
	return ctx.GetStub().PutState(mappingKey, mappingData)
}

func (s *SmartContract) TestBattery(ctx contractapi.TransactionContextInterface, batteryID, testerID, result, date string) error {
	test := TestResult{
		BatteryID: batteryID,
		TesterID:  testerID,
		Result:    result,
		Date:      date,
		DocType:   "TestResult", // Add docType for querying
	}
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
