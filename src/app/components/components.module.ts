import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyDialogComponent } from './busy-dialog/busy-dialog.component';

@NgModule({
  declarations: [BusyDialogComponent],
  imports: [CommonModule, SharedModule],
  exports: [BusyDialogComponent],
})
export class ComponentsModule {}
