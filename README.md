# 🎶 Balletcron – Distributed Task Scheduler  

Balletcron is a **distributed microservice orchestration platform** built with **Ballerina (Backend)** and **React + Vite + TypeScript + Tailwind + shadcn (Frontend)**.  
It automates **task scheduling, execution, and monitoring** with a modern **dashboard** and scalable **backend services**.  

---

## 🚀 Features  

### ⚙️ Backend (Ballerina + MySQL)  
- **Task Service (`task_service.bal`)** – REST API to create, retrieve, and delete tasks.  
- **Scheduler Engine (`schedule_engine.bal`)** – Executes scheduled tasks at the right time.  
- **Log Service (`log_service.bal`)** – Stores execution logs for monitoring and debugging.  
- **Database Integration (MySQL)** – Persistent storage for tasks and logs.  
- **Error Handling & Validation** – Ensures reliability with structured error messages.  
- **Scalable Microservices** – Each service runs independently for better orchestration.  

### 💻 Frontend (React + Vite + Tailwind + shadcn)  
- **Interactive Dashboard** – Overview of system status and task statistics.  
- **Create Task UI** – Form to schedule new tasks with JSON payloads.  
- **Scheduled Tasks View** – Live-updating list of tasks with execution status.  
- **Task Logs View** – Monitor task execution history and logs.  
- **Modern UI/UX** – Built with **Tailwind CSS** + **shadcn/ui** for clean, responsive design.  

---

## 🛠️ Tech Stack  

### Backend  
- [Ballerina](https://ballerina.io/) – Service orchestration & task execution  
- [MySQL](https://www.mysql.com/) – Data persistence  

### Frontend  
- [React (TypeScript)](https://react.dev/) – Component-based UI  
- [Vite](https://vitejs.dev/) – Lightning-fast dev server and bundler  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  
- [shadcn/ui](https://ui.shadcn.com/) – Prebuilt UI components  

---

## 📂 Project Structure  

```

Balletcron/
│── backend/               # Ballerina backend services
│   ├── task\_service.bal   # Task CRUD REST API
│   ├── schedule\_engine.bal# Scheduler engine
│   ├── log\_service.bal    # Logging service
│   ├── Ballerina.toml
│   └── db/                # MySQL schema & migrations
│
│── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Dashboard, CreateTask, ScheduledTasks, TaskLogs
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
│
└── README.md

````

---

## ⚡ Getting Started  

### 🔧 Backend Setup (Ballerina)  
1. Install [Ballerina](https://ballerina.io/downloads/).  
2. Install MySQL and create a database:  
   ```sql
   CREATE DATABASE balletcron;
````

3. Create required tables:

   ```sql
   -- Tasks Table
   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       status ENUM('pending','running','completed','failed') DEFAULT 'pending',
       targetUrl VARCHAR(500) NOT NULL,
       time VARCHAR(10) NOT NULL, -- e.g. "14:00"
       payload JSON
   );

   -- Logs Table
   CREATE TABLE logs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       task_id INT NOT NULL,
       message TEXT NOT NULL,
       level ENUM('INFO','WARN','ERROR') DEFAULT 'INFO',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
   );
   ```
4. Update MySQL credentials in each service file (e.g. `task_service.bal`, `schedule_engine.bal`, `log_service.bal`):

   ```ballerina
   mysql:Client db = check new (user = "balletuser",
       password = "ballet123",
       database = "balletcron",
       host = "localhost",
       port = 3306
   );
   ```
5. Run each service (in separate terminals):

   ```bash
   bal run task_service.bal
   bal run schedule_engine.bal
   bal run log_service.bal
   ```

### 🎨 Frontend Setup (React + Vite)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the dev server:

   ```bash
   npm run dev
   ```
4. Open in browser: [http://localhost:5173](http://localhost:5173)

---

## 📸 UI Screens

* **📊 Dashboard** – Overview of system status and tasks
* **📝 Create Task** – Add and configure new tasks with JSON payloads
* **⏰ Scheduled Tasks** – Live-updating list of tasks with execution status
* **📜 Task Logs** – Task execution history and monitoring

---

## 🤝 Contributing

1. Fork the repository 🍴
2. Create a feature branch 🌱

   ```bash
   git checkout -b feature-name
   ```
3. Commit changes ✨

   ```bash
   git commit -m "Add feature XYZ"
   ```
4. Push to your fork 🚀

   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request 🎉

---

## 📜 License

MIT License © 2025 **Balletcron**

```
