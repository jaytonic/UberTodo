import { UserService } from './../../auth/user.service';
import { MenuService } from './../../core/menu.service';
import { UiService } from './../../core/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public uiService: UiService,
    public menuService: MenuService,
    public userService: UserService
  ) {}

  ngOnInit(): void {}
}
