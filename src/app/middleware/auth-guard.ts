import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationStorageService } from '../shared/services/authentication-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    protected authenticationStorageService: AuthenticationStorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Aquí puedes agregar tu lógica de verificación de autenticación
    // Por ejemplo, verificar si el usuario ha iniciado sesión o si tiene los permisos necesarios

    const data = this.authenticationStorageService.getAuthenticationTokenData();

    if (data) {
      const userRoles = data.user.role?.split(',');
      // @ts-ignore
      const isAllowed = next.data.roles?.some((rol) => userRoles.includes(rol));

      if (isAllowed) {
        return true;
      }
      this.router.navigate(['/home']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
