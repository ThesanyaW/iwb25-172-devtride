import ballerina/http;

// ✅ Task Data Model
type Task record {|
    int id;
    string title;
    string description?;
    string status = "pending";
    string targetUrl;
    string time;
    string payload?;
|};

// Temporary in-memory "database"
isolated final Task[] tasks = [];

// ✅ Service definition
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

