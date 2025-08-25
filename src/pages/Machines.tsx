import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  Settings, 
  MapPin, 
  Calendar,
  Wrench,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Machines = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const machines = [
    {
      id: "CNC-007",
      name: "CNC Milling Machine #7",
      type: "CNC Machine",
      location: "Production Floor A",
      status: "operational",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-02-15",
      condition: "Good",
      uptime: 94.5
    },
    {
      id: "CONV-001", 
      name: "Conveyor Belt System A",
      type: "Conveyor System",
      location: "Assembly Line 1",
      status: "maintenance",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-01-25",
      condition: "Fair",
      uptime: 87.2
    },
    {
      id: "ROB-003",
      name: "Industrial Robot #3", 
      type: "Robotic Arm",
      location: "Welding Station",
      status: "critical",
      lastMaintenance: "2023-12-20",
      nextMaintenance: "2024-01-20",
      condition: "Poor",
      uptime: 65.8
    },
    {
      id: "PRESS-012",
      name: "Hydraulic Press #12",
      type: "Hydraulic Press",
      location: "Forming Department",
      status: "operational", 
      lastMaintenance: "2024-01-18",
      nextMaintenance: "2024-03-18",
      condition: "Excellent",
      uptime: 98.1
    },
    {
      id: "LATHE-005",
      name: "Lathe Machine #5",
      type: "Lathe",
      location: "Machining Center",
      status: "operational",
      lastMaintenance: "2024-01-22",
      nextMaintenance: "2024-04-22", 
      condition: "Good",
      uptime: 92.3
    },
    {
      id: "WELD-008",
      name: "Welding Station #8",
      type: "Welding Equipment",
      location: "Fabrication Area",
      status: "maintenance",
      lastMaintenance: "2024-01-20",
      nextMaintenance: "2024-01-24",
      condition: "Fair",
      uptime: 88.7
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Operational</Badge>;
      case "maintenance":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Maintenance</Badge>;
      case "critical":
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Critical</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "maintenance":
        return <Wrench className="w-4 h-4 text-warning" />;
      case "critical":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const filteredMachines = machines.filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Machine Registry</h1>
          <p className="text-muted-foreground">Manage and monitor all equipment</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Machine
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search machines, types, or locations..."
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

      {/* Machine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMachines.map((machine) => (
          <Card key={machine.id} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(machine.status)}
                  <div>
                    <h3 className="font-semibold">{machine.name}</h3>
                    <p className="text-sm text-muted-foreground">{machine.id}</p>
                  </div>
                </div>
                {getStatusBadge(machine.status)}
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Type:</span>
                  <span>{machine.type}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span>{machine.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Next Maintenance:</span>
                  <span>{new Date(machine.nextMaintenance).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                  <p className="text-lg font-semibold">{machine.uptime}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Condition</p>
                  <p className={`text-lg font-semibold ${
                    machine.condition === 'Excellent' ? 'text-success' :
                    machine.condition === 'Good' ? 'text-primary' :
                    machine.condition === 'Fair' ? 'text-warning' :
                    'text-destructive'
                  }`}>
                    {machine.condition}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Schedule Maintenance
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Fleet Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{machines.length}</p>
            <p className="text-sm text-muted-foreground">Total Machines</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">
              {machines.filter(m => m.status === 'operational').length}
            </p>
            <p className="text-sm text-muted-foreground">Operational</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">
              {machines.filter(m => m.status === 'maintenance').length}
            </p>
            <p className="text-sm text-muted-foreground">In Maintenance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">
              {machines.filter(m => m.status === 'critical').length}
            </p>
            <p className="text-sm text-muted-foreground">Critical</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Machines;