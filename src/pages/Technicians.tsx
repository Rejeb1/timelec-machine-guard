import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Phone, 
  Mail, 
  Wrench, 
  Clock, 
  CheckCircle,
  Plus,
  MapPin,
  Calendar
} from "lucide-react";

const Technicians = () => {
  const technicians = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@timelec.com",
      phone: "+1 (555) 123-4567",
      specialization: "CNC & Machining",
      status: "available",
      location: "Production Floor A", 
      experience: "8 years",
      activeTasks: 2,
      completedToday: 3,
      upcomingTasks: [
        { time: "14:00", machine: "CNC Mill #7", type: "Preventive" },
        { time: "16:30", machine: "Lathe #5", type: "Inspection" }
      ],
      skills: ["CNC Programming", "Hydraulics", "Electrical Systems"],
      certifications: ["OSHA 30", "Siemens Certified", "Fanuc Programming"]
    },
    {
      id: 2,
      name: "Sarah Johnson", 
      email: "sarah.johnson@timelec.com",
      phone: "+1 (555) 234-5678",
      specialization: "Electrical & Automation",
      status: "busy",
      location: "Assembly Line 1",
      experience: "6 years", 
      activeTasks: 1,
      completedToday: 2,
      upcomingTasks: [
        { time: "15:00", machine: "Robot Arm #3", type: "Emergency" }
      ],
      skills: ["PLC Programming", "Motor Control", "Safety Systems"],
      certifications: ["Allen Bradley Certified", "NECA Certified", "Arc Flash Training"]
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@timelec.com", 
      phone: "+1 (555) 345-6789",
      specialization: "Hydraulics & Pneumatics",
      status: "on-break",
      location: "Hydraulic Systems Bay",
      experience: "12 years",
      activeTasks: 0,
      completedToday: 4,
      upcomingTasks: [
        { time: "13:00", machine: "Press #12", type: "Preventive" },
        { time: "15:30", machine: "Lift System", type: "Corrective" }
      ],
      skills: ["Hydraulic Systems", "Pneumatic Controls", "Pump Repair"],
      certifications: ["Parker Hydraulics", "Bosch Rexroth", "Fluid Power Certified"]
    },
    {
      id: 4,
      name: "Lisa Wilson",
      email: "lisa.wilson@timelec.com",
      phone: "+1 (555) 456-7890", 
      specialization: "Welding & Fabrication",
      status: "available",
      location: "Welding Department",
      experience: "10 years",
      activeTasks: 1,
      completedToday: 1,
      upcomingTasks: [
        { time: "09:00", machine: "Welding Station #8", type: "Inspection" },
        { time: "11:00", machine: "Plasma Cutter", type: "Preventive" }
      ],
      skills: ["MIG/TIG Welding", "Plasma Cutting", "Metal Fabrication"],
      certifications: ["AWS D1.1", "ASME Section IX", "Pressure Vessel Certified"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-success/10 text-success">Available</Badge>;
      case "busy":
        return <Badge className="bg-warning/10 text-warning">Busy</Badge>;
      case "on-break":
        return <Badge className="bg-accent/10 text-accent">On Break</Badge>;
      case "offline":
        return <Badge className="bg-muted text-muted-foreground">Offline</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "border-success/20 bg-success/5";
      case "busy": 
        return "border-warning/20 bg-warning/5";
      case "on-break":
        return "border-accent/20 bg-accent/5";
      case "offline":
        return "border-muted bg-muted/5";
      default:
        return "";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Technician Management</h1>
          <p className="text-muted-foreground">Manage staff schedules and assignments</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Technician
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{technicians.filter(t => t.status === 'available').length}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Wrench className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{technicians.filter(t => t.status === 'busy').length}</p>
              <p className="text-sm text-muted-foreground">Busy</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{technicians.reduce((sum, t) => sum + t.activeTasks, 0)}</p>
              <p className="text-sm text-muted-foreground">Active Tasks</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{technicians.length}</p>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Technician Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {technicians.map((technician) => (
          <Card key={technician.id} className={`p-6 transition-all duration-300 hover:shadow-lg ${getStatusColor(technician.status)}`}>
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(technician.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{technician.name}</h3>
                    <p className="text-sm text-muted-foreground">{technician.specialization}</p>
                    <p className="text-xs text-muted-foreground">{technician.experience} experience</p>
                  </div>
                </div>
                {getStatusBadge(technician.status)}
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{technician.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{technician.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{technician.location}</span>
                </div>
              </div>

              {/* Today's Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">{technician.activeTasks}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-success">{technician.completedToday}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-accent">{technician.upcomingTasks.length}</p>
                  <p className="text-xs text-muted-foreground">Upcoming</p>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Next Tasks
                </h4>
                <div className="space-y-2">
                  {technician.upcomingTasks.slice(0, 2).map((task, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 bg-background/50 rounded">
                      <div>
                        <span className="font-medium">{task.time}</span>
                        <span className="text-muted-foreground mx-2">•</span>
                        <span>{task.machine}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{task.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-medium mb-2">Key Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {technician.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Schedule
                </Button>
                <Button size="sm" className="flex-1">
                  Assign Task
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Technicians;