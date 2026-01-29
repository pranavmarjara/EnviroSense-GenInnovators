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
    <div className="flex flex-col h-full py-6 space-y-8 bg-background/80 backdrop-blur-xl">
      <div className="px-6 flex items-center gap-3">
        <div className="bg-primary/20 p-2.5 rounded-2xl shadow-inner shadow-primary/20">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <span className="text-2xl font-display font-bold text-foreground tracking-tight">
          Zubox
        </span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
              isActive 
                ? "bg-primary/10 text-primary shadow-sm border border-primary/20" 
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )} onClick={() => setOpen(false)}>
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/5 rounded-2xl -z-10"
                />
              )}
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
              <span className="font-semibold tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-primary/20 to-secondary/30 border border-primary/20 rounded-3xl p-5 text-foreground shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Daily Wisdom</p>
          </div>
          <p className="text-sm leading-relaxed font-medium opacity-90">Reducing meat consumption by 1 day a week saves 1,100 gallons of water.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-30 bg-background border-r border-border/10">
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
