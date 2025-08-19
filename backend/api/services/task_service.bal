// -------------------------------
// ✅ Task Data Model
// -------------------------------

// Each Task will follow this structure
type Task record {|
    int id; // unique ID for the task
    string title; // task title
    string description?; // optional description
    string status = "pending"; // default value is "pending"
|};

// Temporary in-memory "database"
isolated final Task[] tasks = [];
