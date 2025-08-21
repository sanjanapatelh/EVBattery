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

type EVOwner struct {
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
	UniversalID    string   `json:"universalId"`
	TypeID         string   `json:"typeId"`
	ManufacturerID string   `json:"manufacturerId"`
	Status         string   `json:"status"`
	CreatedAt      string   `json:"createdAt"`
	UpdatedAt      string   `json:"updatedAt"`
}

type EV struct {
	ID             string `json:"id"`
	ExternalID     string `json:"externalId"`
	UniversalID    string `json:"universalId"`
	TypeID         string `json:"typeId"`
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

// ---------------------- Type Definitions ----------------------

type BatteryType struct {
	ID             string  `json:"id"`
	UniversalID    string  `json:"universalId"`
	Code           string  `json:"code"`
	Description    string  `json:"description"`
	Chemistry      string  `json:"chemistry"`
	Capacity       float64 `json:"capacity"`
	Voltage        float64 `json:"voltage"`
	ManufacturerID string  `json:"manufacturerId"`
}

type EVType struct {
	ID             string `json:"id"`
	UniversalID    string `json:"universalId"`
	Code           string `json:"code"`
	Description    string `json:"description"`
	Model          string `json:"model"`
	Year           string `json:"year"`
	ManufacturerID string `json:"manufacturerId"`
}

type BindingType struct {
	ID                 string `json:"id"`
	UniversalID        string `json:"universalId"`
	Code               string `json:"code"`
	Description        string `json:"description"`
	CompatibilityNotes string `json:"compatibilityNotes"`
	ManufacturerID     string `json:"manufacturerId"`
}
