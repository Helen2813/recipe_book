import { Recipe } from "./recipes.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'Test',
      'https://i.pinimg.com/736x/57/d1/a8/57d1a885b3b161e8ecee35e194bed3a8.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('french freis', 2),
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'Test',
      'https://i.pinimg.com/736x/57/d1/a8/57d1a885b3b161e8ecee35e194bed3a8.jpg',
      [
        new Ingredient('breat', 2),
        new Ingredient('meat', 2),
      ]
    )
  ];
  
  constructor(private  slService: ShoppingListService) {
  }
  
  getRecipes() {
    return this.recipes.slice();
  }
  
  getRecipe(id: number) {
    return this.recipes[id];
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
