package main

import (
	"encoding/json"
	// "fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func (s *SmartContract) RegisterBatteryManufacturer(ctx contractapi.TransactionContextInterface, externalID, universalID, companyCode, name, brand string) (string, error) {
	id, err := generateUniqueID(ctx, "BMANU")
	if err != nil {
		return "", err
	}
	entity := BatteryManufacturer{
		ID: id, ExternalID: externalID, UniversalID: universalID,
		CompanyCode: companyCode, Name: name, Brand: brand, Type: "Battery",
	}
	bytes, _ := json.Marshal(entity)
	return id, ctx.GetStub().PutState("BMANU_"+id, bytes)
}

func (s *SmartContract) RegisterEVManufacturer(ctx contractapi.TransactionContextInterface, externalID, universalID, companyCode, name, brand string) (string, error) {
	id, err := generateUniqueID(ctx, "EVMANU")
	if err != nil {
		return "", err
	}
	entity := EVManufacturer{
		ID: id, ExternalID: externalID, UniversalID: universalID,
		CompanyCode: companyCode, Name: name, Brand: brand, Type: "EV",
	}
	bytes, _ := json.Marshal(entity)
	return id, ctx.GetStub().PutState("EVMANU_"+id, bytes)
}

func (s *SmartContract) RegisterRecycler(ctx contractapi.TransactionContextInterface, externalID, universalID, companyCode, name, location string) (string, error) {

	id, err := generateUniqueID(ctx, "RECY")
	if err != nil {
		return "", err
	}
	entity := Recycler{
		ID: id, ExternalID: externalID, UniversalID: universalID,
		CompanyCode: companyCode, Name: name, Location: location,
	}
	bytes, _ := json.Marshal(entity)
	return id, ctx.GetStub().PutState("RECY_"+id, bytes)
}

func (s *SmartContract) RegisterEVOwner(ctx contractapi.TransactionContextInterface, externalID, universalID, companyCode, name, address string) (string, error) {

	id, err := generateUniqueID(ctx, "OWNER")
	if err != nil {
		return "", err
	}
	entity := EVOwner{
		ID: id, ExternalID: externalID, UniversalID: universalID,
		CompanyCode: companyCode, Name: name, Address: address,
	}
	bytes, _ := json.Marshal(entity)
	return id, ctx.GetStub().PutState("OWNER_"+id, bytes)
}
