import { Routes } from '@angular/router';

import { Restaurant } from './pages/restaurant/restaurant';
import { Favorite } from './pages/favorite/favorite';
import { Detail } from './pages/detail/detail';
import { FoodDetail } from './pages/food-detail/food-detail';

export const routes: Routes = [
  { path: '', component: Restaurant },
  { path: 'love', component: Favorite },
  { path: 'food/:restaurantId/:foodId', component: FoodDetail },
  { path: 'food/:id', component: Detail },
];
