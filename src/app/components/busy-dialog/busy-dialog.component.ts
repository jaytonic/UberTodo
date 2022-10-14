import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-busy-dialog',
  templateUrl: './busy-dialog.component.html',
  styleUrls: ['./busy-dialog.component.scss'],
})
export class BusyDialogComponent implements OnInit {
  @Input()
  public isBusy = false;
  @Input()
  public busyMessage: string = 'Loading ...';
  constructor() {}

  ngOnInit(): void {}
}
