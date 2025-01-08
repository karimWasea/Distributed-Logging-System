import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Component/auth/auth.component';  // Import your component

// Define your application routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route (can be login or home)
  { path: 'login', component: AuthComponent },           // Route for login
  { path: 'register', component: AuthComponent }         // Route for registration
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Initialize routing with the defined routes
  exports: [RouterModule]                    // Export RouterModule for use in the app
})
export class AppRoutingModule { }
