import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Settings, 
  Wrench, 
  Calendar,
  Users,
  BarChart3
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      path: "/machines",
      label: "Machines",
      icon: Settings
    },
    {
      path: "/maintenance",
      label: "Maintenance",
      icon: Wrench
    },
    {
      path: "/schedule",
      label: "Schedule",
      icon: Calendar
    },
    {
      path: "/technicians",
      label: "Technicians",
      icon: Users
    },
    {
      path: "/reports",
      label: "Reports",
      icon: BarChart3
    }
  ];

  return (
    <nav className="bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">TIMELEC</h1>
            <p className="text-sm text-sidebar-foreground/70">Maintenance System</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    w-full justify-start gap-3 h-12 text-left
                    ${isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;