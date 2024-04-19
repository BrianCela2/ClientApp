import { HttpErrorResponse, HttpInterceptorFn,  } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const myToken = auth.getToken();
  
  if (myToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${myToken}` },
    });
  }

  return next(req).pipe(
    catchError((err: any) => {
      console.error('Error occurred:', err); // Log the error to console
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          return auth.refreshToken().pipe(
            catchError(refreshError => {
              router.navigate(['login']);
              return throwError(refreshError);
            }),
            switchMap((newToken: string) => {
              if (newToken) {
                req = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                });
                return next(req);
              } else {
                router.navigate(['login']);
                return throwError('Token refresh failed.');
              }
            })
          );
        }
      }
      return throwError(() => new Error('Something went wrong'));
    })
  );
  
};
