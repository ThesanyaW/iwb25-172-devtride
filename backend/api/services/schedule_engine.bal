import ballerina/http;
import ballerina/log;
import ballerina/time;
import ballerinax/mysql;

mysql:Client db = check new (user = "balletuser",
    password = "ballet123",
    database = "balletcron",
    host = "localhost",
    port = 3306
);

type Task record {|
    int id;
    string title;
    string description?;
    string status;
    string targetUrl;
    string time; // e.g. "14:00"
    string payload?;
|};

// Polling interval: every 60 seconds
const int POLL_INTERVAL = 60;

// Background service
service /scheduler on new http:Listener(8090) {

resource function get start()returns     string|error {
        log: printInfo("✅ Scheduler started, checking every " + POLL_INTERVAL.toString() + " seconds");

while true {
check processPendingTasks();
    time:sleep (POLL_INTERVAL);
}

return "Scheduler stopped!" ;

}
}

// Function to process tasks
function processPendingTasks() returns error? {
    string currentTime = getCurrentTime();
    log:printInfo("⏰ Checking tasks for time: " + currentTime);

    stream<Task, error?> taskStream = db->query(`SELECT * FROM tasks WHERE status = 'pending' AND time = ${currentTime}`);

    check from Task t in taskStream
        do {
            log:printInfo("🚀 Executing task: " + t.toString());

            // Make HTTP POST request
            http:Client client = check new (t.targetUrl);
            json payload = t.payload is string ? check 'json:fromString(t.payload) : {};
            var resp = client->post("/", payload);

            if resp is http:Response {
                log:printInfo("✅ Task executed successfully: " + t.id.toString());
                _ = check db->execute(`UPDATE tasks SET status = 'completed' WHERE id = ${t.id}`);
            } else {
                log:printError("❌ Task failed: " + t.id.toString());
                _ = check db->execute(`UPDATE tasks SET status = 'failed' WHERE id = ${t.id}`);
            }

            // Insert into logs table
            _ = check db->execute(`INSERT INTO logs (task_id, message, level) VALUES (${t.id}, "Executed by scheduler", "INFO")`);
        };
}

function getCurrentTime() returns string {
    time:TimeOfDay tod = time:currentTime().utcOffset("+05:30").timeOfDay;
    int hour = tod.hour;
    int minute = tod.minute;

    return string `${hour}:${minute < 10 ? "0" + minute.toString() : minute.toString()}`;
}
