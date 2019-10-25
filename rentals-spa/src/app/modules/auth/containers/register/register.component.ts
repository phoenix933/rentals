import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { UserRole } from '../../../../models';
import { AuthService } from '../../services';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
    registerLoading$: Observable<boolean>;

    registerForm = this._formBuilder.group({
        username: ['', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20)]
        ],
        password: ['', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
        ]],
        role: [UserRole.Client, [Validators.required]]
    });

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.registerLoading$ = this._authService.registerLoading$;
    }

    register(): void {
        const { valid } = this.registerForm;

        if (valid) {
            const { username, password, role } = this.registerForm.value;
            this._authService.register(username, password, role);
        }
    }
}
