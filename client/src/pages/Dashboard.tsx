import { Link } from "wouter";
import { ArrowRight, Leaf, Sun, BarChart3, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CARDS = [
  {
    title: "Unique experience",
    description: "We will show you the wonders of nature from an uncommon perspective.",
    href: "/plants",
    icon: Leaf,
    id: "01"
  },
  {
    title: "Comfortable setting",
    description: "Luxury eco-lodges designed for harmony and complete unity.",
    href: "/solar",
    icon: Sun,
    id: "02"
  },
  {
    title: "Vehicle free zone",
    description: "Pure environment with no vehicles, just peaceful serene atmosphere.",
    href: "/brands",
    icon: BarChart3,
    id: "03"
  }
];

export default function Dashboard() {
  return (
    <div className="w-full h-full space-y-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[3rem] overflow-hidden min-h-[70vh] flex flex-col justify-end p-12 md:p-20 shadow-2xl border border-white/5 group"
      >
        <div 
          className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: 'url("/images/hero-nature.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a14] via-[#0a1a14]/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-white/50 text-xs font-bold uppercase tracking-[0.4em] mb-8">
              ABOUT US
            </span>
            <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-10 leading-[0.85] tracking-tight">
              Get closer <br /> to nature
            </h1>
            <Link href="/plants" className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-all group/link text-lg font-medium">
              Check our values <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 px-4">
        <div className="lg:col-span-8">
          <div className="mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-6 block">FEATURES</span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight max-w-xl">
                We make nature accessible
              </h2>
              <p className="text-white/40 max-w-[280px] text-base leading-relaxed font-medium">
                Welcome to the world of impressive beauty, harmony, and respect to nature.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={card.href} className="group block h-full p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                  <span className="text-primary font-display text-2xl font-bold mb-8 block">{card.id}</span>
                  <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-white/40 text-base leading-relaxed">
                    {card.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-10 rounded-[3rem] text-[#0a1a14] shadow-2xl relative overflow-hidden group flex flex-col items-center text-center h-full min-h-[450px] justify-center"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Leaf className="w-32 h-32 rotate-45" />
            </div>

            <Avatar className="w-24 h-24 mb-8 border-4 border-[#0a1a14]/5 shadow-xl">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            
            <div className="flex gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-[#0a1a14] text-[#0a1a14]" />
              ))}
            </div>
            
            <h4 className="text-2xl font-display font-bold mb-1">Scarlett Miles</h4>
            <p className="text-xs text-[#0a1a14]/40 font-bold uppercase tracking-widest mb-8">Trip date: Jan 16, 2026</p>
            
            <p className="text-lg leading-relaxed text-[#0a1a14]/80 font-medium italic">
              "The journey I got with Zubox was an absolutely unique experience, something I'd never tried before. Comfortable lodge, quiet environment, no vehicles."
            </p>
          </motion.div>

          <div className="bg-[#0a1a14] rounded-[3rem] p-10 border border-white/5 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-white/5 transition-all duration-500 hover:scale-[0.98]">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10">
              <ArrowRight className="w-10 h-10 text-white/30 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-white/60 text-lg font-bold tracking-tight">Explore more stories</p>
          </div>
        </div>
      </div>
    </div>
  );
}
