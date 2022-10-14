import { UserService } from './../../auth/user.service';
import { UiService } from './../../core/ui.service';
import { MenuService } from './../../core/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  constructor(
    public menuService: MenuService,
    public uiService: UiService,
    public userService: UserService
  ) {}

  ngOnInit(): void {}
}
