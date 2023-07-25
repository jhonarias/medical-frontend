import { Injectable } from '@angular/core';
import { AuthenticationHttpService } from './authentication-http.service';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(protected httpService: AuthenticationHttpService) {}

  public register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.httpService.register(request);
  }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpService.login(request);
  }
}
