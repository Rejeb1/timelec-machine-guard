import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";
import { 
  Settings, 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Plus,
  Calendar
} from "lucide-react";
import industrialHero from "@/assets/industrial-hero.jpg";

const Dashboard = () => {
  const dashboardStats = [
    {
      title: "Total Machines",
      value: 156,
      subtitle: "Active equipment",
      icon: Settings,
      variant: "primary" as const,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Pending Maintenance", 
      value: 23,
      subtitle: "Requires attention",
      icon: Wrench,
      variant: "warning" as const,
      trend: { value: -12, isPositive: false }
    },
    {
      title: "Critical Issues",
      value: 4,
      subtitle: "Urgent repairs needed",
      icon: AlertTriangle,
      variant: "destructive" as const,
      trend: { value: -25, isPositive: true }
    },
    {
      title: "Completed Today",
      value: 12,
      subtitle: "Maintenance tasks",
      icon: CheckCircle,
      variant: "success" as const,
      trend: { value: 15, isPositive: true }
    }
  ];

  const upcomingMaintenance = [
    { machine: "CNC Milling Machine #7", type: "Preventive", due: "2 hours", priority: "Medium" },
    { machine: "Conveyor Belt System A", type: "Inspection", due: "4 hours", priority: "Low" },
    { machine: "Industrial Robot #3", type: "Corrective", due: "Tomorrow", priority: "High" },
    { machine: "Hydraulic Press #12", type: "Preventive", due: "2 days", priority: "Medium" },
  ];

  const recentActivity = [
    { action: "Completed maintenance", machine: "Lathe Machine #5", technician: "John Smith", time: "30 min ago" },
    { action: "Started inspection", machine: "Welding Station #8", technician: "Sarah Johnson", time: "1 hour ago" },
    { action: "Reported issue", machine: "Packaging Line B", technician: "Mike Davis", time: "2 hours ago" },
    { action: "Scheduled maintenance", machine: "Compressor Unit #4", technician: "Lisa Wilson", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${industrialHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="relative h-full flex items-center justify-between p-8">
            <div className="text-primary-foreground">
              <h1 className="text-4xl font-bold mb-2">TIMELEC Dashboard</h1>
              <p className="text-xl opacity-90">Machine Maintenance Management System</p>
              <p className="text-lg opacity-75 mt-1">Monitor, Schedule, and Track All Equipment Maintenance</p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" variant="secondary" className="gap-2">
                <Plus className="w-5 h-5" />
                Add Machine
              </Button>
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Maintenance
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Maintenance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Maintenance
            </h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {upcomingMaintenance.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{item.machine}</p>
                  <p className="text-sm text-muted-foreground">{item.type} • Due in {item.due}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    item.priority === 'High' ? 'bg-destructive/10 text-destructive' :
                    item.priority === 'Medium' ? 'bg-warning/10 text-warning' :
                    'bg-success/10 text-success'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activity
            </h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted/20 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.machine}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{activity.technician}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;