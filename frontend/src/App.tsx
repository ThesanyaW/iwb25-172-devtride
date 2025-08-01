import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";
import { CreateTask } from "./components/CreateTask";
import { Logs } from "./components/Logs";
import { ScheduledTasks } from "./components/ScheduledTasks";

function App() {
  const [page, setPage] = useState("/");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeRoute={page} onNavigate={setPage} />
      <main className="flex-1 flex items-center justify-center">
        {page === "/" && <Dashboard onNavigate={setPage} />}
        {page === "/create" && <CreateTask onNavigate={setPage} />}
        {page === "/tasks" && <ScheduledTasks onNavigate={setPage} />}
        {page === "/logs" && <Logs onNavigate={setPage} />}
      </main>
    </div>
  );
}

export default App;
