import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FoodieData } from '../../service/foodie-data';

@Component({
  selector: 'app-favorite',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './favorite.html',
  styleUrl: './favorite.css',
  standalone: true,
})
export class Favorite {
  faHeart = faHeart;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;

  favorites: number[] = [];
  showConfirm = false;

  constructor(private data: FoodieData) {
    this.favorites = this.data.getFavorites();
  }

  get foods() {
    return this.data.foodItems.filter((f) => this.favorites.includes(f.id));
  }

  restaurantName(id: number): string {
    const r = this.data.restaurant(id);
    return r ? r.name : '';
  }

  toggle(id: number): void {
    this.data.toggleFavorite(id);
    this.favorites = this.data.getFavorites();
  }

  clear(): void {
    this.data.clearFavorites();
    this.favorites = this.data.getFavorites();
    this.showConfirm = false;
  }
}
