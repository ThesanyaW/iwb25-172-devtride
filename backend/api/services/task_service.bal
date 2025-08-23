import ballerina/http;
import ballerina/log;

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

// ✅ Response type for API responses
type ApiResponse record {|
    string message;
    Task|Task[]|string data?;
|};

// ✅ In-memory "database"
isolated Task[] tasks = [];

// ✅ Service definition
service /tasks on new http:Listener(8080) {

    // POST /tasks
    resource function post tasks(@http:Payload Task task) returns http:Created|http:BadRequest|error {
        log:printInfo("Received task payload: " + task.toString());

        // Validate required fields
        if task.title.trim() == "" || task.targetUrl.trim() == "" || task.time.trim() == "" {
            log:printError("Validation failed for task: " + task.toString());
            return <http:BadRequest>{
                body: <ApiResponse>{
                    message: "Invalid input: title, targetUrl, and time are required and cannot be empty"
                }
            };
        }

        lock {
            // Create the new task with a unique ID
            Task createdTask = {
                id: tasks.length() + 1,
                title: task.title,
                description: task.description,
                status: task.status,
                targetUrl: task.targetUrl,
                time: task.time,
                payload: task.payload
            };

            tasks.push(createdTask);
            log:printInfo("Task created: " + createdTask.toString());

            return <http:Created>{
                body: <ApiResponse>{
                    message: "Task created successfully",
                    data: createdTask
                }
            };
        }
    }

    // GET /tasks
    resource function get tasks() returns http:Ok {
        lock {
            log:printInfo("Retrieving tasks: " + tasks.toString());
            return <http:Ok>{
                body: <ApiResponse>{
                    message: "Tasks retrieved successfully",
                    data: tasks.clone()
                }
            };
        }
    }

    // DELETE /tasks/:id
    resource function delete tasks/[int id]() returns http:Ok|http:NotFound {
        int index = -1;

        lock {
            foreach int i in 0 ..< tasks.length() {
                if tasks[i].id == id {
                    index = i;
                    break;
                }
            }

            if index == -1 {
                log:printWarn("Task not found with id: " + id.toString());
                return <http:NotFound>{
                    body: <ApiResponse>{
                        message: "Task not found!"
                    }
                };
            }

            _ = tasks.remove(index);
            log:printInfo("Task deleted with id: " + id.toString());
            return <http:Ok>{
                body: <ApiResponse>{
                    message: "Task deleted successfully!"
                }
            };
        }
    }
}
