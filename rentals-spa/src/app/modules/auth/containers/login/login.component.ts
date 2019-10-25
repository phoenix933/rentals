import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthService } from '../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    logInLoading$: Observable<boolean>;

    loginForm = this._formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.logInLoading$ = this._authService.logInLoading$;
    }

    logIn(): void {
        const { valid } = this.loginForm;

        if (valid) {
            const { username, password } = this.loginForm.value;
            this._authService.logIn(username, password);
        }
    }
}
