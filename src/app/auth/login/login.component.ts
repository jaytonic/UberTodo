import { UiService } from './../../core/ui.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  serverError: string | null = null;

  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.form.valid) {
      //this.uiService.startBusyIndicator('Logging in...');
      try {
        await this.userService.login(
          this.form.value.email!,
          this.form.value.password!
        );

        this.router.navigateByUrl('/');
      } catch (e: any) {
        this.serverError = e.message;
      } finally {
       // this.uiService.stopBusyIndicator();
      }
    }
  }

}
