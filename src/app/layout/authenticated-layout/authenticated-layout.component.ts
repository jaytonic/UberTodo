import { UiService } from './../../core/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss']
})
export class AuthenticatedLayoutComponent implements OnInit {

  constructor(public uiService: UiService) { }

  ngOnInit(): void {
  }

}
