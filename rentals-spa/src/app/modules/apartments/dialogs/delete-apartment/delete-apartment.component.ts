import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApartmentsService } from '../../services';
import { Apartment } from '../../models';

@Component({
    selector: 'app-delete-apartment',
    templateUrl: './delete-apartment.component.html',
    styleUrls: ['./delete-apartment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteApartmentComponent implements OnInit, OnDestroy {
    deleteApartmentLoading$: Observable<boolean>;
    apartment: Apartment;

    private _unsubscribeAll$ = new Subject<void>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { apartment: Apartment },
        private _dialogRef: MatDialogRef<DeleteApartmentComponent>,
        private _apartmentsService: ApartmentsService
    ) { }

    ngOnInit() {
        this.apartment = this.data.apartment;
        this.deleteApartmentLoading$ = this._apartmentsService.deleteApartmentLoading$;

        this._apartmentsService
            .deleteApartmentSuccess$
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe(() => this._dialogRef.close(true));
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    deleteApartment(): void {
        this._apartmentsService.deleteApartment(this.apartment.id);
    }
}


