import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Dashboard from "@/pages/Dashboard";
import Machines from "@/pages/Machines";
import Maintenance from "@/pages/Maintenance";
import Schedule from "@/pages/Schedule";
import Technicians from "@/pages/Technicians";
import Reports from "@/pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen bg-background">
          <div className="w-64 flex-shrink-0">
            <Navigation />
          </div>
          <main className="flex-1 p-8 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/machines" element={<Machines />} />
              <Route path="/maintenance" element={<Maintenance />} />
              
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/technicians" element={<Technicians />} />
              <Route path="/reports" element={<Reports />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
