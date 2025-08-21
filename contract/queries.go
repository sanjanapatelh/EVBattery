package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func (s *SmartContract) QueryBattery(ctx contractapi.TransactionContextInterface, id string) (*Battery, error) {
	data, err := ctx.GetStub().GetState("BATT_" + id)
	if err != nil || data == nil {
		return nil, fmt.Errorf("battery not found")
	}
	var battery Battery
	json.Unmarshal(data, &battery)
	return &battery, nil
}

func (s *SmartContract) QueryEV(ctx contractapi.TransactionContextInterface, id string) (*EV, error) {
	data, err := ctx.GetStub().GetState("EV_" + id)
	if err != nil || data == nil {
		return nil, fmt.Errorf("EV not found")
	}
	var ev EV
	json.Unmarshal(data, &ev)
	return &ev, nil
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
	data, err := ctx.GetStub().GetState("EVMANU_" + id)
	if err != nil || data == nil {
		return nil, fmt.Errorf("EV manufacturer not found")
	}
	var entity EVManufacturer
	json.Unmarshal(data, &entity)
	return &entity, nil
}

func (s *SmartContract) QueryEVOwner(ctx contractapi.TransactionContextInterface, id string) (*EVOwner, error) {
	data, err := ctx.GetStub().GetState("OWNER_" + id)
	if err != nil || data == nil {
		return nil, fmt.Errorf("EV owner not found")
	}
	var entity EVOwner
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
