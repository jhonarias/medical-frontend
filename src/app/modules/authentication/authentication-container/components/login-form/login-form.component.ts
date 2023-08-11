import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequest, LoginResponse } from '../../models';
import { AuthenticationStorageService } from 'src/app/shared/services/authentication-storage.service';
import { AuthenticationTokenData } from 'src/app/shared/models';
import { AuthenticatedService } from 'src/app/shared/services/authenticated.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './templates/login-form.component.html',
  // styleUrls: ['./app.component.scss']
})
export class LoginFormComponent implements OnInit {
  public form: FormGroup;

  constructor(
    protected authenticationService: AuthenticationService,
    protected authenticationStorageService: AuthenticationStorageService,
    protected authenticatedService: AuthenticatedService,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.setupEvents();
  }

  ngOnInit(): void {
    this.internalInit();
  }

  protected setupEvents() {
    this.authenticatedService.isAuthenticated$.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    })
  }
  
  protected internalInit() {
    this.buildForm();
  }

  protected buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public validate(): void {
    if (this.form.valid) {
      this.login();
    } else {
      alert('Ingresa los datos');
    }
  }

  protected buildRequest(): LoginRequest {
    return {
      ...this.form.value,
    };
  }

  protected handleLoginSuccess(response: LoginResponse) {
    this.form.reset();
    this.authenticationStorageService.setAuthenticationTokenData({
      ...response,
    } as AuthenticationTokenData);
    this.authenticatedService.isAuthenticated.next(true);
  }

  protected login() {
    const request = this.buildRequest();
    this.authenticationService.login(request).subscribe({
      next: (response) => {
        this.handleLoginSuccess(response);
      },
      error: (err) => {
        alert('Datos incorrectos');
        console.log('err', err);
      },
    });
  }
}
