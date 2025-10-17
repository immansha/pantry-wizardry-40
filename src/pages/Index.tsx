import { useState } from "react";
import Hero from "@/components/Hero";
import IngredientInput from "@/components/IngredientInput";
import RecipeList from "@/components/RecipeList";

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);

  return (
    <div className="min-h-screen">
      <Hero />
      <IngredientInput 
        ingredients={ingredients} 
        onIngredientsChange={setIngredients} 
      />
      <RecipeList ingredients={ingredients} />
    </div>
  );
};

export default Index;
