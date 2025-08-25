import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download,
  Calendar,
  Filter,
  Settings,
  Clock,
  DollarSign,
  AlertTriangle
} from "lucide-react";

const Reports = () => {
  const reportMetrics = [
    {
      title: "Overall Equipment Effectiveness (OEE)",
      value: "87.3%",
      change: "+2.1%",
      trend: "up",
      description: "Average across all machines this month"
    },
    {
      title: "Mean Time Between Failures (MTBF)",
      value: "156 hrs",
      change: "+12 hrs",
      trend: "up", 
      description: "Improved from last month"
    },
    {
      title: "Mean Time To Repair (MTTR)",
      value: "2.4 hrs",
      change: "-0.3 hrs",
      trend: "up",
      description: "Faster resolution times"
    },
    {
      title: "Maintenance Costs",
      value: "$24,580",
      change: "-8.2%",
      trend: "up",
      description: "Reduced costs this month"
    }
  ];

  const machineReports = [
    {
      machine: "CNC Milling Machine #7",
      uptime: 94.5,
      mtbf: 180,
      mttr: 2.1,
      maintenanceCost: 3200,
      status: "Good",
      lastIssue: "5 days ago"
    },
    {
      machine: "Industrial Robot #3", 
      uptime: 65.8,
      mtbf: 95,
      mttr: 4.2,
      maintenanceCost: 5800,
      status: "Poor",
      lastIssue: "Today"
    },
    {
      machine: "Hydraulic Press #12",
      uptime: 98.1,
      mtbf: 220,
      mttr: 1.8,
      maintenanceCost: 1900,
      status: "Excellent", 
      lastIssue: "12 days ago"
    },
    {
      machine: "Conveyor Belt System A",
      uptime: 87.2,
      mtbf: 140,
      mttr: 2.8,
      maintenanceCost: 2750,
      status: "Fair",
      lastIssue: "3 days ago"
    }
  ];

  const maintenanceTypes = [
    { type: "Preventive", count: 28, percentage: 45, cost: 12300 },
    { type: "Corrective", count: 18, percentage: 29, cost: 8900 },
    { type: "Emergency", count: 8, percentage: 13, cost: 6200 },
    { type: "Inspection", count: 8, percentage: 13, cost: 1800 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "text-success";
      case "Good":
        return "text-primary";
      case "Fair":
        return "text-warning";
      case "Poor":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Reports</h1>
          <p className="text-muted-foreground">Analytics and insights for equipment performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              <div>
                <p className="text-3xl font-bold">{metric.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Maintenance Types Breakdown */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Maintenance Types (This Month)
          </h3>
          <div className="space-y-4">
            {maintenanceTypes.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.type}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">{item.count} tasks</span>
                    <p className="text-xs text-muted-foreground">${item.cost.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.type === 'Preventive' ? 'bg-success' :
                      item.type === 'Corrective' ? 'bg-warning' :
                      item.type === 'Emergency' ? 'bg-destructive' :
                      'bg-accent'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{item.percentage}% of total maintenance</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Issues */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Recurring Issues
          </h3>
          <div className="space-y-4">
            {[
              { issue: "Hydraulic fluid leaks", frequency: 8, impact: "High", machines: 3 },
              { issue: "Belt tension problems", frequency: 6, impact: "Medium", machines: 2 },
              { issue: "Sensor calibration", frequency: 5, impact: "Low", machines: 4 },
              { issue: "Motor overheating", frequency: 4, impact: "High", machines: 2 },
              { issue: "Filter replacements", frequency: 12, impact: "Low", machines: 8 }
            ].map((issue, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="font-medium">{issue.issue}</p>
                  <p className="text-sm text-muted-foreground">
                    {issue.frequency} occurrences • {issue.machines} machines affected
                  </p>
                </div>
                <Badge className={
                  issue.impact === 'High' ? 'bg-destructive/10 text-destructive' :
                  issue.impact === 'Medium' ? 'bg-warning/10 text-warning' :
                  'bg-success/10 text-success'
                }>
                  {issue.impact}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Machine Performance Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Machine Performance Report
          </h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium text-muted-foreground">Machine</th>
                <th className="text-center p-3 font-medium text-muted-foreground">Uptime</th>
                <th className="text-center p-3 font-medium text-muted-foreground">MTBF (hrs)</th>
                <th className="text-center p-3 font-medium text-muted-foreground">MTTR (hrs)</th>
                <th className="text-center p-3 font-medium text-muted-foreground">Maint. Cost</th>
                <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-center p-3 font-medium text-muted-foreground">Last Issue</th>
              </tr>
            </thead>
            <tbody>
              {machineReports.map((machine, index) => (
                <tr key={index} className="border-b hover:bg-muted/10">
                  <td className="p-3 font-medium">{machine.machine}</td>
                  <td className="p-3 text-center">
                    <span className={`font-medium ${
                      machine.uptime >= 95 ? 'text-success' :
                      machine.uptime >= 85 ? 'text-warning' :
                      'text-destructive'
                    }`}>
                      {machine.uptime}%
                    </span>
                  </td>
                  <td className="p-3 text-center">{machine.mtbf}</td>
                  <td className="p-3 text-center">{machine.mttr}</td>
                  <td className="p-3 text-center">${machine.maintenanceCost.toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <span className={`font-medium ${getStatusColor(machine.status)}`}>
                      {machine.status}
                    </span>
                  </td>
                  <td className="p-3 text-center text-sm text-muted-foreground">
                    {machine.lastIssue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cost Analysis */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Cost Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">$18,200</p>
            <p className="text-sm text-muted-foreground">Labor Costs</p>
            <p className="text-xs text-success">-12% vs last month</p>
          </div>
          <div className="text-center p-4 bg-accent/5 rounded-lg">
            <Settings className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">$6,380</p>
            <p className="text-sm text-muted-foreground">Parts & Materials</p>
            <p className="text-xs text-destructive">+5% vs last month</p>
          </div>
          <div className="text-center p-4 bg-warning/5 rounded-lg">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-warning" />
            <p className="text-2xl font-bold">$4,200</p>
            <p className="text-sm text-muted-foreground">Emergency Repairs</p>
            <p className="text-xs text-success">-25% vs last month</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;