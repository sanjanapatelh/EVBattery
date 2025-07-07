package main

// ---------------------- Participant Types ----------------------

type BatteryManufacturer struct {
	ID          string `json:"id"`
	ExternalID  string `json:"externalId"`
	UniversalID string `json:"universalId"`
	CompanyCode string `json:"companyCode"`
	Name        string `json:"name"`
	Brand       string `json:"brand"`
	Type        string `json:"type"` // Always "Battery"
}

type EVManufacturer struct {
	ID          string `json:"id"`
	ExternalID  string `json:"externalId"`
	UniversalID string `json:"universalId"`
	CompanyCode string `json:"companyCode"`
	Name        string `json:"name"`
	Brand       string `json:"brand"`
	Type        string `json:"type"` // Always "EV"
}

type Recycler struct {
	ID          string `json:"id"`
	ExternalID  string `json:"externalId"`
	UniversalID string `json:"universalId"`
	CompanyCode string `json:"companyCode"`
	Name        string `json:"name"`
	Location    string `json:"location"`
}

type CarOwner struct {
	ID          string `json:"id"`
	ExternalID  string `json:"externalId"`
	UniversalID string `json:"universalId"`
	CompanyCode string `json:"companyCode"`
	Name        string `json:"name"`
	Address     string `json:"address"`
}

// ---------------------- Asset Types ----------------------

type Battery struct {
	ID             string   `json:"id"`
	ExternalID     string   `json:"externalId"`
	ManufacturerID string   `json:"manufacturerId"`
	RawMaterials   []string `json:"rawMaterials"`
	Status         string   `json:"status"`
	CreatedAt      string   `json:"createdAt"`
	UpdatedAt      string   `json:"updatedAt"`
}

type Car struct {
	ID             string `json:"id"`
	ExternalID     string `json:"externalId"`
	Model          string `json:"model"`
	Year           string `json:"year"`
	ManufacturerID string `json:"manufacturerId"`
	BatteryID      string `json:"batteryId"`
	OwnerID        string `json:"ownerId"`
	CreatedAt      string `json:"createdAt"`
	UpdatedAt      string `json:"updatedAt"`
}

type TestResult struct {
	BatteryID string `json:"batteryId"`
	TesterID  string `json:"testerId"`
	Result    string `json:"result"`
	Date      string `json:"date"`
}