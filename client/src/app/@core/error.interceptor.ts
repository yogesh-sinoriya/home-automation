import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, first } from 'rxjs/operators';
import { ToastrService } from '../@services/toastr.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toasteService: ToastrService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);

        if (err.status === 440) {
        }
        let error = err.error.message || err.statusText;
        // if (err.status === 500) {
        //   error = 'Something went wrong'
        // }
        this.toasteService.show("danger", "Error",error);
        return throwError(error);
      }),
    );
  }
}
