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

  constructor(private http: HttpClient) {
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
  private async restoreToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token$.next(token);
      const user = await lastValueFrom(
        this.http.get<User>(environment.apiUrl + '/user/me', {
          headers: { Authorization: 'Bearer ' + token },
        })
      );
      this.currentUser$.next(user);
    }
  }
}
