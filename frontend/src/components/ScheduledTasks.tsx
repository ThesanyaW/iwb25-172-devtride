import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ArrowLeft, Plus, Trash2, RotateCcw, Clock } from "lucide-react"

interface ScheduledTasksProps {
  onNavigate: (route: string) => void
}

export function ScheduledTasks({ onNavigate }: ScheduledTasksProps) {
  // Mock data for scheduled tasks
  const tasks = [
    {
      id: 1,
      name: "Daily API Sync",
      scheduledTime: "09:00",
      targetUrl: "https://api.example.com/sync",
      status: "Scheduled"
    },
    {
      id: 2,
      name: "Backup Database",
      scheduledTime: "02:00",
      targetUrl: "https://backup.service.com/db",
      status: "Completed"
    },
    {
      id: 3,
      name: "Send Notifications",
      scheduledTime: "18:00",
      targetUrl: "https://notify.example.com/send",
      status: "Scheduled"
    },
    {
      id: 4,
      name: "Data Processing",
      scheduledTime: "12:00",
      targetUrl: "https://processor.example.com/run",
      status: "Running"
    },
    {
      id: 5,
      name: "Health Check",
      scheduledTime: "*/15 * * * *",
      targetUrl: "https://health.example.com/check",
      status: "Scheduled"
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      "Scheduled": "bg-blue-100 text-blue-800 border-blue-200",
      "Completed": "bg-green-100 text-green-800 border-green-200", 
      "Running": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Failed": "bg-red-100 text-red-800 border-red-200"
    }
    
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants] || variants.Scheduled}>
        {status}
      </Badge>
    )
  }

  const handleDelete = (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      alert(`Task ${taskId} deleted`)
    }
  }

  const handleRerun = (taskId: number) => {
    alert(`Task ${taskId} scheduled for immediate execution`)
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
                    {task.name}
                  </TableCell>
                  <TableCell className="text-slate-600 font-mono text-sm">
                    {task.scheduledTime}
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
        </CardContent>
      </Card>
    </div>
  )
}