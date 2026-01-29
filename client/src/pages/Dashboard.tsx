import { PageHeader } from "@/components/PageHeader";
import { Link } from "wouter";
import { ArrowRight, Leaf, Sun, BarChart3, CloudRain } from "lucide-react";
import { motion } from "framer-motion";

const CARDS = [
  {
    title: "Plant Recommender",
    description: "Find the perfect flora for your local ecosystem.",
    href: "/plants",
    icon: Leaf,
    color: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-500/5"
  },
  {
    title: "Solar Calculator",
    description: "Analyze potential savings from solar energy.",
    href: "/solar",
    icon: Sun,
    color: "bg-amber-500",
    gradient: "from-amber-500/20 to-amber-500/5"
  },
  {
    title: "Brand Impact",
    description: "Check the eco-score of major corporations.",
    href: "/brands",
    icon: BarChart3,
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-blue-500/5"
  },
  {
    title: "Heat Map",
    description: "Visualize temperature zones in your region.",
    href: "/heat-map",
    icon: CloudRain,
    color: "bg-rose-500",
    gradient: "from-rose-500/20 to-rose-500/5"
  }
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Welcome Back" 
        description="Monitor your environmental impact and explore sustainable solutions for a greener future."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {CARDS.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={card.href} className={`
              group relative block h-full p-8 rounded-3xl overflow-hidden border border-border
              bg-gradient-to-br ${card.gradient} hover:shadow-xl hover:-translate-y-1 
              transition-all duration-300
            `}>
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-6 
                ${card.color} text-white shadow-lg shadow-black/5
              `}>
                <card.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground mb-8 pr-8">
                {card.description}
              </p>

              <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-card rounded-3xl p-8 border border-border shadow-sm"
      >
        <div className="flex items-start gap-6">
          <div className="hidden sm:block w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
            {/* Using a nature Unsplash image */}
            <img 
              src="https://pixabay.com/get/g2af2ee6567108f4338d5820eab9be24f5308b6768b727406f29d2efbc8c9128eac3e0c267abcf907a4c192add5c5b9bfebe50057951b9852321fea5060b0a47c_1280.jpg" 
              alt="Nature conservation" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold mb-2">Did you know?</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Planting a single tree can absorb up to 48 pounds of carbon dioxide per year. By utilizing our 
              Plant Recommender, you can find the most effective species for your specific climate zone to maximize this impact.
            </p>
            <Link href="/plants" className="inline-flex items-center text-primary font-semibold mt-4 hover:underline">
              Start Planting <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
