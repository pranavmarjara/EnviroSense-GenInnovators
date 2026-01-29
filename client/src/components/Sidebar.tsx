import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Leaf, 
  SunMedium, 
  ThermometerSun, 
  ShoppingBag, 
  Menu
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/plants", label: "Plants", icon: Leaf },
  { href: "/solar", label: "Solar Calc", icon: SunMedium },
  { href: "/heat-map", label: "Heat Map", icon: ThermometerSun },
  { href: "/brands", label: "Brand Impact", icon: ShoppingBag },
];

export function Sidebar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full py-4 space-y-8">
      <div className="px-6 flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-display font-bold text-foreground">
          EnviroSense
        </span>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )} onClick={() => setOpen(false)}>
              <item.icon className={cn("w-5 h-5", isActive ? "text-current" : "text-muted-foreground group-hover:text-primary")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-4 text-primary-foreground shadow-xl">
          <p className="text-sm font-medium opacity-90">Daily Tip</p>
          <p className="text-xs mt-1 leading-relaxed">Reducing meat consumption by 1 day a week saves 1,100 gallons of water.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-30 bg-background border-r border-border/50">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-md">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
