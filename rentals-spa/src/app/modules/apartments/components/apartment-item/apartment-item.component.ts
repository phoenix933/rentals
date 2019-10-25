import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import { Apartment } from '../../models';

@Component({
    selector: 'app-apartment-item',
    templateUrl: './apartment-item.component.html',
    styleUrls: ['./apartment-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApartmentItemComponent implements OnInit {
    @Input()
    apartment: Apartment;

    @Input()
    showMenu = false;

    @Output()
    itemClicked = new EventEmitter<Apartment>();

    @Output()
    edited = new EventEmitter<Apartment>();

    @Output()
    deleted = new EventEmitter<Apartment>();

    constructor() { }

    ngOnInit() {
    }

    selectItem() {
        this.itemClicked.emit(this.apartment);
    }

    edit(): void {
        this.edited.emit(this.apartment);
    }

    delete(): void {
        this.deleted.emit(this.apartment);
    }
}
