import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationHttpService extends HttpClientService {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Send a request for register a user
   * @param request Data to query through API
   * @returns response observable resource
   */
  public register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.post<RegisterRequest, RegisterResponse>(
      environment.apiURLAuthentication,
      'register',
      request
    );
  }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.post<LoginRequest, LoginResponse>(
      environment.apiURLAuthentication,
      'login',
      request
    );
  }
}
