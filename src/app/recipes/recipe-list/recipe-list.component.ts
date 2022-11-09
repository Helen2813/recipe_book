import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('a test Recipe', 'Test', 'https://i.pinimg.com/736x/57/d1/a8/57d1a885b3b161e8ecee35e194bed3a8.jpg'),
    new Recipe('a test Recipe2', 'Test', 'https://i.pinimg.com/736x/57/d1/a8/57d1a885b3b161e8ecee35e194bed3a8.jpg')
  ];
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
