import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  private idChangedSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredient();
    this.idChangedSub = this.slService.ingredientsChanged.subscribe((newIngredients:Ingredient[]) => {
        this.ingredients = newIngredients
    }
    );
  }

  ngOnDestroy(){
    this.idChangedSub.unsubscribe();
  }

  onEditItem(index:number){
    this.slService.startedEditing.next(index);
  }

}
