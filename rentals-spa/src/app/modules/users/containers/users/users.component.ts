import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatPaginator, MatDialog } from '@angular/material';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { CreateUserComponent, DeleteUserComponent, EditUserComponent } from './../../dialogs';
import { User, UserListFilter } from '../../models';
import { UsersService } from '../../services';
import { ComponentType } from '@angular/cdk/portal';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
    users$: Observable<User[]>;
    count$: Observable<number>;
    getUsersLoading$: Observable<boolean>;

    readonly pageSize = 5;

    @ViewChild('paginator', { static: false }) private _paginator: MatPaginator;

    private readonly _defaultFilter: UserListFilter = { limit: this.pageSize, offset: 0 };

    private _filter$ = new BehaviorSubject<UserListFilter>(this._defaultFilter);
    private _unsubscribeAll$ = new Subject<void>();

    constructor(
        private _usersService: UsersService,
        private _dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this._filter$
            .asObservable()
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((listFilter: UserListFilter) => this._usersService.getUsers(listFilter));

        this.users$ = this._usersService.users$;
        this.count$ = this._usersService.usersCount$;
        this.getUsersLoading$ = this._usersService.getUsersLoading$;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    onFilterChanged(listFilter: UserListFilter): void {
        this._paginator.firstPage();
        this._filter$.next({ ...this._defaultFilter, ...listFilter });
    }

    onPageChanged({ pageIndex, pageSize }: PageEvent): void {
        const offset = pageIndex * pageSize;
        const currentValue = this._filter$.getValue();
        this._filter$.next({ ...currentValue, offset });
    }

    openCreateUserDialog(): void {
        this._openDialog(CreateUserComponent);
    }

    openEditUserDialog(user: User): void {
        this._openDialog(EditUserComponent, { user });
    }

    openDeleteUserDialog(user: User): void {
        this._openDialog(DeleteUserComponent, { user });
    }

    private _openDialog<T>(component: ComponentType<T>, data: { user: User } = null): void {
        this._dialog
            .open(component, { data })
            .afterClosed()
            .pipe(filter(saved => saved))
            .subscribe(() => this._refreshUsers());
    }

    // Showing the correct data without refreshing it from the server, is almost impossible.
    private _refreshUsers(): void {
        const currentValue = this._filter$.getValue();
        this._filter$.next(currentValue);
    }
}
