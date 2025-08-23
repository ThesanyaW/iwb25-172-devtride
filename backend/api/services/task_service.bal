import ballerina/http;
import ballerina/log;
import ballerinax/mysql;

// ✅ MySQL Client
mysql:Client db = check new (user = "balletuser",
    password = "ballet123",
    database = "balletcron",
    host = "localhost",
    port = 3306
);

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
    Task|Task[]|string? data?;
|};

// ✅ Service definition
service /tasks on new http:Listener(8080) {

    // POST /tasks
    resource function post tasks(@http:Payload Task task)
            returns http:Created|http:BadRequest|error {
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

        // Insert into MySQL
        sql:ParameterizedQuery insertQuery =
            `INSERT INTO tasks (title, description, status, targetUrl, time, payload)
              VALUES (${task.title}, ${task.description}, ${task.status}, ${task.targetUrl}, ${task.time}, ${task.payload})`;

        int result = check db->execute(insertQuery);

        if result == 1 {
            // Retrieve the last inserted task
            Task[] newTask = check db->query(
                `SELECT * FROM tasks ORDER BY id DESC LIMIT 1`,
                Task
            );

            log:printInfo("Task created in DB: " + newTask[0].toString());

            return <http:Created>{
                body: <ApiResponse>{
                    message: "Task created successfully",
                    data: newTask[0]
                }
            };
        }

        return <http:BadRequest>{
            body: <ApiResponse>{message: "Failed to insert task"}
        };
    }

    // GET /tasks
    resource function get tasks() returns http:Ok|error {
        Task[] allTasks = check db->query(`SELECT * FROM tasks`, Task);

        log:printInfo("Retrieved tasks from DB: " + allTasks.toString());

        return <http:Ok>{
            body: <ApiResponse>{
                message: "Tasks retrieved successfully",
                data: allTasks
            }
        };
    }

    // DELETE /tasks/:id
    resource function delete tasks/[int id]() returns http:Ok|http:NotFound|error {
        int result = check db->execute(`DELETE FROM tasks WHERE id = ${id}`);

        if result == 0 {
            log:printWarn("Task not found in DB with id: " + id.toString());
            return <http:NotFound>{
                body: <ApiResponse>{
                    message: "Task not found!"
                }
            };
        }

        log:printInfo("Task deleted from DB with id: " + id.toString());
        return <http:Ok>{
            body: <ApiResponse>{
                message: "Task deleted successfully!"
            }
        };
    }
}
