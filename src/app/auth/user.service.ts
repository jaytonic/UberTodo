import { Router } from '@angular/router';
import { AuthResponse } from './auth-response.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  token$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.token$.next(localStorage.getItem('token'));
    this.restoreToken();
  }

  async register(email: string, name: string, password: string): Promise<User> {
    try {
      const url = environment.apiUrl + '/user/register';
      const createdUser = await lastValueFrom(
        this.http.post<AuthResponse>(url, {
          name,
          email,
          password,
          age: 42,
        })
      );
      this.currentUser$.next(createdUser.user);
      this.token$.next(createdUser.token);
      localStorage.setItem('token', createdUser.token);
      return createdUser.user;
    } catch (e) {
      throw new Error('Email already in use');
    }
  }

  async login(email: string, password: string): Promise<User | string> {
    const url = environment.apiUrl + '/user/login';
    try {
      const loggedInUser = await lastValueFrom(
        this.http.post<AuthResponse>(url, {
          email,
          password,
        })
      );

      this.currentUser$.next(loggedInUser.user);
      this.token$.next(loggedInUser.token);
      localStorage.setItem('token', loggedInUser.token);
      return loggedInUser.user;
    } catch (e) {
      throw new Error('Invalid credentials');
    }
  }
  private async restoreToken() {
    if (this.token$.value) {
      const user = await lastValueFrom(
        this.http.get<User>(environment.apiUrl + '/user/me', {
          headers: { Authorization: 'Bearer ' + this.token$.value },
        })
      );
      this.currentUser$.next(user);
    }
  }
  async logout() {
    const url = environment.apiUrl + '/user/logout';
    try {
      const currentToken = this.token$.value;
      await lastValueFrom(
        this.http.post(
          url,
          {},
          {
            headers: { Authorization: 'Bearer ' + currentToken },
          }
        )
      );
    } finally {
      this.currentUser$.next(null);
      this.token$.next(null);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth');
    }
  }
}
