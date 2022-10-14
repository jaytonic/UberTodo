import { UiService } from './../../core/ui.service';
import { UserService } from './../user.service';
import { PasswordModule } from 'primeng/password';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { equalsToOtherControl } from 'src/app/core/customs.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.minLength(6)],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
    confirmPassword: [
      '',
      Validators.compose([
        Validators.required,
        equalsToOtherControl('password'),
      ]),
    ],
  });
  serverError: string | null = null;

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.form.valid) {
      this.serverError = null;
      try {
        this.uiService.startBusyIndicator('Registering in...');
        const currentUser = await this.userService.register(
          this.form.value.email,
          this.form.value.name,
          this.form.value.password
        );
        this.router.navigateByUrl('/');
      } catch (error: any) {
        this.serverError = error.message;
      } finally {
        this.uiService.stopBusyIndicator();
      }
    }
  }
}
