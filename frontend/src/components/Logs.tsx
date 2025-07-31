import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ArrowLeft, ScrollText, RefreshCw } from "lucide-react"

interface LogsProps {
  onNavigate: (route: string) => void
}

export function Logs({ onNavigate }: LogsProps) {
  // Mock log data
  const logs = [
    {
      id: 1,
      time: "2025-01-31 14:30:15",
      taskName: "Daily API Sync",
      status: "Success",
      message: "200 OK - Data synced successfully",
      duration: "1.2s"
    },
    {
      id: 2,
      time: "2025-01-31 14:15:22",
      taskName: "Health Check",
      status: "Success", 
      message: "200 OK - Service healthy",
      duration: "0.5s"
    },
    {
      id: 3,
      time: "2025-01-31 14:00:18",
      taskName: "Health Check",
      status: "Success",
      message: "200 OK - Service healthy", 
      duration: "0.4s"
    },
    {
      id: 4,
      time: "2025-01-31 13:45:33",
      taskName: "Health Check",
      status: "Success",
      message: "200 OK - Service healthy",
      duration: "0.6s"
    },
    {
      id: 5,
      time: "2025-01-31 13:30:41",
      taskName: "Health Check",
      status: "Failed",
      message: "Timeout - Request timed out after 30s",
      duration: "30.0s"
    },
    {
      id: 6,
      time: "2025-01-31 12:00:11",
      taskName: "Data Processing",
      status: "Success",
      message: "200 OK - Processing completed",
      duration: "5.8s"
    },
    {
      id: 7,
      time: "2025-01-31 09:00:05",
      taskName: "Daily API Sync",
      status: "Success",
      message: "200 OK - Data synced successfully",
      duration: "1.1s"
    },
    {
      id: 8,
      time: "2025-01-31 02:00:33",
      taskName: "Backup Database",
      status: "Failed",
      message: "500 Internal Server Error - Backup service unavailable",
      duration: "10.2s"
    }
  ]

  const getStatusBadge = (status: string) => {
    if (status === "Success") {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          Success
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          Failed
        </Badge>
      )
    }
  }

  const handleRefresh = () => {
    alert("Logs refreshed")
  }

  return (
    <div className="p-8 max-w-7xl">
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
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-600">Time</TableHead>
                <TableHead className="text-slate-600">Task Name</TableHead>
                <TableHead className="text-slate-600">Status</TableHead>
                <TableHead className="text-slate-600">Message</TableHead>
                <TableHead className="text-slate-600 text-right">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-slate-200">
                  <TableCell className="text-slate-600 font-mono text-sm">
                    {log.time}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {log.taskName}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(log.status)}
                  </TableCell>
                  <TableCell className="text-slate-600 max-w-md">
                    <span className="font-mono text-sm">{log.message}</span>
                  </TableCell>
                  <TableCell className="text-right text-slate-600 font-mono text-sm">
                    {log.duration}
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