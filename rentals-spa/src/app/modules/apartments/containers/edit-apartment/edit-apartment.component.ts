import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

import { RouterService } from '../../../../services';
import { AuthService } from '../../../../modules/auth/services';
import { ApartmentsService, GeocodingService } from '../../services';
import { Apartment } from '../../models';
import { BaseSaveApartmentComponent } from '../base-save-apartment/base-save-apartment.component';

@Component({
    selector: 'app-edit-apartment',
    templateUrl: './edit-apartment.component.html',
    styleUrls: ['./edit-apartment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditApartmentComponent extends BaseSaveApartmentComponent implements OnInit {
    apartment$: Observable<Apartment>;

    private _apartmentId: number;

    constructor(
        _apartmentsService: ApartmentsService,
        _geocodingService: GeocodingService,
        _authService: AuthService,
        private _routerService: RouterService
    ) {
        super(
            _apartmentsService,
            _geocodingService,
            _authService
        );
    }

    ngOnInit() {
        super.ngOnInit();

        this.loading$ = this._apartmentsService.updateApartmentLoading$;
        this.apartment$ = this._apartmentsService.selectedApartment$;

        this._routerService
            .params$
            .pipe(
                map((params) => params.apartmentId),
                filter(apartmentId => apartmentId),
                take(1)
            )
            .subscribe((apartmentId: string) => {
                this._apartmentId = +apartmentId;
                this._apartmentsService.getApartment(this._apartmentId);
            });
    }

    updateApartment(apartment: Apartment): void {
        this._apartmentsService.updateApartment(this._apartmentId, apartment);
    }
}

