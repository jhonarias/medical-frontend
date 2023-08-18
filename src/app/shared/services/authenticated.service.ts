import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationStorageService } from './authentication-storage.service';
import { UserType } from '../enums';

@Injectable()
export class AuthenticatedService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticated.asObservable();

  constructor(
    protected authenticationStorageService: AuthenticationStorageService
  ) {
    this.isAuthenticated.next(
      !!this.authenticationStorageService.getAuthenticationTokenData()
    );
  }

  public hasRole(roles: UserType[]): boolean {
    const data = this.authenticationStorageService.getAuthenticationTokenData();
    const userRoles = data.user.role?.split(',');

    // @ts-ignore
    return roles?.some((rol) => userRoles.includes(rol));
  }
}
