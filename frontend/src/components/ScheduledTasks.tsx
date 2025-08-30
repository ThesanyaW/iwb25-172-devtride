import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ArrowLeft, Plus, Trash2, RotateCcw, Clock, Loader2 } from "lucide-react"

interface ScheduledTasksProps {
  onNavigate: (route: string) => void
}

interface Task {
  id: number
  title: string
  time: string
  targetUrl: string
  status: string
}

export function ScheduledTasks({ onNavigate }: ScheduledTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/tasks")
      if (!response.ok) throw new Error("Failed to fetch tasks")

      const data = await response.json()
      setTasks(data.data || [])
    } catch (err) {
      console.error("❌ Error fetching tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
    const interval = setInterval(fetchTasks, 5000) // auto-refresh every 5s
    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      Completed: "bg-green-100 text-green-800 border-green-200",
      Running: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Failed: "bg-red-100 text-red-800 border-red-200"
    }

    return (
      <Badge
        variant="outline"
        className={variants[status] || variants.Scheduled}
      >
        {status === "Running" ? (
          <span className="flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Running
          </span>
        ) : (
          status
        )}
      </Badge>
    )
  }

  const handleDelete = async (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
          method: "DELETE",
        })
        if (!response.ok) throw new Error("Failed to delete task")
        alert(`✅ Task ${taskId} deleted successfully`)
        fetchTasks()
      } catch (err) {
        console.error("❌ Error deleting task:", err)
        alert("❌ Failed to delete task. Check console for details.")
      }
    }
  }

  const handleRerun = async (taskId: number) => {
    try {
      const res = await fetch(`http://localhost:8090/scheduler/rerun/${taskId}`, {
        method: "POST",
      })
      if (res.ok) {
        alert(`⚡ Task ${taskId} rerun successfully!`)
        fetchTasks() // refresh list
      } else {
        alert("❌ Failed to rerun task")
      }
    } catch (err) {
      console.error("❌ Error rerunning task:", err)
    }
  }

  return (
    <div className="p-8 max-w-7xl ml-64">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate("/")}
          className="text-slate-600 hover:text-slate-900 mb-4 px-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Scheduled Tasks</h1>
            <p className="text-slate-600 mt-1">Manage your automated HTTP tasks</p>
          </div>
          
          <Button 
            onClick={() => onNavigate("/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Clock className="w-5 h-5" />
            All Tasks ({tasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-slate-500">Loading tasks...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600">Task Name</TableHead>
                  <TableHead className="text-slate-600">Scheduled Time</TableHead>
                  <TableHead className="text-slate-600">Target URL</TableHead>
                  <TableHead className="text-slate-600">Status</TableHead>
                  <TableHead className="text-slate-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-slate-200">
                    <TableCell className="font-medium text-slate-900">
                      {task.title}
                    </TableCell>
                    <TableCell className="text-slate-600 font-mono text-sm">
                      {task.time}
                    </TableCell>
                    <TableCell className="text-slate-600 font-mono text-sm max-w-xs truncate">
                      {task.targetUrl}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(task.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRerun(task.id)}
                          className="text-slate-600 hover:text-blue-600 h-8 w-8 p-0"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(task.id)}
                          className="text-slate-600 hover:text-red-600 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
