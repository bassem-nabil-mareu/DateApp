import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorIntercepter implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(er => {
                if (er instanceof HttpErrorResponse) {
                    if (er.status === 401) {
                        return throwError(er.statusText)
                    }
                    const applicationError = er.headers.get('Application-Error');
                    if (applicationError) {
                        {
                            console.error(applicationError);
                            return throwError(applicationError);
                        }
                    }
                    const serverError = er.error;
                    let modelStateError = '';
                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modelStateError += serverError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateError || serverError || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntercepter,
    multi: true
};
