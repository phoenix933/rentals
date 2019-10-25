import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserRole } from '../../../../models';
import { UsersService } from '../../services';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent implements OnInit, OnDestroy {
    createUserLoading$: Observable<boolean>;

    UserRole = UserRole;

    createUserForm = this._formBuilder.group({
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

    private _unsubscribeAll$ = new Subject<void>();

    constructor(
        private _dialogRef: MatDialogRef<CreateUserComponent>,
        private _formBuilder: FormBuilder,
        private _usersService: UsersService
    ) { }

    ngOnInit() {
        this.createUserLoading$ = this._usersService.createUserLoading$;

        this._usersService
            .createUserSuccess$
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => this._dialogRef.close(true));
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    createUser(): void {
        const { valid } = this.createUserForm;

        if (valid) {
            const { username, password, role } = this.createUserForm.value;
            this._usersService.createUser(username, password, role);
        }
    }
}
