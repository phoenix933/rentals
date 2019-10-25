import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Apartment } from '../../models';

@Component({
    selector: 'app-apartment-details',
    templateUrl: './apartment-details.component.html',
    styleUrls: ['./apartment-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApartmentDetailsComponent implements OnInit {
    apartment: Apartment;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { apartment: Apartment },
    ) { }

    ngOnInit() {
        this.apartment = this.data.apartment;
    }
}
