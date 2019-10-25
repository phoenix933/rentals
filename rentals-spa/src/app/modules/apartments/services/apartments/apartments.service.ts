import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { User } from '../../../../modules/users/models';
import * as fromApartments from '../../store';
import { Apartment, ApartmentListFilter } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class ApartmentsService {
    private _deleteApartmentSuccess$ = new Subject<void>();

    constructor(
        private _store: Store<fromApartments.ApartmentsState>,
        private _actions$: Actions
    ) {
        this._actions$
            .pipe(ofType(fromApartments.ApartmentsActionTypes.DeleteApartmentSuccess))
            .subscribe(() => this._deleteApartmentSuccess$.next());
    }

    // Actions
    getApartments(filter: ApartmentListFilter): void {
        this._store.dispatch(new fromApartments.GetApartments(filter));
    }

    getApartment(id: number): void {
        this._store.dispatch(new fromApartments.GetApartment(id));
    }

    createApartment(apartment: Apartment): void {
        this._store.dispatch(new fromApartments.CreateApartment(apartment));
    }

    updateApartment(id: number, apartment: Apartment): void {
        this._store.dispatch(new fromApartments.UpdateApartment({ id, apartment }));
    }

    deleteApartment(id: number): void {
        this._store.dispatch(new fromApartments.DeleteApartment(id));
    }

    getRealtors(): void {
        this._store.dispatch(new fromApartments.GetRealtors());
    }

    // Selectors
    get apartments$(): Observable<Apartment[]> {
        return this._store.pipe(select(fromApartments.getApartments));
    }

    get apartmentsCount$(): Observable<number> {
        return this._store.pipe(select(fromApartments.getApartmentsCount));
    }

    get selectedApartment$(): Observable<Apartment> {
        return this._store.pipe(select(fromApartments.getSelectedApartment));
    }

    get getApartmentsLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromApartments.getGetApartmentsLoading));
    }

    get getApartmentLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromApartments.getGetApartmentLoading));
    }

    get createApartmentLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromApartments.getCreateApartmentLoading));
    }

    get updateApartmentLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromApartments.getUpdateApartmentLoading));
    }

    get deleteApartmentLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromApartments.getDeleteApartmentLoading));
    }

    get realtors$(): Observable<User[]> {
        return this._store.pipe(select(fromApartments.getRealtors));
    }

    get getRealtorsLoading$(): Observable<boolean> {
        return this._store.pipe(select(fromApartments.getGetRealtorsLoading));
    }

    // Events
    get deleteApartmentSuccess$(): Observable<void> {
        return this._deleteApartmentSuccess$.asObservable();
    }
}
