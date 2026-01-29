import { PageHeader } from "@/components/PageHeader";
import { useBrandScore } from "@/hooks/use-brands";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Leaf, Recycle, Award } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function BrandImpact() {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  
  const { data: brand, isLoading, isError } = useBrandScore(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  const chartData = brand ? [{ name: 'Score', value: brand.score, fill: brand.score > 70 ? '#10b981' : brand.score > 40 ? '#f59e0b' : '#ef4444' }] : [];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title="Brand Impact Score" 
        description="Search for major brands to see their environmental impact rating, packaging sustainability, and eco-friendliness."
      />

      <div className="relative max-w-2xl mx-auto mb-16">
        <form onSubmit={handleSearch} className="relative">
          <Input 
            className="w-full h-16 pl-6 pr-32 rounded-full shadow-lg border-2 border-primary/20 focus:border-primary/50 text-lg bg-card transition-all"
            placeholder="Search brand (e.g. Nike, Apple, Nestle)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit" 
            className="absolute right-2 top-2 h-12 px-8 rounded-full font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!searchTerm}
          >
            Search
          </Button>
        </form>
      </div>

      <div className="min-h-[400px]">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-primary font-bold text-xl">Analyzing Brand Data...</div>
          </div>
        )}

        {isError && (
          <div className="text-center text-muted-foreground">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Could not find data for that brand.</p>
          </div>
        )}

        {!query && !brand && (
           <div className="text-center text-muted-foreground mt-20">
             <div className="inline-flex gap-4 opacity-30 mb-4">
                <Leaf className="w-12 h-12" />
                <Recycle className="w-12 h-12" />
                <Award className="w-12 h-12" />
             </div>
             <p className="text-lg">Enter a brand name to reveal its impact.</p>
           </div>
        )}

        {brand && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Score Visual */}
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">{brand.name}</h2>
              <div className="h-64 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      innerRadius="80%" 
                      outerRadius="100%" 
                      barSize={20} 
                      data={chartData} 
                      startAngle={90} 
                      endAngle={-270}
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                      />
                    </RadialBarChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-6xl font-bold font-display">{brand.score}</span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">Eco Score</span>
                 </div>
              </div>
              <p className={`mt-4 font-medium px-4 py-1 rounded-full ${brand.score > 70 ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                {brand.ecoRating} Rating
              </p>
            </div>

            {/* Details Cards */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-primary/20 rounded-xl text-primary">
                     <Recycle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Packaging Impact</h4>
                    <p className="text-muted-foreground text-sm">Materials & Recyclability</p>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed pl-16">
                  {brand.packagingImpact}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-primary/20 rounded-xl text-primary">
                     <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Eco Rating</h4>
                    <p className="text-muted-foreground text-sm">Overall sustainability</p>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed pl-16">
                  Rated as <strong>{brand.ecoRating}</strong> based on carbon footprint, water usage, and supply chain ethics.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
