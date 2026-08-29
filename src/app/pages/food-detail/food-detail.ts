import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faHeart, faStar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FoodieData } from '../../service/foodie-data';

@Component({
  selector: 'app-food-detail',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './food-detail.html',
  styleUrl: './food-detail.css',
  standalone: true,
})
export class FoodDetail {
  faArrowLeft = faArrowLeft;
  faHeart = faHeart;
  faStar = faStar;
  faLocationDot = faLocationDot;

  restaurantId = input.required<string>();
  foodId = input.required<string>();
  stars = [1, 2, 3, 4, 5];
  favorites: number[] = [];

  constructor(private data: FoodieData) {
    this.favorites = this.data.getFavorites();
  }

  get restaurant() {
    return this.data.restaurant(Number(this.restaurantId()));
  }

  get food() {
    return this.data.food(Number(this.foodId()));
  }

  get reviews() {
    return this.food ? this.data.reviewsForFood(this.food.id) : [];
  }

  get rating(): number {
    return this.food ? this.data.avgRating(this.food.id) : 0;
  }

  isFull(star: number): boolean {
    return star <= Math.round(this.rating);
  }

  userName(userId: number): string {
    return this.data.userName(userId);
  }

  avatar(userId: number): string {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${userId}`;
  }

  isFav(id: number): boolean {
    return this.favorites.includes(id);
  }

  toggle(id: number): void {
    this.data.toggleFavorite(id);
    this.favorites = this.data.getFavorites();
  }
}
