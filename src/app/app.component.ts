import { Component, OnInit } from '@angular/core';
import { AuthenticationStorageService } from './shared/services/authentication-storage.service';
import { AuthenticatedService } from './shared/services/authenticated.service';
import { User } from './shared/models';
import { Router } from '@angular/router';
import { UserType } from './shared/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAthenticated: boolean;
  public user: User;
  public userType = UserType;

  constructor(
    protected authenticationStorageService: AuthenticationStorageService,
    protected authenticatedService: AuthenticatedService,
    private router: Router
  ) {
    this.isAthenticated = false;
    // @ts-ignore
    this.user = undefined;
    this.setupEvents();
  }

  ngOnInit(): void {
    this.internalInit();
  }

  public logout() {
    this.authenticationStorageService.removeAuthenticationTokenData();
    this.authenticatedService.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  protected setupEvents() {
    this.authenticatedService.isAuthenticated$.subscribe((res) => {
      this.isAthenticated = res;
      this.user = this.getAuthenticationTokenData()?.user;
    });
  }

  protected getAuthenticationTokenData() {
    return this.authenticationStorageService.getAuthenticationTokenData();
  }

  protected internalInit(): void {}
}
