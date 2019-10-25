import { FormBuilder } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import { UserRole } from '../../../../models';
import { UserListFilter } from './../../models';

@Component({
    selector: 'app-user-list-filter',
    templateUrl: './user-list-filter.component.html',
    styleUrls: ['./user-list-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListFilterComponent implements OnInit {
    @Output()
    changed = new EventEmitter<UserListFilter>();

    UserRole = UserRole;

    filterForm = this._formBuilder.group({
        search: [''],
        role: ['']
    });

    constructor(
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
    }

    apply(): void {
        const { value } = this.filterForm;
        this.changed.emit(value);
    }
}
