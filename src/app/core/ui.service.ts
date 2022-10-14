import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  isBusy$ = new BehaviorSubject(false);
  busyMessage$ = new BehaviorSubject<string | null>(null);
  menuDisplayed = false;

  constructor() {}

  startBusyIndicator(reason: string) {
    this.isBusy$.next(true);
    this.busyMessage$.next(reason);
  }

  stopBusyIndicator() {
    this.isBusy$.next(false);
    this.busyMessage$.next(null);
  }

  toggleMenu() {
    this.menuDisplayed = !this.menuDisplayed;
  }
}
