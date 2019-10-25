import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { UserRole } from '../../../../models';
import { User } from '../../models';

@Component({
    selector: 'app-user-list-table',
    templateUrl: './user-list-table.component.html',
    styleUrls: ['./user-list-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListTableComponent implements OnInit {
    @Input() users: User[];

    @Output() edited = new EventEmitter<User>();
    @Output() deleted = new EventEmitter<User>();

    UserRole = UserRole;

    constructor() { }

    ngOnInit() {
    }

    edit(user: User): void {
        this.edited.emit(user);
    }

    delete(user: User): void {
        this.deleted.emit(user);
    }
}
