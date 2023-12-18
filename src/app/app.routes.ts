import { Routes } from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";
import {DefaultComponent} from "./pages/default/default.component";

export const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'profile', component: ProfileComponent }
];
