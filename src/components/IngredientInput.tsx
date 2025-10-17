import { useState } from "react";
import { Camera, Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput = ({ ingredients, onIngredientsChange }: IngredientInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const { toast } = useToast();

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim().toLowerCase())) {
      onIngredientsChange([...ingredients, inputValue.trim().toLowerCase()]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter(i => i !== ingredient));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsDetecting(true);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result as string;

        const { data, error } = await supabase.functions.invoke('detect-ingredients', {
          body: { image: base64Image }
        });

        if (error) {
          throw error;
        }

        if (data?.ingredients) {
          const newIngredients = [...new Set([...ingredients, ...data.ingredients])];
          onIngredientsChange(newIngredients);
          toast({
            title: "Ingredients detected!",
            description: `Found ${data.ingredients.length} ingredients`,
          });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error detecting ingredients:', error);
      toast({
        title: "Detection failed",
        description: "Could not detect ingredients from image",
        variant: "destructive",
      });
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            What's in Your Kitchen?
          </h2>

          <div className="glass-card p-8 rounded-3xl space-y-6">
            {/* Photo Upload */}
            <div className="text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isDetecting}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 glass-card border-2 border-primary/30 hover:border-primary hover:glow-effect"
                  disabled={isDetecting}
                  asChild
                >
                  <span>
                    {isDetecting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Detecting ingredients...
                      </>
                    ) : (
                      <>
                        <Camera className="w-5 h-5" />
                        Upload Photo
                      </>
                    )}
                  </span>
                </Button>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Manual Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type ingredient (e.g., tomatoes, chicken, garlic)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
                className="glass-card border-primary/30 focus:border-primary"
              />
              <Button
                onClick={handleAddIngredient}
                size="icon"
                className="shrink-0 bg-primary hover:bg-primary/90 glow-effect"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {/* Ingredient Tags */}
            {ingredients.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Selected ingredients ({ingredients.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient) => (
                    <Badge
                      key={ingredient}
                      variant="secondary"
                      className="glass-card pl-3 pr-2 py-2 text-sm gap-2 hover:glow-effect transition-all"
                    >
                      {ingredient}
                      <button
                        onClick={() => handleRemoveIngredient(ingredient)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientInput;
