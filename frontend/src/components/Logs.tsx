import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ArrowLeft, ScrollText, RefreshCw } from "lucide-react"

interface LogsProps {
  onNavigate: (route: string) => void
}

interface LogEntry {
  id: number
  taskId: number
  taskTitle: string
  message: string
  timestamp: string
}

export function Logs({ onNavigate }: LogsProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8091/logs")
      if (!response.ok) throw new Error("Failed to fetch logs")

      const data = await response.json()
      setLogs(data.data || [])
    } catch (err) {
      console.error("❌ Error fetching logs:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const getStatusBadge = (message: string) => {
    if (message.toLowerCase().includes("failed") || message.toLowerCase().includes("error")) {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          Failed
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
        Success
      </Badge>
    )
  }

  const handleRefresh = () => {
    fetchLogs()
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
            <h1 className="text-2xl font-semibold text-slate-900">Activity Monitor</h1>
            <p className="text-slate-600 mt-1">View task execution logs and system activity</p>
          </div>
          
          <Button 
            onClick={handleRefresh}
            variant="outline"
            className="border-slate-300 text-slate-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <ScrollText className="w-5 h-5" />
            Recent Activity ({logs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-slate-500">Loading logs...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600">Time</TableHead>
                  <TableHead className="text-slate-600">Task</TableHead>
                  <TableHead className="text-slate-600">Status</TableHead>
                  <TableHead className="text-slate-600">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="border-slate-200">
                    <TableCell className="text-slate-600 font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {log.taskTitle}{" "}
                      <span className="text-slate-400 text-xs">#{log.taskId}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(log.message)}
                    </TableCell>
                    <TableCell className="text-slate-600 max-w-md">
                      <span className="font-mono text-sm">{log.message}</span>
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
