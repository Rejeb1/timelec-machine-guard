import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Plus, 
  Wrench, 
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  Calendar
} from "lucide-react";

const Maintenance = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const maintenanceTasks = [
    {
      id: "MAINT-001",
      machine: "CNC Milling Machine #7",
      type: "Preventive",
      priority: "High",
      assignedTo: "John Smith",
      status: "in-progress",
      dueDate: "2024-01-25",
      estimatedHours: 4,
      description: "Replace coolant system filters and check spindle alignment"
    },
    {
      id: "MAINT-002", 
      machine: "Conveyor Belt System A",
      type: "Corrective",
      priority: "Medium",
      assignedTo: "Sarah Johnson",
      status: "pending",
      dueDate: "2024-01-26",
      estimatedHours: 2,
      description: "Belt tension adjustment and roller bearing inspection"
    },
    {
      id: "MAINT-003",
      machine: "Industrial Robot #3",
      type: "Emergency",
      priority: "Critical",
      assignedTo: "Mike Davis",
      status: "in-progress",
      dueDate: "2024-01-24",
      estimatedHours: 6,
      description: "Motor controller replacement due to overheating"
    },
    {
      id: "MAINT-004",
      machine: "Hydraulic Press #12", 
      type: "Preventive",
      priority: "Low",
      assignedTo: "Lisa Wilson",
      status: "completed",
      dueDate: "2024-01-23",
      estimatedHours: 3,
      description: "Hydraulic fluid change and pressure system check"
    },
    {
      id: "MAINT-005",
      machine: "Welding Station #8",
      type: "Inspection",
      priority: "Medium",
      assignedTo: "John Smith",
      status: "scheduled",
      dueDate: "2024-01-27",
      estimatedHours: 1.5,
      description: "Safety system inspection and electrode replacement"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-primary/10 text-primary">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning">Pending</Badge>;
      case "scheduled":
        return <Badge className="bg-accent/10 text-accent">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-destructive/10 text-destructive">Critical</Badge>;
      case "High":
        return <Badge className="bg-warning/10 text-warning">High</Badge>;
      case "Medium":
        return <Badge className="bg-primary/10 text-primary">Medium</Badge>;
      case "Low":
        return <Badge className="bg-muted text-muted-foreground">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Emergency":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "Corrective":
        return <Wrench className="w-4 h-4 text-warning" />;
      case "Preventive":
        return <Clock className="w-4 h-4 text-primary" />;
      case "Inspection":
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Wrench className="w-4 h-4" />;
    }
  };

  const filteredTasks = maintenanceTasks.filter(task =>
    task.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tasksByStatus = {
    pending: filteredTasks.filter(task => task.status === "pending"),
    scheduled: filteredTasks.filter(task => task.status === "scheduled"),
    inProgress: filteredTasks.filter(task => task.status === "in-progress"),
    completed: filteredTasks.filter(task => task.status === "completed")
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Tasks</h1>
          <p className="text-muted-foreground">Manage and track all maintenance activities</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Task
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks, machines, or technicians..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Tasks by Status */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Tasks ({filteredTasks.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({tasksByStatus.pending.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled ({tasksByStatus.scheduled.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({tasksByStatus.inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({tasksByStatus.completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredTasks.map((task) => (
            <MaintenanceTaskCard key={task.id} task={task} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {tasksByStatus.pending.map((task) => (
            <MaintenanceTaskCard key={task.id} task={task} />
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {tasksByStatus.scheduled.map((task) => (
            <MaintenanceTaskCard key={task.id} task={task} />
          ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {tasksByStatus.inProgress.map((task) => (
            <MaintenanceTaskCard key={task.id} task={task} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {tasksByStatus.completed.map((task) => (
            <MaintenanceTaskCard key={task.id} task={task} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  function MaintenanceTaskCard({ task }: { task: any }) {
    return (
      <Card className="p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-muted/20 rounded-lg">
              {getTypeIcon(task.type)}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">{task.machine}</h3>
                <span className="text-sm text-muted-foreground">({task.id})</span>
              </div>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{task.assignedTo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{task.estimatedHours}h estimated</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getPriorityBadge(task.priority)}
            {getStatusBadge(task.status)}
          </div>
        </div>
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" size="sm">View Details</Button>
          <Button variant="outline" size="sm">Update Status</Button>
          <Button size="sm">Add Notes</Button>
        </div>
      </Card>
    );
  }
};

export default Maintenance;