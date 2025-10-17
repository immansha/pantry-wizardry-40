import { Sparkles, Camera, ChefHat } from "lucide-react";
import heroImage from "@/assets/hero-ingredients.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-[var(--gradient-radial)] animate-pulse-slow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      {/* Hero image with overlay */}
      <div className="absolute inset-0 opacity-20">
        <img src={heroImage} alt="Fresh ingredients" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-6 glass-card px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Turn Your <span className="text-gradient">Ingredients</span>
            <br />
            Into Amazing <span className="text-gradient">Recipes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Upload a photo or select your ingredients, and let our AI chef create personalized recipes just for you
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-3 hover:glow-effect transition-all duration-300">
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-sm">AI Photo Detection</span>
            </div>
            <div className="glass-card p-4 rounded-2xl flex items-center gap-3 hover:glow-effect transition-all duration-300">
              <ChefHat className="w-5 h-5 text-secondary" />
              <span className="text-sm">Smart Recipe Matching</span>
            </div>
            <div className="glass-card p-4 rounded-2xl flex items-center gap-3 hover:glow-effect transition-all duration-300">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm">Nutrition Info</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
