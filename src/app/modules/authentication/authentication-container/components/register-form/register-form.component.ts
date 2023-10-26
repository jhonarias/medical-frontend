import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { RegisterRequest, RegisterResponse } from '../../models';
import { Router } from '@angular/router';
import { UserType } from 'src/app/shared/enums';

@Component({
  selector: 'register-form',
  templateUrl: './templates/register-form.component.html',
  // styleUrls: ['./app.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean;

  constructor(protected authenticationService: AuthenticationService,
    private router: Router) {
    this.form = new FormGroup({});
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public validate(): void {
    if (this.form.valid) {
      this.register();
    } else {
      alert('Llena los datos');
    }
  }

  protected internalInit(): void {
    this.buildForm();
  }

  protected buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  protected buildRequest(): RegisterRequest {
    return {
      ...this.form.value,
      role: UserType.USER,
    };
  }

  protected handleRegisterSuccess(response: RegisterResponse) {
    this.form.reset();
    this.router.navigate(['/login']);
    console.log('response', response);
  }

  protected register() {
    this.isLoading = true;
    const request = this.buildRequest();
    this.authenticationService.register(request).subscribe({
      next: (response) => {
        this.handleRegisterSuccess(response);
      },
      error: (err) => {
        console.log('err', err);
        this.isLoading = false;
      },
    });
  }
}
