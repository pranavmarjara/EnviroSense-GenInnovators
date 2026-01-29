import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";
import { FloatingAqiWidget } from "@/components/FloatingAqiWidget";

// Pages
import Dashboard from "@/pages/Dashboard";
import PlantRecommendations from "@/pages/PlantRecommendations";
import SolarCalculator from "@/pages/SolarCalculator";
import HeatMap from "@/pages/HeatMap";
import BrandImpact from "@/pages/BrandImpact";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/plants" component={PlantRecommendations} />
      <Route path="/solar" component={SolarCalculator} />
      <Route path="/heat-map" component={HeatMap} />
      <Route path="/brands" component={BrandImpact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex min-h-screen bg-background text-foreground font-body selection:bg-primary/20 overflow-x-hidden">
          <div 
            className="fixed inset-0 z-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'url("/images/hero-nature.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(100px)'
            }}
          />
          <Sidebar />
          
          <main className="flex-1 md:ml-64 relative z-10">
            <FloatingAqiWidget />
            
            <div className="container mx-auto p-4 md:p-8 pt-20 md:pt-8 min-h-screen">
               <Router />
            </div>
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
