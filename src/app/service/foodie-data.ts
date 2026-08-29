import { Injectable } from '@angular/core';
import jsonData from '../../assets/foodie.json';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  restaurant_type: string;
  location: string;
}

export interface FoodItem {
  id: number;
  name: string;
  food_type: string;
  image_path: string;
  price: number;
  is_available: boolean;
  restaurant_id: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user_id: number;
  food_item_id: number;
}

const FAV_KEY = 'foodieFavorites';

@Injectable({ providedIn: 'root' })
export class FoodieData {
  users: User[] = jsonData.users;
  restaurants: Restaurant[] = jsonData.restaurants;
  foodItems: FoodItem[] = jsonData.foodItems;
  foodReviews: Review[] = jsonData.foodReviews;

  restaurant(id: number): Restaurant | undefined {
    return this.restaurants.find((r) => r.id === id);
  }

  food(id: number): FoodItem | undefined {
    return this.foodItems.find((f) => f.id === id);
  }

  foodsOfRestaurant(restaurantId: number): FoodItem[] {
    return this.foodItems.filter((f) => f.restaurant_id === restaurantId);
  }

  reviewsForFood(foodId: number): Review[] {
    return this.foodReviews.filter((r) => r.food_item_id === foodId);
  }

  userName(userId: number): string {
    const u = this.users.find((x) => x.id === userId);
    return u ? u.name : '';
  }

  avgRating(foodId: number): number {
    const rs = this.reviewsForFood(foodId);
    if (!rs.length) {
      return 0;
    }
    return rs.reduce((acc, r) => acc + r.rating, 0) / rs.length;
  }

  getFavorites(): number[] {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().includes(id);
  }

  toggleFavorite(id: number): void {
    let favs = this.getFavorites();
    if (favs.includes(id)) {
      favs = favs.filter((f) => f !== id);
    } else {
      favs.push(id);
    }
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  }

  clearFavorites(): void {
    localStorage.removeItem(FAV_KEY);
  }
}
