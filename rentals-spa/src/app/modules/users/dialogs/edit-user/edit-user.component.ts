import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserRole } from './../../../../models/user-role.enum';
import { UsersService } from '../../services';
import { User } from '../../models';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit, OnDestroy {
    updateUserLoading$: Observable<boolean>;

    editUserForm: FormGroup;
    user: User;

    UserRole = UserRole;

    private _unsubscribeAll$ = new Subject<void>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { user: User },
        private _dialogRef: MatDialogRef<EditUserComponent>,
        private _formBuilder: FormBuilder,
        private _usersService: UsersService
    ) { }

    ngOnInit() {
        this.user = this.data.user;

        this.editUserForm = this._formBuilder.group({
            role: [this.user.role, [Validators.required]]
        });

        this.updateUserLoading$ = this._usersService.updateUserLoading$;

        this._usersService
            .updateUserSuccess$
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => this._dialogRef.close(true));
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    updateUser(): void {
        const { valid } = this.editUserForm;

        if (valid) {
            const { role } = this.editUserForm.value;
            this._usersService.updateUser(this.user.username, role);
        }
    }
}
