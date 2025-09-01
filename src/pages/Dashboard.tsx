import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import DashboardCard from "@/components/DashboardCard";
import { 
  Settings, 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Plus,
  Calendar,
  Filter,
  BarChart3, 
  GitBranch
} from "lucide-react";
import { format } from "date-fns";
import industrialHero from "@/assets/industrial-hero.jpg";

interface Breakdown {
  id: string;
  equipmentName: string;
  date: string;
  description: string;
  cause: number; // 0-5 for 5M method
  createdAt: string;
}

const CAUSES = {
  0: { name: "Fausse alerte", color: "#94a3b8", icon: "⚪" },
  1: { name: "Méthode", color: "#3b82f6", icon: "📋" },
  2: { name: "Milieu", color: "#10b981", icon: "🌍" },
  3: { name: "Matière", color: "#f59e0b", icon: "🧱" },
  4: { name: "Main-d'œuvre", color: "#ef4444", icon: "👥" },
  5: { name: "Moyens", color: "#8b5cf6", icon: "⚙️" }
};

const Dashboard = () => {
  const [breakdowns, setBreakdowns] = useState<Breakdown[]>([
    {
      id: "BD-001",
      equipmentName: "CNC Machine #7",
      date: "2024-01-20",
      description: "Machine stopped working during production cycle",
      cause: 3,
      createdAt: "2024-01-20T10:30:00"
    },
    {
      id: "BD-002", 
      equipmentName: "Conveyor Belt A",
      date: "2024-01-22",
      description: "Belt slipping causing production delays",
      cause: 1,
      createdAt: "2024-01-22T14:15:00"
    },
    {
      id: "BD-003",
      equipmentName: "Hydraulic Press #3",
      date: "2024-01-23",
      description: "Pressure drop in hydraulic system",
      cause: 3,
      createdAt: "2024-01-23T09:45:00"
    }
  ]);

  const [filterCause, setFilterCause] = useState<string>("all");
  const [formData, setFormData] = useState({
    equipmentName: "",
    date: "",
    description: "",
    cause: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.equipmentName || !formData.date || !formData.description || !formData.cause) {
      return;
    }

    const newBreakdown: Breakdown = {
      id: `BD-${String(breakdowns.length + 1).padStart(3, '0')}`,
      equipmentName: formData.equipmentName,
      date: formData.date,
      description: formData.description,
      cause: parseInt(formData.cause),
      createdAt: new Date().toISOString()
    };

    setBreakdowns([...breakdowns, newBreakdown]);
    setFormData({ equipmentName: "", date: "", description: "", cause: "" });
  };

  const filteredBreakdowns = filterCause === "all" 
    ? breakdowns 
    : breakdowns.filter(b => b.cause.toString() === filterCause);

  // Prepare pie chart data
  const chartData = Object.entries(
    breakdowns.reduce((acc, breakdown) => {
      acc[breakdown.cause] = (acc[breakdown.cause] || 0) + 1;
      return acc;
    }, {} as Record<number, number>)
  ).map(([cause, count]) => ({
    name: CAUSES[parseInt(cause) as keyof typeof CAUSES].name,
    value: count,
    color: CAUSES[parseInt(cause) as keyof typeof CAUSES].color
  }));

  const getCauseBadge = (cause: number) => {
    const causeInfo = CAUSES[cause as keyof typeof CAUSES];
    return (
      <Badge 
        className="gap-1" 
        style={{ 
          backgroundColor: `${causeInfo.color}20`,
          color: causeInfo.color,
          borderColor: `${causeInfo.color}40`
        }}
      >
        <span>{causeInfo.icon}</span>
        {causeInfo.name}
      </Badge>
    );
  };

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

      {/* Maintenance Dashboard - 5M Method */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Maintenance - Méthode 5M</h2>
            <p className="text-muted-foreground">Analyse des pannes selon la méthode 5M</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Aperçu
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter Panne
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Calendar className="w-4 h-4" />
              Historique
            </TabsTrigger>
            <TabsTrigger value="ishikawa" className="gap-2">
              <GitBranch className="w-4 h-4" />
              Ishikawa
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Pannes</p>
                      <p className="text-2xl font-bold">{breakdowns.length}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cette Semaine</p>
                      <p className="text-2xl font-bold">
                        {breakdowns.filter(b => 
                          new Date(b.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                        ).length}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Pie Chart */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Répartition par Cause (5M)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Recent Breakdowns */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pannes Récentes</h3>
              <div className="space-y-3">
                {breakdowns.slice(-3).reverse().map((breakdown) => (
                  <div key={breakdown.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{CAUSES[breakdown.cause as keyof typeof CAUSES].icon}</div>
                      <div>
                        <p className="font-medium">{breakdown.equipmentName}</p>
                        <p className="text-sm text-muted-foreground">{breakdown.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getCauseBadge(breakdown.cause)}
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(new Date(breakdown.date), 'dd/MM/yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Add Breakdown Tab */}
          <TabsContent value="add">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Enregistrer une Nouvelle Panne</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Nom de l'Équipement</Label>
                    <Input
                      id="equipment"
                      value={formData.equipmentName}
                      onChange={(e) => setFormData({...formData, equipmentName: e.target.value})}
                      placeholder="Ex: CNC Machine #7"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date de la Panne</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cause">Cause (Méthode 5M)</Label>
                  <Select value={formData.cause} onValueChange={(value) => setFormData({...formData, cause: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une cause" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CAUSES).map(([key, cause]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{cause.icon}</span>
                            <span>{cause.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description de la Panne</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Décrivez la panne en détail..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Enregistrer la Panne
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Historique des Pannes</h3>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <Select value={filterCause} onValueChange={setFilterCause}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrer par cause" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les causes</SelectItem>
                      {Object.entries(CAUSES).map(([key, cause]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{cause.icon}</span>
                            <span>{cause.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Équipement</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Cause</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBreakdowns.map((breakdown) => (
                      <TableRow key={breakdown.id}>
                        <TableCell className="font-medium">{breakdown.id}</TableCell>
                        <TableCell>{breakdown.equipmentName}</TableCell>
                        <TableCell>{format(new Date(breakdown.date), 'dd/MM/yyyy')}</TableCell>
                        <TableCell>{getCauseBadge(breakdown.cause)}</TableCell>
                        <TableCell className="max-w-xs truncate">{breakdown.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Ishikawa Diagram Tab */}
          <TabsContent value="ishikawa">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Diagramme d'Ishikawa (5M)</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {Object.entries(CAUSES).filter(([key]) => key !== "0").map(([key, cause]) => {
                  const relatedBreakdowns = breakdowns.filter(b => b.cause.toString() === key);
                  return (
                    <Card key={key} className="p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: cause.color }}
                        />
                        <h4 className="font-semibold flex items-center gap-1">
                          <span>{cause.icon}</span>
                          {cause.name}
                        </h4>
                        <Badge variant="secondary">{relatedBreakdowns.length}</Badge>
                      </div>
                      <div className="space-y-2">
                        {relatedBreakdowns.slice(0, 3).map((breakdown) => (
                          <div key={breakdown.id} className="text-sm p-2 bg-muted/20 rounded">
                            <p className="font-medium">{breakdown.equipmentName}</p>
                            <p className="text-muted-foreground text-xs">{breakdown.description}</p>
                          </div>
                        ))}
                        {relatedBreakdowns.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{relatedBreakdowns.length - 3} autres pannes...
                          </p>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
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