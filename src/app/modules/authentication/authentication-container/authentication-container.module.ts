import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationContainerRoutingModule } from './authentication-container-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthenticationContainerComponent } from './authentication-container.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationHttpService } from './services/authentication-http.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationContainerRoutingModule,
  ],
  declarations: [
    AuthenticationContainerComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  providers: [
    {
      provide: 'components',
      useValue: [AuthenticationContainerComponent],
      multi: true,
    },
    AuthenticationService,
    AuthenticationHttpService,
  ],
  exports: [AuthenticationContainerComponent],
})
export class AuthenticationContainerModule {}
