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
    <div className="max-w-7xl mx-auto space-y-12">
      <section className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] flex flex-col justify-end p-8 md:p-16 border border-white/10 shadow-2xl">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/hero-nature.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md border border-primary/20">
              Sustainable Living
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Get closer <br /> to nature
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed font-medium">
              Monitor your environmental footprint and discover innovative ways to cultivate a sustainable lifestyle in harmony with the planet.
            </p>
            <Link href="/plants" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/20">
              Explore Now <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {CARDS.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <Link href={card.href} className={`
              group relative block h-full p-10 rounded-[2.5rem] overflow-hidden border border-white/5
              bg-secondary/20 backdrop-blur-md hover:bg-secondary/30 hover:-translate-y-2 
              transition-all duration-500
            `}>
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center mb-8 
                ${card.color} text-white shadow-xl shadow-black/20
              `}>
                <card.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-3xl font-display font-bold text-foreground mb-4 tracking-tight">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {card.description}
              </p>

              <div className="absolute bottom-10 right-10 w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                <ArrowRight className="w-6 h-6" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-secondary/10 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/5 shadow-inner"
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-2xl rotate-3 group hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000" 
              alt="Nature conservation" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-display font-bold mb-4 tracking-tight">Eco Insight</h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl opacity-90">
              Planting a single tree can absorb up to 48 pounds of carbon dioxide per year. By utilizing our 
              Plant Recommender, you can find the most effective species for your specific climate zone to maximize this impact.
            </p>
            <Link href="/plants" className="inline-flex items-center text-primary text-lg font-bold mt-8 hover:gap-3 transition-all">
              Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
