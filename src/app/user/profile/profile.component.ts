import { ConfirmationService, MessageService } from 'primeng/api';
import { UiService } from './../../core/ui.service';
import { UserService } from 'src/app/auth/user.service';
import { environment } from './../../../environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProfileComponent implements OnInit, OnDestroy {
  remoteUrl = environment.apiUrl + '/user/me/avatar';
  headers!: HttpHeaders;
  subscription!: Subscription;

  constructor(
    public userService: UserService,
    private uiService: UiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService.token$.subscribe((u) => {
      this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + u);
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async onProgress() {
    this.uiService.startBusyIndicator('Uploading your avatar...');
  }
  async onError() {
    this.uiService.stopBusyIndicator();
    await this.messageService.add({
      severity: 'error',
      summary: 'Unable to send your image, please check the format',
      closable: false,
      life: 800,
    });
  }
  async onUpload() {
    this.uiService.stopBusyIndicator();
    await this.userService.refreshAvatar();
    await this.messageService.add({
      severity: 'success',
      summary: 'Avatar updated successfully',
      closable: false,
      life: 800,
    });
  }
  async deleteAccount() {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete your account? This is definitive! 💀',
      accept: () => this.userService.deleteAccount(),
    });
  }
}
