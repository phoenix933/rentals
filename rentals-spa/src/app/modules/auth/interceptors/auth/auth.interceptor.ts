import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RouterService } from './../../../../services';
import { AuthService } from '../../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private _token: string;

    constructor(
        private _authService: AuthService,
        private _routerService: RouterService
    ) {
        this._authService.userToken$.subscribe(token => this._token = token);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._token}`
                }
            });
        }

        return next.handle(req)
            .pipe(
                tap(() => {},
                    (error: any) => {
                        if (error instanceof HttpErrorResponse && error.status === 401) {
                            this._authService.setNotAuthenticated();
                        }
                    }
                )
            );
    }
}
