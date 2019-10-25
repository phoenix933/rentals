import { ApartmentStateFilter } from './../../models/apartment-state-filter.enum';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApartmentListFilter } from '../../models';

@Component({
    selector: 'app-apartment-list-filter',
    templateUrl: './apartment-list-filter.component.html',
    styleUrls: ['./apartment-list-filter.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApartmentListFilterComponent implements OnInit, OnDestroy {
    @Input()
    showStates = true;

    @Output()
    changed = new EventEmitter<ApartmentListFilter>();

    ApartmentStateFilter = ApartmentStateFilter;

    filterForm = this._formBuilder.group({
        areaSize: [],
        price: [],
        roomsCount: [],
        state: [ApartmentStateFilter.Available]
    });

    private _unsubscribeAll$ = new Subject<void>();

    constructor(
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.filterForm
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((value) => {
                const { areaSize, price, roomsCount, state } = value;

                const filter: ApartmentListFilter = {
                    minAreaSize: areaSize && areaSize.low,
                    maxAreaSize: areaSize && areaSize.high,
                    minPrice: price && price.low,
                    maxPrice: price && price.high,
                    minRoomsCount: roomsCount && roomsCount.low,
                    maxRoomsCount: roomsCount && roomsCount.high,
                    state
                };

                this.changed.emit(filter);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }
}
