import { PageHeader } from "@/components/PageHeader";
import { useSolarCalculator } from "@/hooks/use-solar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateSolarSchema, type CalculateSolarRequest } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, SunMedium, CheckCircle2, XCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function SolarCalculator() {
  const { mutate, isPending, data: result } = useSolarCalculator();

  const form = useForm<CalculateSolarRequest>({
    resolver: zodResolver(calculateSolarSchema),
    defaultValues: {
      zip: "",
      dailyKwh: 0,
    },
  });

  const onSubmit = (data: CalculateSolarRequest) => {
    mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title="Solar Calculator" 
        description="Estimate your potential energy savings and feasibility of solar panel installation."
      />

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg border-border/50">
          <CardContent className="p-6">
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" /> 
              Enter Usage Details
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
                        <Input placeholder="90210" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dailyKwh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avg Daily Usage (kWh)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="29" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">Check your latest electricity bill for this number.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 text-lg shadow-lg shadow-accent/20"
                >
                  {isPending ? (
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  ) : "Calculate Potential"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {!result && !isPending && (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-secondary/30 rounded-3xl border border-dashed border-border">
              <SunMedium className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Fill out the form to see your personalized solar estimate.</p>
            </div>
          )}

          {isPending && (
            <div className="h-full min-h-[300px] flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className={`p-8 rounded-3xl text-white shadow-xl ${result.worthIt ? 'bg-emerald-600' : 'bg-orange-500'}`}>
                <div className="flex items-center gap-4 mb-4">
                  {result.worthIt ? (
                    <CheckCircle2 className="w-10 h-10" />
                  ) : (
                    <XCircle className="w-10 h-10" />
                  )}
                  <h2 className="text-3xl font-display font-bold">
                    {result.worthIt ? "Good Investment!" : "Not Recommended"}
                  </h2>
                </div>
                <p className="opacity-90 text-lg leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {result.panels && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Suggested Panels</p>
                    <p className="text-4xl font-display font-bold text-foreground mt-2">{result.panels}</p>
                  </div>
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Est. Annual Savings</p>
                    <p className="text-4xl font-display font-bold text-emerald-600 mt-2">
                      ₹{Math.floor(result.panels * 120 * 83)}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
