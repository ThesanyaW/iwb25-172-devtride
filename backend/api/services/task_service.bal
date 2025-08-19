import ballerina/http;

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

service /tasks on new http:Listener(8080) {

    // POST /tasks
    resource function post tasks(@http:Payload Task task) returns Task|error {
        tasks.push(task);
        return task;
    }

    // GET /tasks
    resource function get tasks() returns Task[] {
        return tasks;
    }

    // DELETE /tasks/:id
    resource function delete tasks/[int id]() returns string {
        int index = -1;
        foreach int i in 0 ..< tasks.length() {
            if tasks[i].id == id {
                index = i;
                break;
            }
        }

        if index == -1 {
            return "Task not found!";
        }

        tasks.remove(index);
        return "Task deleted successfully!";
    }
}

