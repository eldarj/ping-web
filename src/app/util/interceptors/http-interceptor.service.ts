import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getToken()}`
      }
    });

    return next.handle(request).pipe(
      map((response: any) => {
        // console.log('Map Response');
        // console.log(response);
        return response;
      }, console.error),
      catchError((error: HttpErrorResponse) => {
        console.warn(error);
        return throwError(error);
      })
    );
  }
}
