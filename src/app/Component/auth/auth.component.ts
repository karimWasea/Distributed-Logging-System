import { Component } from '@angular/core';
 import { Router } from '@angular/router';      // Optionally, you can use this for routing after login
import { AuthService } from 'src/app/Servess/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  
  // Declare variables for user input
  registerData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: ''
  };

  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  // Register user
  registerUser(): void {
    this.authService.register(this.registerData).subscribe(response => {
      console.log('Registration Successful', response);
      // Optionally handle the response (e.g., redirect or show a message)
    }, error => {
      console.error('Registration Failed', error);
    });
  }

  // Login user and store the token
  loginUser(): void {
    this.authService.getToken(this.loginData).subscribe(response => {
      console.log('Login Successful', response);
      // Store the token in localStorage after successful login
      this.authService.setToken(response.token);
      // Optionally, redirect after login
      this.router.navigate(['/dashboard']);  // Example redirect to a dashboard
    }, error => {
      console.error('Login Failed', error);
    });
  }

  // Get token from localStorage (if needed)
  getTokenFromStorage(): void {
    const token = this.authService.getTokenFromStorage();
    console.log('Token from localStorage:', token);
  }

  // Remove token from localStorage (e.g., logout)
  logout(): void {
    this.authService.removeToken();
    console.log('User logged out');
    // Optionally, redirect after logout
    this.router.navigate(['/login']);  // Example redirect to login
  }
}
