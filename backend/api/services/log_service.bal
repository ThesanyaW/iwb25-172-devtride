import ballerina/http;
import ballerina/log;
import ballerinax/mysql;

// ✅ MySQL client
mysql:Client db = check new (user = "balletuser",
    password = "ballet123",
    database = "balletcron",
    host = "localhost",
    port = 3306
);

// ✅ Log record type (now includes taskTitle)
type LogEntry record {|
    int id;
    int taskId;
    string taskTitle;
    string message;
    string timestamp;
|};

// ✅ API response wrapper
type ApiResponse record {|
    string message;
    LogEntry[]|LogEntry|error? data?;
|};

// ✅ Service definition
service /logs on new http:Listener(8091) {

    // 🔹 GET /logs → fetch all logs with task titles
    resource function get logs() returns http:Ok|http:InternalServerError {
        LogEntry[] logsList = [];
        string query = "SELECT l.id, l.taskId, t.title AS taskTitle, l.message, l.timestamp " + +
                        "FROM logs l JOIN tasks t ON l.taskId = t.id " + +
                        "ORDER BY l.timestamp DESC";

        var result = db->query(query);

        if result is stream<record {}, error> {
            error err = <error>result;
            log:printError("❌ Failed to fetch logs", err);
            return <http:InternalServerError>{
                body: {message: "Error fetching logs"}
            };
        }

        // Convert results
        stream<record {}, error> logStream = <stream<record {}, error>>result;
        check from record {} row in logStream
            let LogEntry logEntry = {
                id: <int>row["id"],
                taskId: <int>row["taskId"],
                taskTitle: <string>row["taskTitle"],
                message: <string>row["message"],
                timestamp: <string>row["timestamp"]
            }
            do {
                logsList.push(logEntry);
            };

        return <http:Ok>{
            body: <ApiResponse>{
                message: "Logs retrieved successfully",
                data: logsList
            }
        };
    }

    // 🔹 GET /logs/:taskId → fetch logs for a specific task
    resource function get logs/[int taskId]() returns http:Ok|http:InternalServerError {
        LogEntry[] logsList = [];
        string query = "SELECT l.id, l.taskId, t.title AS taskTitle, l.message, l.timestamp " + +
                        "FROM logs l JOIN tasks t ON l.taskId = t.id " + +
                        "WHERE l.taskId = ? ORDER BY l.timestamp DESC";

        var result = db->query(query, taskId);

        if result is stream<record {}, error> {
            error err = <error>result;
            log:printError("❌ Failed to fetch logs for task " + taskId.toString(), err);
            return <http:InternalServerError>{
                body: {message: "Error fetching logs"}
            };
        }

        // Convert results
        stream<record {}, error> logStream = <stream<record {}, error>>result;
        check from record {} row in logStream
            let LogEntry logEntry = {
                id: <int>row["id"],
                taskId: <int>row["taskId"],
                taskTitle: <string>row["taskTitle"],
                message: <string>row["message"],
                timestamp: <string>row["timestamp"]
            }
            do {
                logsList.push(logEntry);
            };

        return <http:Ok>{
            body: <ApiResponse>{
                message: "Logs retrieved successfully for taskId " + taskId.toString(),
                data: logsList
            }
        };
    }
}
