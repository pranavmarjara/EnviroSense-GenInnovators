import { PageHeader } from "@/components/PageHeader";
import { usePlantRecommendations } from "@/hooks/use-plants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPlantRecommendationsSchema, type GetPlantRecommendationsRequest } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Sprout, Droplets, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function PlantRecommendations() {
  const { mutate, isPending, data: plants } = usePlantRecommendations();
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<GetPlantRecommendationsRequest>({
    resolver: zodResolver(getPlantRecommendationsSchema),
    defaultValues: {
      zip: "",
      weather: "moderate",
      disease: "",
    },
  });

  const onSubmit = (data: GetPlantRecommendationsRequest) => {
    mutate(data);
    setHasSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Plant Recommendations" 
        description="Discover the perfect plants for your environment based on local weather and conditions."
      />

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Panel */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-8">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" /> 
              Filters
            </h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="90210" {...field} className="rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weather"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Climate Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select climate" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hot">Hot / Arid</SelectItem>
                          <SelectItem value="moderate">Moderate / Temperate</SelectItem>
                          <SelectItem value="cold">Cold / Alpine</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="disease"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exclude Susceptibility (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. root rot" {...field} className="rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : "Find Plants"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {!hasSearched && (
            <div className="h-96 flex flex-col items-center justify-center text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl bg-card/30">
              <Sprout className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">Enter your location details to see recommendations</p>
            </div>
          )}

          {hasSearched && isPending && (
            <div className="h-96 flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {plants?.map((plant, idx) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    {/* Dynamic unsplash image based on plant type provided by API, fallback logic */}
                    <img 
                      src={plant.image || "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400"} 
                      alt={plant.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant={
                        plant.careLevel === "Low" ? "default" : 
                        plant.careLevel === "Medium" ? "secondary" : "destructive"
                      } className="shadow-sm">
                        {plant.careLevel} Care
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="font-display font-bold text-xl text-foreground mb-1">{plant.name}</h3>
                      <p className="text-sm text-primary font-medium">{plant.type}</p>
                    </div>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sun className="w-4 h-4 text-accent" />
                        <span>{plant.sunlight}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <span>{plant.watering}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {plant.tags?.map(tag => (
                        <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {hasSearched && plants?.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No plants found for these criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
