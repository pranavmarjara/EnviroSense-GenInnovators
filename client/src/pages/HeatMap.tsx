import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { ThermometerSun } from "lucide-react";

// Generate a grid of "heat" values
const GRID_SIZE = 10;
const generateHeatData = () => {
  const data = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    // Generate some Perlin-noise-ish clusters
    const x = i % GRID_SIZE;
    const y = Math.floor(i / GRID_SIZE);
    
    // Simple distance-based heat center at (3,3) and (7,8)
    const dist1 = Math.sqrt(Math.pow(x - 3, 2) + Math.pow(y - 3, 2));
    const dist2 = Math.sqrt(Math.pow(x - 7, 2) + Math.pow(y - 8, 2));
    
    let heat = 0;
    heat += Math.max(0, 10 - dist1 * 2); 
    heat += Math.max(0, 8 - dist2 * 1.5);
    
    // Normalize roughly 0-10
    data.push(Math.min(10, heat));
  }
  return data;
};

const heatData = generateHeatData();

const getHeatColor = (value: number) => {
  if (value > 8) return "bg-red-500";
  if (value > 6) return "bg-orange-500";
  if (value > 4) return "bg-yellow-400";
  if (value > 2) return "bg-green-400";
  return "bg-emerald-600";
};

export default function HeatMap() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader 
        title="Regional Heat Map" 
        description="Visualize temperature zones and urban heat islands in your area to understand local climate micro-patterns."
      />

      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 aspect-square max-w-xl mx-auto relative bg-secondary/20 rounded-xl overflow-hidden p-4">
            <div className="grid grid-cols-10 grid-rows-10 gap-1 w-full h-full">
              {heatData.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.005 }}
                  className={`${getHeatColor(val)} rounded-sm shadow-sm cursor-pointer hover:brightness-110 transition-all`}
                  title={`Heat Index: ${val.toFixed(1)}`}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                />
              ))}
            </div>
            
            {/* Map Labels Overlay */}
            <div className="absolute top-8 left-8 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm pointer-events-none">
              Downtown
            </div>
            <div className="absolute bottom-12 right-12 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm pointer-events-none">
              Industrial Park
            </div>
          </div>

          <div className="lg:w-72 flex flex-col justify-center space-y-8">
            <div className="bg-secondary/50 rounded-2xl p-6">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <ThermometerSun className="w-5 h-5 text-rose-500" />
                Legend
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-red-500" />
                  <span className="text-sm">Extreme Heat (Urban Island)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-orange-500" />
                  <span className="text-sm">High Heat</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-yellow-400" />
                  <span className="text-sm">Moderate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-green-400" />
                  <span className="text-sm">Cool</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-emerald-600" />
                  <span className="text-sm">Optimal / Green Zone</span>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground text-sm leading-relaxed">
              <p>
                <strong>Analysis:</strong> The downtown area exhibits typical Urban Heat Island effects due to concrete density. 
                The southeast industrial sector also shows elevated temperatures.
              </p>
              <p className="mt-4">
                <strong>Recommendation:</strong> Increasing green roof coverage in red zones could lower ambient temperatures by up to 5°F.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
