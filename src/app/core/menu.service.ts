import { Injectable } from '@angular/core';
import { IMenuItem } from './menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public items: IMenuItem[] = [
    { text: 'Todos', icon: 'th-large', route: '/todos' },
    { text: 'Profile', icon: 'user', route: '/user' },
  ];

  constructor() {}
}
