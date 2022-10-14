import { UiService } from './core/ui.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TodoJgro';

  constructor(public uiService: UiService) {}
}
