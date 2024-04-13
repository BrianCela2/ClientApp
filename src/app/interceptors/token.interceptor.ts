import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const myToken = auth.getToken();
  if (myToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${myToken}` },
    });
  } else {
    console.log('No token found.');
  }

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log(err);
          router.navigate(['login']);
        }
      }
      console.log(err);
      return throwError(() => new Error('Something went wrong'));
    })
  );
};
