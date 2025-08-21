package main

import (
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"

)


// generateStructuredID creates an ID like B+TYPECODE+0001 or EV+MODEL+0001
func generateStructuredID(prefix, typeCode string, serial int) string {
	return fmt.Sprintf("%s+%s+%04d", prefix, typeCode, serial)
}

// getNextSerial reads the next serial number for a given typeCode key
func getNextSerial(ctx contractapi.TransactionContextInterface, key string) (int, error) {
	countBytes, err := ctx.GetStub().GetState(key)
	if err != nil || countBytes == nil {
		return 1, nil
	}
	count, err := strconv.Atoi(string(countBytes))
	if err != nil {
		return 1, nil
	}
	return count + 1, nil
}

// updateSerial stores the next serial value for a given key
func updateSerial(ctx contractapi.TransactionContextInterface, key string, val int) {
	ctx.GetStub().PutState(key, []byte(strconv.Itoa(val)))
}



func generateUniqueID(ctx contractapi.TransactionContextInterface, prefix string) (string, error) {
	ts, err := ctx.GetStub().GetTxTimestamp()
	if err != nil {
		return "", fmt.Errorf("unable to get TxTimestamp: %v", err)
	}
	timestamp := time.Unix(ts.Seconds, int64(ts.Nanos)).UnixNano()
	return fmt.Sprintf("%s_%d", prefix, timestamp), nil
}
