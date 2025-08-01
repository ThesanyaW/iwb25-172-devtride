import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Plus, FileText, Activity, CheckCircle } from "lucide-react"

interface DashboardProps {
  onNavigate: (route: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const metrics = [
    { label: "Total Scheduled Tasks", value: "12", icon: FileText, color: "text-blue-600" },
    { label: "Active Tasks", value: "8", icon: Activity, color: "text-green-600" },
    { label: "Completed Today", value: "24", icon: CheckCircle, color: "text-emerald-600" },
  ]

  return (
    <div className="p-8 max-w-6xl ml-64">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome to BalletCron
          </h1>
          <img src="/BalletCron_Logo.png" alt="BalletCron Logo" className="w-32 h-32 object-contain" />
        </div>
        <p className="text-slate-600 text-lg max-w-2xl">
          BalletCron is a cloud-native task scheduler that lets you automate HTTP tasks 
          with precision and elegance. Schedule, monitor, and manage your automated workflows 
          with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label} className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.label}
                </CardTitle>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-slate-900">{metric.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={() => onNavigate("/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 h-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Task
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => onNavigate("/tasks")}
          className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 h-auto"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Scheduled Tasks
        </Button>
      </div>
    </div>
  )
}