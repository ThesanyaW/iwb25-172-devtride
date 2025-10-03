import ballerina/http;
import ballerina/log;
import ballerina/sql;
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
        sql:ParameterizedQuery query = `SELECT l.id, l.taskId, t.title AS taskTitle, l.message, l.timestamp FROM logs l JOIN tasks t ON l.taskId = t.id ORDER BY l.timestamp DESC`;
        var logStream = db->query(query, LogEntry);
        if logStream is stream<LogEntry, sql:Error?> {
            while true {
                record {|LogEntry value;|}|sql:Error|() entry = logStream.next();
                if entry is record {|LogEntry value;|} {
                    logsList.push(entry.value);
                } else if entry is sql:Error {
                    log:printError("❌ Error while streaming logs", entry);
                    return <http:InternalServerError>{body: {message: "Error fetching logs"}};
                } else {
                    break;
                }
            }
            return <http:Ok>{body: {message: "Logs retrieved successfully", data: logsList}};
        }
    }

    // 🔹 GET /logs/:taskId → fetch logs for a specific task
    resource function get logs/[int taskId]() returns http:Ok|http:InternalServerError {
        LogEntry[] logsList = [];
        sql:ParameterizedQuery query = `SELECT l.id, l.taskId, t.title AS taskTitle, l.message, l.timestamp FROM logs l JOIN tasks t ON l.taskId = t.id WHERE l.taskId = ${taskId} ORDER BY l.timestamp DESC`;
        var logStream = db->query(query, LogEntry);
        if logStream is stream<LogEntry, sql:Error?> {
            while true {
                record {|LogEntry value;|}|sql:Error|() entry = logStream.next();
                if entry is record {|LogEntry value;|} {
                    logsList.push(entry.value);
                } else if entry is sql:Error {
                    log:printError("❌ Error while streaming logs for task " + taskId.toString(), entry);
                    return <http:InternalServerError>{body: {message: "Error fetching logs"}};
                } else {
                    break;
                }
            }
            return <http:Ok>{body: {message: "Logs retrieved successfully for taskId " + taskId.toString(), data: logsList}};
        }
    }
}
