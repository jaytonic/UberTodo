import { UserService } from './../../auth/user.service';
import { MenuService } from './../../core/menu.service';
import { UiService } from './../../core/ui.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  constructor(
    public uiService: UiService,
    public menuService: MenuService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-lock',
        command: () => this.userService.logout(),
      },
    ];
  }
}
