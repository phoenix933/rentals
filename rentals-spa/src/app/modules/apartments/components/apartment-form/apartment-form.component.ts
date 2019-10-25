import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input,
    OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { debounceTime, takeUntil } from 'rxjs/operators';

import countries from '../../../../../assets/data/countries.json';
import { User } from '../../../../modules/users/models';
import { GeoCoordinates, Address, Apartment, ApartmentState } from '../../models';

@Component({
    selector: 'app-apartment-form',
    templateUrl: './apartment-form.component.html',
    styleUrls: ['./apartment-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class ApartmentFormComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    apartment: Apartment;

    @Input()
    address: Partial<Address>;

    @Input()
    coordinates: GeoCoordinates;

    @Input()
    loading: boolean;

    @Input()
    realtors: User[];

    @Input()
    showRealtors = true;

    @Output()
    submitted = new EventEmitter<Apartment>();

    @Output()
    addressChanged = new EventEmitter<Address>();

    @Output()
    coordinatesChanged = new EventEmitter<GeoCoordinates>();

    apartmentForm = this._formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.maxLength(1000)]],
        areaSize: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
        price: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
        roomsCount: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
        realtorId: ['', [Validators.required]],
        state: ['', [Validators.required]],
        address: this._formBuilder.group({
            street1: ['', [Validators.required, Validators.maxLength(100)]],
            street2: ['', [Validators.maxLength(100)]],
            city: ['', [Validators.required, Validators.maxLength(100)]],
            state: ['', [Validators.required, Validators.maxLength(100)]],
            postalCode: ['', [Validators.required, Validators.maxLength(20)]],
            country: ['', [Validators.required]],
        }),
        coordinates: this._formBuilder.group({
            lat: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
            lng: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
        })
    });

    ApartmentState = ApartmentState;
    countries = countries;

    readonly defaultLat = 42.1418386;
    readonly defaultLng = 24.754370900000026;

    private _addressControl = this.apartmentForm.get('address');
    private _coordinatesControl = this.apartmentForm.get('coordinates');

    private _unsubscribeAll$ = new EventEmitter<void>();

    constructor(
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this._addressControl
            .valueChanges
            .pipe(
                debounceTime(500),
                takeUntil(this._unsubscribeAll$)
            )
            .subscribe(address => {
                if (this._addressControl.valid) {
                    this.addressChanged.emit(address);
                }
            });

        this._coordinatesControl
            .valueChanges
            .pipe(
                debounceTime(500),
                takeUntil(this._unsubscribeAll$)
            )
            .subscribe(coordinates => {
                if (this._coordinatesControl.valid) {
                    this.coordinatesChanged.emit(coordinates);
                }
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.apartment && changes.apartment.currentValue) {
            const apartment = changes.apartment.currentValue as Apartment;
            const { lat, lng, ...address } = apartment.address;
            const formValue = { ...apartment, address, coordinates: { lat, lng } };

            this.apartmentForm.patchValue(formValue, { emitEvent: false });
        } else if (changes.address && changes.address.currentValue) {
            this._addressControl.patchValue(changes.address.currentValue, { emitEvent: false });
        } else if (changes.coordinates && changes.coordinates.currentValue) {
            this._coordinatesControl.patchValue(changes.coordinates.currentValue, { emitEvent: false });
        } else if (changes.showRealtors) {
            this.apartmentForm.get('realtorId').setValidators(this.showRealtors ? [Validators.required] : []);
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    get lat(): number {
        return this._coordinatesControl.valid && this._coordinatesControl.value.lat;
    }

    get lng(): number {
        return this._coordinatesControl.valid && this._coordinatesControl.value.lng;
    }

    submit(): void {
        const { valid } = this.apartmentForm;

        if (valid) {
            const { value } = this.apartmentForm;
            const { lat, lng } = value.coordinates;

            const apartment: Apartment = {
                ...value,
                address: {
                    ...value.address,
                    lat,
                    lng
                }
            };

            this.submitted.emit(apartment);
        }
    }
}
