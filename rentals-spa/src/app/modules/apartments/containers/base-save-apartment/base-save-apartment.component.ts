import { AppUser } from './../../../../models/app-user';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { UsersService } from '../../../../modules/users/services';
import { AuthService } from '../../../../modules/auth/services';
import { ApartmentsService, GeocodingService } from '../../services';
import { GeoCoordinates, Address, Apartment, ApartmentState } from '../../models';
import { takeUntil, filter, take } from 'rxjs/operators';
import { User } from 'src/app/modules/users/models';
import { UserRole } from 'src/app/models';

export abstract class BaseSaveApartmentComponent implements OnInit, OnDestroy {
    loading$: Observable<boolean>;

    coordinates: GeoCoordinates;
    address: Partial<Address>;

    realtors$: Observable<User[]>;

    userId: number;
    isAdmin: boolean;

    protected _unsubscribeAll$ = new EventEmitter<void>();

    constructor(
        protected _apartmentsService: ApartmentsService,
        private _geocodingService: GeocodingService,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.realtors$ = this._apartmentsService.realtors$;

        this._authService
            .user$
            .pipe(
                filter(user => !!user),
                take(1)
            )
            .subscribe((user: AppUser) => {
                this.isAdmin = user.role === UserRole.Admin;
                this.userId = user.id;

                if (this.isAdmin) {
                    this._apartmentsService.getRealtors();
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    getCoordinatesFromAddress(address: Address) {
        this._geocodingService
            .getCoordinatesFromAddress(address)
            .subscribe((coordinates: GeoCoordinates) => {
                this.coordinates = coordinates;
            });
    }

    getAddressFromCoordinates({ lat, lng }: GeoCoordinates) {
        this._geocodingService
            .getAddressFromCoordinates(lat, lng)
            .subscribe((address: Partial<Address>) => {
                this.address = address;
            });
    }
}
