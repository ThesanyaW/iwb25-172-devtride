import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ArrowLeft, Calendar } from "lucide-react"

interface CreateTaskProps {
  onNavigate: (route: string) => void
}

export function CreateTask({ onNavigate }: CreateTaskProps) {
  const [formData, setFormData] = useState({
    taskName: "",
    targetUrl: "",
    time: "",
    jsonPayload: '{\n  "message": "Hello from BalletCron"\n}'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock task creation
    alert("Task scheduled successfully!")
    onNavigate("/tasks")
  }

  const timeOptions = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ]

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate("/")}
          className="text-slate-600 hover:text-slate-900 mb-4 px-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <h1 className="text-2xl font-semibold text-slate-900">Create New Task</h1>
        <p className="text-slate-600 mt-1">Schedule a new HTTP task to run automatically</p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Calendar className="w-5 h-5" />
            Task Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="taskName">Task Name</Label>
                <Input
                  id="taskName"
                  placeholder="e.g., Daily API Sync"
                  value={formData.taskName}
                  onChange={(e) => setFormData({...formData, taskName: e.target.value})}
                  className="border-slate-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Scheduled Time</Label>
                <Select onValueChange={(value) => setFormData({...formData, time: value})}>
                  <SelectTrigger className="border-slate-300">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetUrl">Target URL</Label>
              <Input
                id="targetUrl"
                placeholder="https://api.example.com/webhook"
                value={formData.targetUrl}
                onChange={(e) => setFormData({...formData, targetUrl: e.target.value})}
                className="border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jsonPayload">JSON Payload</Label>
              <Textarea
                id="jsonPayload"
                placeholder="Enter JSON payload for the request"
                value={formData.jsonPayload}
                onChange={(e) => setFormData({...formData, jsonPayload: e.target.value})}
                className="border-slate-300 font-mono text-sm min-h-32"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Schedule Task
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={() => onNavigate("/tasks")}
                className="border-slate-300 text-slate-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}