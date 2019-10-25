import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './modules/auth/services';
import { UserRole } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    routeLoading: boolean;

    isAuthenticated$: Observable<boolean>;
    role$: Observable<UserRole>;

    UserRole = UserRole;

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.isAuthenticated$ = this._authService.isAuthenticated$;
        this.role$ = this._authService.userRole$;
    }

    ngAfterViewInit() {
        // TODO: Can we achieve this by using the router store?
        this._router
            .events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.routeLoading = true;
                } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
                    this.routeLoading = false;
                }
            });
    }

    logOut(): void {
        this._authService.logOut();
    }
}
