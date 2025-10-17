import { Clock, ChefHat, Flame, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  difficulty: string;
  cookTime: number;
  servings: number;
  calories: number;
  dietary: string[];
  ingredients: Array<{ name: string; quantity: number; unit: string }>;
}

interface RecipeCardProps {
  recipe: Recipe;
  matchPercentage: number;
  onClick: () => void;
}

const RecipeCard = ({ recipe, matchPercentage, onClick }: RecipeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'medium':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'hard':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className="glass-card hover:glow-effect transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {recipe.title}
            </h3>
            {matchPercentage > 0 && (
              <Badge variant="outline" className="shrink-0 border-primary/50 text-primary glow-effect">
                {matchPercentage}% Match
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{recipe.cuisine} Cuisine</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ChefHat className="w-4 h-4 text-secondary" />
            <Badge className={getDifficultyColor(recipe.difficulty)} variant="outline">
              {recipe.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Flame className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">{recipe.calories} cal</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{recipe.servings} servings</span>
          </div>
        </div>

        {/* Dietary tags */}
        {recipe.dietary.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.dietary.map((tag) => (
              <Badge key={tag} variant="secondary" className="glass-card text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Button 
          className="w-full bg-primary hover:bg-primary/90 glow-effect"
          onClick={onClick}
        >
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
