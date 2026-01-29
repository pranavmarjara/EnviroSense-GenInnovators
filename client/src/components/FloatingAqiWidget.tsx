import { useState, useEffect } from "react";
import { useAqi } from "@/hooks/use-aqi";
import { Wind, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingAqiWidget() {
  const [zip, setZip] = useState<string>("");
  const [debouncedZip, setDebouncedZip] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Simple debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedZip(zip), 500);
    return () => clearTimeout(timer);
  }, [zip]);

  const { data: aqi, isLoading, isError } = useAqi(debouncedZip);

  // Auto-open when data is loaded
  useEffect(() => {
    if (aqi) setIsOpen(true);
  }, [aqi]);

  const getStatusColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'good': return 'bg-emerald-500 text-white';
      case 'moderate': return 'bg-yellow-500 text-white';
      case 'poor': return 'bg-rose-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col items-end gap-2">
      <motion.div 
        layout
        className="bg-card/80 backdrop-blur-md border border-border shadow-xl rounded-full p-1 pl-4 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Wind className="w-4 h-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Zip Code" 
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
          className="bg-transparent border-none outline-none w-20 text-sm font-medium placeholder:text-muted-foreground/50"
        />
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <span className="text-white text-xs font-bold">{aqi?.value || '-'}</span>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && aqi && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-card border border-border shadow-2xl rounded-2xl p-4 w-64"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Current Air Quality</h4>
                <p className="text-xs text-muted-foreground">Zip: {aqi.zip}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-xs text-muted-foreground hover:text-foreground">
                Close
              </button>
            </div>
            
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: `${Math.min((aqi.value / 300) * 100, 100)}%` }}
                />
              </div>
              <span className="text-lg font-bold font-display">{aqi.value}</span>
            </div>
            
            <div className={cn("mt-3 px-3 py-1.5 rounded-lg text-xs font-bold inline-block", getStatusColor(aqi.category))}>
              {aqi.category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
