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

	typeObj := EVType{ID: id, UniversalID: universalID, Code: code, Description: description, Model: model, Year: year, ManufacturerID: manufacturerID}
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
		ID: id, ExternalID: evExternalID, UniversalID: evUniversalID,
		TypeID: evTypeID, ManufacturerID: evManufacturerID, BatteryID: batteryID,
		OwnerID: "", CreatedAt: createdAt, UpdatedAt: createdAt,
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

func (s *SmartContract) TransferEVToOwner(ctx contractapi.TransactionContextInterface, evID, newOwnerID, updatedAt string) error {
	evBytes, err := ctx.GetStub().GetState("EV_" + evID)
	if err != nil || evBytes == nil {
		return fmt.Errorf("EV not found")
	}
	var ev EV
	json.Unmarshal(evBytes, &ev)
	ev.OwnerID = newOwnerID
	ev.UpdatedAt = updatedAt
	newBytes, _ := json.Marshal(ev)
	return ctx.GetStub().PutState("EV_"+evID, newBytes)
}
