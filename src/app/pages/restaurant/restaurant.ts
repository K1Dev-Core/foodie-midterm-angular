import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FoodieData } from '../../service/foodie-data';

@Component({
  selector: 'app-restaurant',
  imports: [RouterLink, FormsModule, FontAwesomeModule],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
  standalone: true,
})
export class Restaurant {
  faHeart = faHeart;
  faSearch = faSearch;

  types: string[] = [];
  search = '';
  type = 'ทั้งหมด';

  constructor(private data: FoodieData) {
    this.types = ['ทั้งหมด', ...new Set(this.data.restaurants.map((r) => r.restaurant_type))];
  }

  get restaurants() {
    return this.data.restaurants.filter(
      (r) =>
        (this.type === 'ทั้งหมด' || r.restaurant_type === this.type) &&
        r.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  coverOf(id: number): string {
    const foods = this.data.foodsOfRestaurant(id);
    return foods.length ? foods[0].image_path : '';
  }

  countFoods(id: number): number {
    return this.data.foodsOfRestaurant(id).length;
  }
}
