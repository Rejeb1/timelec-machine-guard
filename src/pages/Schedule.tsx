import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Settings, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const Schedule = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const scheduledMaintenance = [
    {
      date: "2024-01-25",
      time: "08:00",
      machine: "CNC Milling Machine #7",
      type: "Preventive",
      technician: "John Smith",
      duration: "4h",
      priority: "High"
    },
    {
      date: "2024-01-25",
      time: "14:00", 
      machine: "Welding Station #8",
      type: "Inspection",
      technician: "Sarah Johnson",
      duration: "1.5h",
      priority: "Medium"
    },
    {
      date: "2024-01-26",
      time: "09:00",
      machine: "Conveyor Belt System A", 
      type: "Corrective",
      technician: "Mike Davis",
      duration: "2h",
      priority: "Medium"
    },
    {
      date: "2024-01-26",
      time: "13:00",
      machine: "Hydraulic Press #12",
      type: "Preventive", 
      technician: "Lisa Wilson",
      duration: "3h",
      priority: "Low"
    },
    {
      date: "2024-01-27",
      time: "10:00",
      machine: "Industrial Robot #3",
      type: "Emergency",
      technician: "John Smith", 
      duration: "6h",
      priority: "Critical"
    },
    {
      date: "2024-01-28",
      time: "08:30",
      machine: "Lathe Machine #5",
      type: "Preventive",
      technician: "Sarah Johnson",
      duration: "2.5h", 
      priority: "Medium"
    }
  ];

  const todaysTasks = scheduledMaintenance.filter(task => 
    task.date === currentDate.toISOString().split('T')[0]
  );

  const upcomingTasks = scheduledMaintenance.filter(task => 
    new Date(task.date) > currentDate
  ).slice(0, 6);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-destructive/10 text-destructive";
      case "High": 
        return "bg-warning/10 text-warning";
      case "Medium":
        return "bg-primary/10 text-primary";
      case "Low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "bg-destructive/10 text-destructive";
      case "Corrective":
        return "bg-warning/10 text-warning";
      case "Preventive":
        return "bg-success/10 text-success";
      case "Inspection":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Schedule</h1>
          <p className="text-muted-foreground">Plan and manage maintenance activities</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Calendar Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">{currentMonth}</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-2xl font-bold text-primary">{scheduledMaintenance.length}</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </div>
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <p className="text-2xl font-bold text-success">{todaysTasks.length}</p>
            <p className="text-sm text-muted-foreground">Today</p>
          </div>
          <div className="text-center p-4 bg-warning/5 rounded-lg">
            <p className="text-2xl font-bold text-warning">
              {scheduledMaintenance.filter(t => t.priority === "High" || t.priority === "Critical").length}
            </p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </div>
          <div className="text-center p-4 bg-accent/5 rounded-lg">
            <p className="text-2xl font-bold text-accent">4</p>
            <p className="text-sm text-muted-foreground">Technicians</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Schedule
          </h3>
          {todaysTasks.length > 0 ? (
            <div className="space-y-4">
              {todaysTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{task.time}</span>
                      <Badge className={getTypeColor(task.type)}>{task.type}</Badge>
                    </div>
                    <p className="font-medium">{task.machine}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {task.technician}
                      </span>
                      <span>{task.duration}</span>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No maintenance scheduled for today</p>
            </div>
          )}
        </Card>

        {/* Upcoming Tasks */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Upcoming Tasks
          </h3>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/10 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(task.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="font-medium">{task.time}</span>
                  </div>
                  <p className="font-medium">{task.machine}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {task.technician}
                    </span>
                    <Badge className={getTypeColor(task.type)} variant="outline">{task.type}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">{task.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          This Week Overview
        </h3>
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">{day}</p>
              <div className="h-32 border rounded-lg p-2 space-y-1">
                {scheduledMaintenance
                  .filter(task => new Date(task.date).getDay() === (index + 1) % 7)
                  .slice(0, 3)
                  .map((task, taskIndex) => (
                    <div key={taskIndex} className="text-xs p-1 bg-primary/10 rounded text-primary truncate">
                      {task.time} {task.machine.split(' ')[0]}
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Schedule;