import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faArrowLeft, faLocationDot, faSearch, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FoodieData } from '../../service/foodie-data';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, FormsModule, FontAwesomeModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
  standalone: true,
})
export class Detail {
  faHeart = faHeart;
  faArrowLeft = faArrowLeft;
  faLocationDot = faLocationDot;
  faSearch = faSearch;
  faUtensils = faUtensils;

  id = input.required<string>();
  search = '';
  type = 'ทั้งหมด';
  favorites: number[] = [];

  constructor(private data: FoodieData) {
    this.favorites = this.data.getFavorites();
  }

  get restaurant() {
    return this.data.restaurant(Number(this.id()));
  }

  get foods() {
    return this.data.foodsOfRestaurant(Number(this.id())).filter(
      (f) =>
        (this.type === 'ทั้งหมด' || f.food_type === this.type) &&
        f.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  get types(): string[] {
    return ['ทั้งหมด', ...new Set(this.data.foodsOfRestaurant(Number(this.id())).map((f) => f.food_type))];
  }

  isFav(id: number): boolean {
    return this.favorites.includes(id);
  }

  toggle(id: number): void {
    this.data.toggleFavorite(id);
    this.favorites = this.data.getFavorites();
  }
}
