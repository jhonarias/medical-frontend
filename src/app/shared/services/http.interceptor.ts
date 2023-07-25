import { Injectable } from '@angular/core';
import { AuthenticationStorageService } from './authentication-storage.service';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    protected authenticationStorageService: AuthenticationStorageService,
    private router: Router
  ) {}

  // tslint:disable-next-line: no-any
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const tokenData =
      this.authenticationStorageService.getAuthenticationTokenData();
    const token = tokenData ? tokenData.token : '';
    const headers = {};

    if (token) {
      // @ts-ignore
      headers['Authorization'] = `Bearer ${token}`;
    }

    request = request.clone({
      withCredentials: true,
      setHeaders: headers,
    });

    return next.handle(request).pipe(
      // tslint:disable-next-line: no-any
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          this.authenticationStorageService.removeAuthenticationTokenData();
          // this.router.navigate(['/home']);
          return next.handle(request);
        } else if (err instanceof HttpErrorResponse && err.status === 401) {
          // alert('UNAUTHORIZED');
          this.router.navigate(['/home']);
        }
        return throwError(err);
      })
    );
  }
}
