import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const OpeartorGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }
  const userRoles = auth.getRoleFromToken();
  const isOperator = userRoles?.includes('Operator') ;
  const isAdmin = userRoles?.includes('Admin') ;
  
  if (isOperator || isAdmin) {
    return true;
  } else {
    return router.createUrlTree(['/HomePage']);
  }
};
