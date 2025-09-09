package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func (s *SmartContract) RegisterEVType(ctx contractapi.TransactionContextInterface, universalID, code, description, model, year, manufacturerID string) (string, error) {
	id, err := generateUniqueID(ctx, "EVTYPE")
	if err != nil {
		return "", err
	}

	typeObj := EVType{
		ID:             id,
		UniversalID:    universalID,
		Code:           code,
		Description:    description,
		Model:          model,
		Year:           year,
		ManufacturerID: manufacturerID,
		DocType:        "EVType", // Add docType for querying
	}
	data, _ := json.Marshal(typeObj)
	return id, ctx.GetStub().PutState("EVTYPE_"+id, data)
}

func (s *SmartContract) BindBatteryToEV(ctx contractapi.TransactionContextInterface, batteryID, evExternalID, evUniversalID, evTypeID, evManufacturerID, createdAt string) (string, error) {
	typeBytes, err := ctx.GetStub().GetState("EVTYPE_" + evTypeID)
	if err != nil || typeBytes == nil {
		return "", fmt.Errorf("EV type not found")
	}
	var evType EVType
	json.Unmarshal(typeBytes, &evType)
	serialKey := "ev_" + evTypeID
	serial, _ := getNextSerial(ctx, serialKey)
	id := generateStructuredID("EV", evType.Code, serial)
	ev := EV{
		ID:             id,
		ExternalID:     evExternalID,
		UniversalID:    evUniversalID,
		TypeID:         evTypeID,
		ManufacturerID: evManufacturerID,
		BatteryID:      batteryID,
		OwnerID:        "",
		CreatedAt:      createdAt,
		UpdatedAt:      createdAt,
		DocType:        "EV", // Add docType for querying
	}
	bytes, _ := json.Marshal(ev)
	updateSerial(ctx, serialKey, serial)
	if err := ctx.GetStub().PutState("EV_"+id, bytes); err != nil {
		return "", err
	}
	batBytes, _ := ctx.GetStub().GetState("BATT_" + batteryID)
	var battery Battery
	json.Unmarshal(batBytes, &battery)
	battery.Status = "Installed"
	battery.UpdatedAt = createdAt
	newBatBytes, _ := json.Marshal(battery)
	ctx.GetStub().PutState("BATT_"+batteryID, newBatBytes)
	return id, nil
}

func (s *SmartContract) CreateEV(ctx contractapi.TransactionContextInterface, batteryID, evExternalID, evUniversalID, evManufacturerID, createdAt string) (string, error) {
	// Create EV without requiring an EV type
	serialKey := "ev_simple"
	serial, _ := getNextSerial(ctx, serialKey)
	id := generateStructuredID("EV", "SIMPLE", serial)

	ev := EV{
		ID:             id,
		ExternalID:     evExternalID,
		UniversalID:    evUniversalID,
		TypeID:         "", // No type required for simple EV
		ManufacturerID: evManufacturerID,
		BatteryID:      batteryID,
		OwnerID:        "",
		Status:         "Created", // Set initial status
		CreatedAt:      createdAt,
		UpdatedAt:      createdAt,
		DocType:        "EV",
	}

	bytes, _ := json.Marshal(ev)
	updateSerial(ctx, serialKey, serial)

	if err := ctx.GetStub().PutState("EV_"+id, bytes); err != nil {
		return "", err
	}

	// Add EV to manufacturer mapping
	if err := s.addEVToManufacturer(ctx, evManufacturerID, id); err != nil {
		return "", err
	}

	// Update battery status to "Installed"
	batBytes, _ := ctx.GetStub().GetState("BATT_" + batteryID)
	var battery Battery
	json.Unmarshal(batBytes, &battery)
	battery.Status = "Installed"
	battery.UpdatedAt = createdAt
	newBatBytes, _ := json.Marshal(battery)
	ctx.GetStub().PutState("BATT_"+batteryID, newBatBytes)

	return id, nil
}

// addEVToManufacturer adds an EV ID to the manufacturer's EV mapping
func (s *SmartContract) addEVToManufacturer(ctx contractapi.TransactionContextInterface, manufacturerID, evID string) error {
	mappingKey := "MANU_" + manufacturerID + "_EVS"
	var evIDs []string

	// Get existing mapping
	existingData, err := ctx.GetStub().GetState(mappingKey)
	if err == nil && existingData != nil {
		json.Unmarshal(existingData, &evIDs)
	}

	// Add new EV ID if not present
	found := false
	for _, id := range evIDs {
		if id == evID {
			found = true
			break
		}
	}

	if !found {
		evIDs = append(evIDs, evID)
	}

	// Store updated mapping
	mappingData, _ := json.Marshal(evIDs)
	return ctx.GetStub().PutState(mappingKey, mappingData)
}

func (s *SmartContract) TransferEVToOwner(ctx contractapi.TransactionContextInterface, evID, newOwnerID, updatedAt string) error {
	// Get the EV
	evBytes, err := ctx.GetStub().GetState("EV_" + evID)
	if err != nil || evBytes == nil {
		return fmt.Errorf("EV not found")
	}

	var ev EV
	if err := json.Unmarshal(evBytes, &ev); err != nil {
		return fmt.Errorf("failed to unmarshal EV data")
	}

	// Check if EV is already owned
	if ev.OwnerID != "" {
		return fmt.Errorf("EV is already owned by %s", ev.OwnerID)
	}

	// Check if the new owner exists
	ownerBytes, err := ctx.GetStub().GetState("OWNER_" + newOwnerID)
	if err != nil || ownerBytes == nil {
		return fmt.Errorf("consumer/owner %s does not exist", newOwnerID)
	}

	// Update EV ownership and status
	ev.OwnerID = newOwnerID
	ev.UpdatedAt = updatedAt
	ev.Status = "Sold" // Add status field to track EV state

	// Store updated EV
	newBytes, _ := json.Marshal(ev)
	if err := ctx.GetStub().PutState("EV_"+evID, newBytes); err != nil {
		return fmt.Errorf("failed to update EV: %v", err)
	}

	// Remove EV from manufacturer's mapping
	if err := s.removeEVFromManufacturer(ctx, ev.ManufacturerID, evID); err != nil {
		return fmt.Errorf("failed to remove EV from manufacturer mapping: %v", err)
	}

	// Add EV to new owner's mapping
	if err := s.addEVToOwner(ctx, newOwnerID, evID); err != nil {
		return fmt.Errorf("failed to add EV to owner mapping: %v", err)
	}

	return nil
}

// removeEVFromManufacturer removes an EV ID from the manufacturer's EV mapping
func (s *SmartContract) removeEVFromManufacturer(ctx contractapi.TransactionContextInterface, manufacturerID, evID string) error {
	mappingKey := "MANU_" + manufacturerID + "_EVS"
	var evIDs []string

	// Get existing mapping
	existingData, err := ctx.GetStub().GetState(mappingKey)
	if err == nil && existingData != nil {
		json.Unmarshal(existingData, &evIDs)
	}

	// Remove the EV ID
	var newEVIDs []string
	for _, id := range evIDs {
		if id != evID {
			newEVIDs = append(newEVIDs, id)
		}
	}

	// Store updated mapping
	mappingData, _ := json.Marshal(newEVIDs)
	return ctx.GetStub().PutState(mappingKey, mappingData)
}

// addEVToOwner adds an EV ID to the owner's EV mapping
func (s *SmartContract) addEVToOwner(ctx contractapi.TransactionContextInterface, ownerID, evID string) error {
	mappingKey := "OWNER_" + ownerID + "_EVS"
	var evIDs []string

	// Get existing mapping
	existingData, err := ctx.GetStub().GetState(mappingKey)
	if err == nil && existingData != nil {
		json.Unmarshal(existingData, &evIDs)
	}

	// Add new EV ID if not present
	found := false
	for _, id := range evIDs {
		if id == evID {
			found = true
			break
		}
	}

	if !found {
		evIDs = append(evIDs, evID)
	}

	// Store updated mapping
	mappingData, _ := json.Marshal(evIDs)
	return ctx.GetStub().PutState(mappingKey, mappingData)
}
