
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '../../../../modules/auth/services';
import { Apartment } from '../../models';
import { ApartmentsService, GeocodingService } from '../../services';
import { BaseSaveApartmentComponent } from '../base-save-apartment/base-save-apartment.component';

@Component({
    selector: 'app-create-apartment',
    templateUrl: './create-apartment.component.html',
    styleUrls: ['./create-apartment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateApartmentComponent extends BaseSaveApartmentComponent implements OnInit {
    constructor(
        _apartmentsService: ApartmentsService,
        _geocodingService: GeocodingService,
        _authService: AuthService
    ) {
        super(
            _apartmentsService,
            _geocodingService,
            _authService
        );
    }

    ngOnInit() {
        super.ngOnInit();
        this.loading$ = this._apartmentsService.createApartmentLoading$;
    }

    createApartment(apartment: Apartment): void {
        this._apartmentsService.createApartment(this.isAdmin ? apartment : { ...apartment, realtorId: this.userId });
    }
}
