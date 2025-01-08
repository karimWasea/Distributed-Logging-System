import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define interfaces for request and response data
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface TokenRequestData {
  username: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  expiresIn: number; // Token expiry time in seconds
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44375/api/Auth'; // Directly define the API URL

  constructor(private http: HttpClient) {}

  // Register a new user
  register(registerData: RegisterData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, registerData).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Login and get a token
  login(tokenRequestData: TokenRequestData): Observable<void> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/token`, tokenRequestData).pipe(
      map((response) => {
        this.setToken(response.token, response.expiresIn); // Store token and expiry
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  // Store token and expiry in localStorage
  private setToken(token: string, expiresIn: number): void {
    const expiryTime = new Date().getTime() + expiresIn * 1000; // Convert to milliseconds
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if the user is authenticated (token exists and is not expired)
  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiryTime = localStorage.getItem('tokenExpiry');

    if (!token || !expiryTime) {
      return false; // No token or expiry time
    }

    return new Date().getTime() < +expiryTime; // Check if token is still valid
  }

  // Remove token and expiry from localStorage (logout)
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}