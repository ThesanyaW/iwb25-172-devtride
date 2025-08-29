# 🎶 Balletcron – Distributed Task Scheduler  

Balletcron is a **distributed microservice orchestration platform** built with **Ballerina (Backend)** and **React + Vite + TypeScript + Tailwind + shadcn (Frontend)**.  
It automates task scheduling, execution, and monitoring with a **modern dashboard** and **scalable backend**.  

---

## 🚀 Features  

### ⚙️ Backend (Ballerina)  
- **RESTful API with Ballerina** – Provides endpoints for task scheduling and management.  
- **Task Scheduling with Cron Expressions** – Supports flexible scheduling using cron syntax.  
- **Database Integration (MySQL)** – Stores tasks, schedules, and logs securely.  
- **Automatic Task Execution** – Executes scheduled tasks at the defined time intervals.  
- **Logging System** – Maintains detailed execution logs for monitoring and debugging.  
- **Error Handling & Validation** – Ensures reliability with input validation and structured error messages.  
- **Scalable Architecture** – Designed to handle multiple tasks efficiently.  

### 💻 Frontend (React + Vite + Tailwind + shadcn)  
- **Interactive Dashboard** – Overview of scheduled tasks and system status.  
- **Task Creation UI** – Form to create and configure new tasks.  
- **Scheduled Tasks View** – Displays all upcoming tasks with execution details.  
- **Task Logs View** – Monitors task history and execution logs.  
- **Modern UI/UX** – Built with **Tailwind CSS** + **shadcn** for clean and responsive design.  

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
│── backend/              # Ballerina backend code
│   ├── ballerina.toml
│   ├── src/
│   └── db/               # MySQL schema & migrations
│
│── frontend/             # React + Vite frontend code
│   ├── src/
│   │   ├── components/
│   │   ├── pages/        # Dashboard, Create Task, Scheduled Tasks, Task Logs
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

3. Update database credentials in `backend/src/config.bal`.
4. Run the backend:

   ```bash
   bal run
   ```

### 🎨 Frontend Setup (React + Vite)

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start development server:

   ```bash
   npm run dev
   ```
4. Open in browser: [http://localhost:5173](http://localhost:5173)

---

## 📸 UI Screens

* **📊 Dashboard** – Overview of system status and tasks
* **📝 Create Task** – Add and configure new tasks
* **⏰ Scheduled Tasks** – List of tasks with cron schedules
* **📜 Task Logs** – Execution history & logs

---

## 🤝 Contributing

1. Fork the repository 🍴
2. Create a feature branch 🌱

   ```bash
   git checkout -b feature-name
   ```
3. Commit changes ✨

   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork 🚀

   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request 🎉

---

## 📜 License

MIT License © 2025 Balletcron

```
