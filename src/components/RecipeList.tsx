import { useState, useMemo } from "react";
import RecipeCard from "./RecipeCard";
import RecipeDetail from "./RecipeDetail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import recipesData from "@/data/recipes.json";

interface RecipeListProps {
  ingredients: string[];
}

const RecipeList = ({ ingredients }: RecipeListProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [dietaryFilter, setDietaryFilter] = useState<string>("all");

  // Calculate match percentage for each recipe
  const recipesWithMatches = useMemo(() => {
    if (ingredients.length === 0) return [];

    return recipesData
      .map((recipe) => {
        const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase());
        const matchedIngredients = ingredients.filter(ing =>
          recipeIngredients.some(recIng => recIng.includes(ing) || ing.includes(recIng))
        );
        const matchPercentage = Math.round((matchedIngredients.length / recipeIngredients.length) * 100);
        
        return { ...recipe, matchPercentage };
      })
      .filter(recipe => recipe.matchPercentage > 20) // Only show recipes with >20% match
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [ingredients]);

  // Apply dietary filter
  const filteredRecipes = useMemo(() => {
    if (dietaryFilter === "all") return recipesWithMatches;
    return recipesWithMatches.filter(recipe =>
      recipe.dietary.includes(dietaryFilter)
    );
  }, [recipesWithMatches, dietaryFilter]);

  const dietaryOptions = ["all", "vegetarian", "vegan", "gluten-free"];

  if (ingredients.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto glass-card p-8 rounded-3xl">
            <p className="text-muted-foreground">
              Add some ingredients to discover amazing recipes!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Perfect Recipes for You
            </h2>
            <p className="text-muted-foreground">
              Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} matching your ingredients
            </p>

            {/* Dietary Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {dietaryOptions.map((option) => (
                <Button
                  key={option}
                  variant={dietaryFilter === option ? "default" : "outline"}
                  onClick={() => setDietaryFilter(option)}
                  className={dietaryFilter === option ? "glow-effect" : "glass-card"}
                >
                  {option === "all" ? "All Recipes" : option}
                </Button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  matchPercentage={recipe.matchPercentage}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center glass-card p-8 rounded-3xl">
              <p className="text-muted-foreground">
                No {dietaryFilter !== "all" && dietaryFilter} recipes found with your current ingredients.
                Try adding more ingredients or changing the dietary filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <RecipeDetail
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </section>
  );
};

export default RecipeList;
