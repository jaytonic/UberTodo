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
  currentUserAvatar$ = new BehaviorSubject<string | null>(null);

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
      this.updateCurrentUser(createdUser.user, createdUser.token);
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
      this.updateCurrentUser(loggedInUser.user, loggedInUser.token);
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
      this.currentUserAvatar$.next(
        'https://api-nodejs-todolist.herokuapp.com/user/' +
          user._id +
          '/avatar?date=' +
          new Date().getTime()
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

  async refreshAvatar() {
    this.currentUserAvatar$.next(
      'https://api-nodejs-todolist.herokuapp.com/user/' +
        this.currentUser$.value!._id +
        '/avatar?date=' +
        new Date().getTime()
    );
  }

  async updateCurrentUser(user: User, token: string) {
    this.currentUser$.next(user);
    this.token$.next(token);
    this.currentUserAvatar$.next(
      'https://api-nodejs-todolist.herokuapp.com/user/' +
        user._id +
        '/avatar?date=' +
        new Date().getTime()
    );
    localStorage.setItem('token', token);
  }
}
