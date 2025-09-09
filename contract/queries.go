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
	data, err := ctx.GetStub().GetState(id) // Remove "BMANU_" prefix since id already contains it
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
	ownerBytes, err := ctx.GetStub().GetState("OWNER_" + id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if ownerBytes == nil {
		return nil, fmt.Errorf("EV owner %s does not exist", id)
	}

	var owner EVOwner
	err = json.Unmarshal(ownerBytes, &owner)
	if err != nil {
		return nil, err
	}

	return &owner, nil
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

// ---------------------- New Query Functions for Dashboards ----------------------

// QueryAllBatteryTypesByManufacturer retrieves all battery types created by a specific manufacturer
func (s *SmartContract) QueryAllBatteryTypesByManufacturer(ctx contractapi.TransactionContextInterface, manufacturerID string) ([]*BatteryType, error) {
	mappingKey := "MANU_" + manufacturerID + "_TYPES"

	// Get the mapping of battery type IDs for this manufacturer
	mappingData, err := ctx.GetStub().GetState(mappingKey)
	if err != nil || mappingData == nil {
		return []*BatteryType{}, nil // Return empty array if no mapping found
	}

	var typeIDs []string
	if err := json.Unmarshal(mappingData, &typeIDs); err != nil {
		return []*BatteryType{}, nil
	}

	// Retrieve each battery type by ID
	var batteryTypes []*BatteryType
	for _, typeID := range typeIDs {
		typeData, err := ctx.GetStub().GetState("BTYPE_" + typeID)
		if err == nil && typeData != nil {
			var batteryType BatteryType
			if json.Unmarshal(typeData, &batteryType) == nil {
				batteryTypes = append(batteryTypes, &batteryType)
			}
		}
	}

	return batteryTypes, nil
}

// QueryAllBatteriesByManufacturer retrieves all batteries manufactured by a specific manufacturer
func (s *SmartContract) QueryAllBatteriesByManufacturer(ctx contractapi.TransactionContextInterface, manufacturerID string) ([]*Battery, error) {
	mappingKey := "MANU_" + manufacturerID + "_BATTERIES"

	// Get the mapping of battery IDs for this manufacturer
	mappingData, err := ctx.GetStub().GetState(mappingKey)
	if err != nil || mappingData == nil {
		return []*Battery{}, nil // Return empty array if no mapping found
	}

	var batteryIDs []string
	if err := json.Unmarshal(mappingData, &batteryIDs); err != nil {
		return []*Battery{}, nil
	}

	// Retrieve each battery by ID
	var batteries []*Battery
	for _, batteryID := range batteryIDs {
		batteryData, err := ctx.GetStub().GetState("BATT_" + batteryID)
		if err == nil && batteryData != nil {
			var battery Battery
			if json.Unmarshal(batteryData, &battery) == nil {
				batteries = append(batteries, &battery)
			}
		}
	}

	return batteries, nil
}

// QueryAllEVsByManufacturer retrieves all EVs manufactured by a specific manufacturer
func (s *SmartContract) QueryAllEVsByManufacturer(ctx contractapi.TransactionContextInterface, manufacturerID string) ([]*EV, error) {
	mappingKey := "MANU_" + manufacturerID + "_EVS"

	// Get the mapping of EV IDs for this manufacturer
	mappingData, err := ctx.GetStub().GetState(mappingKey)
	if err != nil || mappingData == nil {
		return []*EV{}, nil // Return empty array if no mapping found
	}

	var evIDs []string
	if err := json.Unmarshal(mappingData, &evIDs); err != nil {
		return []*EV{}, nil
	}

	// Retrieve each EV by ID
	var evs []*EV
	for _, evID := range evIDs {
		evData, err := ctx.GetStub().GetState("EV_" + evID)
		if err == nil && evData != nil {
			var ev EV
			if json.Unmarshal(evData, &ev) == nil {
				evs = append(evs, &ev)
			}
		}
	}

	return evs, nil
}

// QueryAllEVTypesByManufacturer retrieves all EV types created by a specific manufacturer
func (s *SmartContract) QueryAllEVTypesByManufacturer(ctx contractapi.TransactionContextInterface, manufacturerID string) ([]*EVType, error) {
	// For LevelDB compatibility, we'll return an empty array for now
	// In a production environment, you would implement a more sophisticated indexing strategy
	return []*EVType{}, nil
}

// QueryAllBatteryTypes retrieves all battery types (for admin purposes)
func (s *SmartContract) QueryAllBatteryTypes(ctx contractapi.TransactionContextInterface) ([]*BatteryType, error) {
	// For LevelDB compatibility, we'll use a different approach
	// We'll need to implement a global counter or use a different strategy
	// For now, return empty array - this can be enhanced later
	return []*BatteryType{}, nil
}

// QueryAllBatteries retrieves all batteries (for admin purposes)
func (s *SmartContract) QueryAllBatteries(ctx contractapi.TransactionContextInterface) ([]*Battery, error) {
	// Use range query to get all keys starting with "BATT_"
	startKey := "BATT_"
	endKey := "BATT_" + "\x7f" // Use DEL character (127) as end key, which is after all printable characters

	iterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get state by range: %v", err)
	}
	defer iterator.Close()

	var allBatteries []*Battery
	for iterator.HasNext() {
		queryResult, err := iterator.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to iterate over results: %v", err)
		}

		var battery Battery
		if err := json.Unmarshal(queryResult.Value, &battery); err != nil {
			continue // Skip malformed data
		}
		allBatteries = append(allBatteries, &battery)
	}

	return allBatteries, nil
}

// QueryAllEVs retrieves all EVs (for admin purposes)
func (s *SmartContract) QueryAllEVs(ctx contractapi.TransactionContextInterface) ([]*EV, error) {
	// For LevelDB compatibility, we'll aggregate EVs from all manufacturer mappings
	// This is a workaround - in production you'd use a global counter or index

	var allEVs []*EV

	// We'll need to implement a way to find all manufacturer mappings
	// For now, we'll return an empty array and suggest using manufacturer-specific queries
	// The frontend should call QueryAllEVsByManufacturer for each manufacturer

	// TODO: Implement a global manufacturer registry or counter
	// This would allow us to iterate through all manufacturers and aggregate their EVs

	return allEVs, nil
}

// QueryAllEVTypes retrieves all EV types (for admin purposes)
func (s *SmartContract) QueryAllEVTypes(ctx contractapi.TransactionContextInterface) ([]*EVType, error) {
	// For LevelDB compatibility, we'll return an empty array for now
	// In a production environment, you would implement a more sophisticated indexing strategy
	return []*EVType{}, nil
}

// QueryAllEVsByOwner retrieves all EVs owned by a specific owner
func (s *SmartContract) QueryAllEVsByOwner(ctx contractapi.TransactionContextInterface, ownerID string) ([]*EV, error) {
	mappingKey := "OWNER_" + ownerID + "_EVS"

	// Get the mapping of EV IDs for this owner
	mappingData, err := ctx.GetStub().GetState(mappingKey)
	if err != nil || mappingData == nil {
		return []*EV{}, nil // Return empty array if no mapping found
	}

	var evIDs []string
	if err := json.Unmarshal(mappingData, &evIDs); err != nil {
		return []*EV{}, nil
	}

	// Retrieve each EV by ID
	var evs []*EV
	for _, evID := range evIDs {
		evData, err := ctx.GetStub().GetState("EV_" + evID)
		if err == nil && evData != nil {
			var ev EV
			if json.Unmarshal(evData, &ev) == nil {
				evs = append(evs, &ev)
			}
		}
	}

	return evs, nil
}

// QueryAllEVOwners retrieves all EV owners
func (s *SmartContract) QueryAllEVOwners(ctx contractapi.TransactionContextInterface) ([]*EVOwner, error) {
	// Use range query to get all keys starting with "OWNER_OWNER_"
	startKey := "OWNER_OWNER_"
	endKey := "OWNER_OWNER_" + "\x7f" // Use DEL character (127) as end key, which is after all printable characters

	iterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get state by range: %v", err)
	}
	defer iterator.Close()

	var owners []*EVOwner
	for iterator.HasNext() {
		queryResult, err := iterator.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to iterate over results: %v", err)
		}

		var owner EVOwner
		if err := json.Unmarshal(queryResult.Value, &owner); err != nil {
			continue // Skip malformed data
		}
		owners = append(owners, &owner)
	}

	return owners, nil
}

// QueryAllBatteryManufacturers retrieves all battery manufacturers
func (s *SmartContract) QueryAllBatteryManufacturers(ctx contractapi.TransactionContextInterface) ([]*BatteryManufacturer, error) {
	// Use range query to get all keys starting with "BMANU_"
	startKey := "BMANU_"
	endKey := "BMANU_" + "\x7f" // Use DEL character (127) as end key, which is after all printable characters

	iterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get state by range: %v", err)
	}
	defer iterator.Close()

	var manufacturers []*BatteryManufacturer
	for iterator.HasNext() {
		queryResult, err := iterator.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to iterate over results: %v", err)
		}

		var manufacturer BatteryManufacturer
		if err := json.Unmarshal(queryResult.Value, &manufacturer); err != nil {
			continue // Skip malformed data
		}
		manufacturers = append(manufacturers, &manufacturer)
	}

	return manufacturers, nil
}

// Debug function to list all keys
func (s *SmartContract) DebugListAllKeys(ctx contractapi.TransactionContextInterface) ([]string, error) {
	startKey := ""
	endKey := ""

	iterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get state by range: %v", err)
	}
	defer iterator.Close()

	var keys []string
	for iterator.HasNext() {
		queryResult, err := iterator.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to iterate over results: %v", err)
		}
		keys = append(keys, queryResult.Key)
	}

	return keys, nil
}

// QueryAllRecyclers retrieves all recyclers
func (s *SmartContract) QueryAllRecyclers(ctx contractapi.TransactionContextInterface) ([]*Recycler, error) {
	// Use range query to get all keys starting with "RECY_"
	startKey := "RECY_"
	endKey := "RECY_" + "\x7f" // Use DEL character (127) as end key, which is after all printable characters

	iterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get state by range: %v", err)
	}
	defer iterator.Close()

	var recyclers []*Recycler
	for iterator.HasNext() {
		queryResult, err := iterator.Next()
		if err == nil && queryResult.Value != nil {
			var recycler Recycler
			if json.Unmarshal(queryResult.Value, &recycler) == nil {
				recyclers = append(recyclers, &recycler)
			}
		}
	}

	return recyclers, nil
}
