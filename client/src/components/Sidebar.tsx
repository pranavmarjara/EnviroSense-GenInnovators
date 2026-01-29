import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Leaf, 
  SunMedium, 
  ThermometerSun, 
  ShoppingBag, 
  Menu,
  Search
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <div className="flex flex-col h-full py-6 bg-[#0a1a14] border-r border-white/5">
      <div className="px-6 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-xl">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-display font-bold text-white tracking-tight">
            ZUBOX
          </span>
        </div>
        <Button size="icon" variant="ghost" className="text-white/50 hover:text-white">
          <Search className="w-5 h-5" />
        </Button>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group overflow-hidden",
              isActive 
                ? "text-white" 
                : "text-white/40 hover:text-white"
            )} onClick={() => setOpen(false)}>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 z-10 transition-colors", isActive ? "text-primary" : "text-white/40 group-hover:text-primary")} />
              <span className="font-medium z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pt-6 border-t border-white/5 mt-auto">
        <div className="relative group overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:scale-[1.02]">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
           <div className="relative z-10">
             <p className="text-sm font-display font-bold text-white opacity-90">Daily Tip</p>
             <p className="text-xs mt-2 text-white/60 leading-relaxed">Reducing meat consumption by 1 day a week saves 1,100 gallons of water.</p>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-72 flex-col fixed inset-y-0 z-30 shadow-2xl">
        <NavContent />
      </aside>

      <div className="md:hidden fixed top-6 left-6 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-[#0a1a14] border-white/10 rounded-xl shadow-2xl hover:bg-white/5">
              <Menu className="w-5 h-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 border-none bg-transparent">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
