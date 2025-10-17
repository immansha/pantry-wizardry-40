import { X, Clock, ChefHat, Flame, Users, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  difficulty: string;
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  dietary: string[];
  ingredients: Array<{ name: string; quantity: number; unit: string }>;
  steps: string[];
}

interface RecipeDetailProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

const RecipeDetail = ({ recipe, open, onClose }: RecipeDetailProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl glass-card border-primary/20 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient pr-8">
            {recipe.title}
          </DialogTitle>
          <p className="text-muted-foreground">{recipe.cuisine} Cuisine</p>
        </DialogHeader>

        <ScrollArea className="h-full max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-card p-3 rounded-xl flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-semibold">{recipe.cookTime} min</p>
                </div>
              </div>
              <div className="glass-card p-3 rounded-xl flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="font-semibold capitalize">{recipe.difficulty}</p>
                </div>
              </div>
              <div className="glass-card p-3 rounded-xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Calories</p>
                  <p className="font-semibold">{recipe.calories}</p>
                </div>
              </div>
              <div className="glass-card p-3 rounded-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Servings</p>
                  <p className="font-semibold">{recipe.servings}</p>
                </div>
              </div>
            </div>

            {/* Nutrition Info */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-semibold mb-3">Nutrition per Serving</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{recipe.protein}g</p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{recipe.carbs}g</p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">{recipe.fats}g</p>
                  <p className="text-xs text-muted-foreground">Fats</p>
                </div>
              </div>
            </div>

            {/* Dietary Tags */}
            {recipe.dietary.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recipe.dietary.map((tag) => (
                  <Badge key={tag} variant="secondary" className="glass-card">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <Separator />

            {/* Ingredients */}
            <div>
              <h3 className="text-xl font-bold mb-4">Ingredients</h3>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 glass-card rounded-lg hover:glow-effect transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span className="flex-1">
                      <span className="font-medium">{ingredient.quantity} {ingredient.unit}</span>
                      {" "}
                      <span className="text-muted-foreground">{ingredient.name}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-bold mb-4">Instructions</h3>
              <div className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold glow-effect">
                      {index + 1}
                    </div>
                    <p className="flex-1 text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
