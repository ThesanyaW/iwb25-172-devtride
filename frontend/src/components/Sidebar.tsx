import { Home, Clock, FileText, ScrollText } from "lucide-react"
import { Button } from "./ui/button"

interface SidebarProps {
  activeRoute: string
  onNavigate: (route: string) => void
}

export function Sidebar({ activeRoute, onNavigate }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Dashboard", route: "/" },
    { icon: Clock, label: "Create Task", route: "/create" },
    { icon: FileText, label: "Scheduled Tasks", route: "/tasks" },
    { icon: ScrollText, label: "Logs", route: "/logs" },
  ]

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-semibold">BalletCron 🩰</h1>
        <p className="text-slate-400 text-sm mt-1">Task Scheduler</p>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeRoute === item.route
            
            return (
              <Button
                key={item.route}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-11 ${
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                onClick={() => onNavigate(item.route)}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">v1.0.0</p>
      </div>
    </div>
  )
}