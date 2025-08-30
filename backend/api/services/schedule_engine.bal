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

service /scheduler on new http:Listener(8090) {

    // Background scheduler
resource function get start()returns     string|error {
        log: printInfo("✅ Scheduler started, checking every " + POLL_INTERVAL.toString() + " seconds")
    ;

while true {
        check processPendingTasks()
    ;
    time:sleep (POLL_INTERVAL);
}

return "Scheduler stopped!" ;
}

    // Manual rerun endpoint
    resource function post rerun/[int id]() returns http:Ok|http:NotFound|error     {
        stream<Task, error?> taskStream= db->query(`SELECT * FROM tasks WHERE id = ${id}`);
        Task[] tasks= check taskStream.toArray();

if tasks .length        ()                   ==         0                   {
        return <http:NotFound>          {
            body:              {message:  "Task not found!" }
        } ;
    }

        Task    t = tasks    [0] ;
    log:printInfo     ("⚡ Manual rerun triggered for task: "     + t.toString     () );

check executeTask     (t) ;

return <http:Ok>      {
        body:          {message:  "Task rerun successfully" ,  taskId:id }
    } ;
}
}

// Function to process scheduled tasks
function processPendingTasks() returns error? {
    string currentTime = getCurrentTime();
    log:printInfo("⏰ Checking tasks for time: " + currentTime);

    stream<Task, error?> taskStream = db->query(`SELECT * FROM tasks WHERE status = 'pending' AND time = ${currentTime}`);

    check from Task t in taskStream
        do {
            log:printInfo("🚀 Executing task: " + t.toString());
            check executeTask(t);
        };
}

// Extracted execution logic (used by scheduler + rerun)
function executeTask(Task t) returns error? {
    http:Client client = check new (t.targetUrl);
    json payload = t.payload is string ? check 'json:fromString(t.payload) : {};
    var resp = client->post("/", payload);

    if resp is http:Response {
        _ = check db->execute(`UPDATE tasks SET status = 'completed' WHERE id = ${t.id}`);
        log:printInfo("✅ Task executed successfully: " + t.id.toString());
    } else {
        _ = check db->execute(`UPDATE tasks SET status = 'failed' WHERE id = ${t.id}`);
        log:printError("❌ Task failed: " + t.id.toString());
    }

    _ = check db->execute(`INSERT INTO logs (task_id, message, level) VALUES (${t.id}, "Executed by scheduler/rerun", "INFO")`);
}

// Utility: Get current HH:mm
function getCurrentTime() returns string {
    time:TimeOfDay tod = time:currentTime().utcOffset("+05:30").timeOfDay;
    int hour = tod.hour;
    int minute = tod.minute;

    return string `${hour}:${minute < 10 ? "0" + minute.toString() : minute.toString()}`;
}
