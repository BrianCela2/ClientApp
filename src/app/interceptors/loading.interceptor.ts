import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoaderService);
  let totalRequests = 0;


  totalRequests++;
  loadingService.setLoading(true);

  return next(req).pipe(
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        loadingService.setLoading(false);
      }
    }),
    catchError((error: any) => {
      totalRequests--;
      if (totalRequests === 0) {
        loadingService.setLoading(false);
      }

      return throwError(() => error);
    })
  );
};
