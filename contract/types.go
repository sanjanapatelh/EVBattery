package main

type Manufacturer struct {
    ID         string `json:"id"`
    Name       string `json:"name"`
    Brand      string `json:"brand"`
}

type RawMaterial struct {
    ID       string `json:"id"`
    Name     string `json:"name"`
    Proportion float64 `json:"proportion"` // if you need to track ratios
}

type Battery struct {
    ID             string   `json:"id"`
    ManufacturerID string   `json:"manufacturer_id"`
    RawMaterials   []string `json:"raw_materials"` // list of RawMaterial IDs
    Status         string   `json:"status"` // e.g., "Manufactured", "Installed", "Tested", "Recycled"
    OwnerID        string   `json:"owner_id"`
    CarID          string   `json:"car_id,omitempty"`
    CreatedAt      string   `json:"created_at"`
    UpdatedAt      string   `json:"updated_at"`
}

type Car struct {
    ID        string `json:"id"`
    OwnerID   string `json:"owner_id"`
    BatteryID string `json:"battery_id"`
}

type Owner struct {
    ID   string `json:"id"`
    Name string `json:"name"`
}

type TestResult struct {
    BatteryID string `json:"battery_id"`
    TesterID  string `json:"tester_id"`
    Result    string `json:"result"` // Pass/Fail/Details
    Date      string `json:"date"`
}

type Recycler struct {
    ID   string `json:"id"`
    Name string `json:"name"`
}
