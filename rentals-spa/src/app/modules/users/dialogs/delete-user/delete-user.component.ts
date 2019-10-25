import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '../../services';
import { User } from '../../models';

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteUserComponent implements OnInit, OnDestroy {
    deleteUserLoading$: Observable<boolean>;

    user: User;

    private _unsubscribeAll$ = new Subject<void>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { user: User },
        private _dialogRef: MatDialogRef<DeleteUserComponent>,
        private _usersService: UsersService
    ) { }

    ngOnInit() {
        this.user = this.data.user;

        this.deleteUserLoading$ = this._usersService.deleteUserLoading$;

        this._usersService
            .deleteUserSuccess$
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => this._dialogRef.close(true));
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    deleteUser(): void {
        this._usersService.deleteUser(this.user.username);
    }
}

