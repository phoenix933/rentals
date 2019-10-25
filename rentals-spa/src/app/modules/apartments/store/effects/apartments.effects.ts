import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { of } from 'rxjs';
import { switchMap, map, catchError, mapTo, tap, pluck} from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromRootActions from '../../../../store/actions';
import { UsersDataService } from './../../../users/services';
import { ApartmentsDataService } from '../../services/apartments-data/apartments-data.service';
import { GetUsersRes } from '../../../../modules/users/models';
import {Apartment, ApartmentListFilter } from '../../models';
import * as fromActions from '../actions';
import { ApartmentsActionTypes } from '../actions';

@Injectable()
export class ApartmentsEffects {
    constructor(
        private _actions$: Actions,
        private _apartmentsDataService: ApartmentsDataService,
        private _usersDataService: UsersDataService,
        private _snackBar: MatSnackBar
    ) {}

    // Get Apartments
    @Effect()
    getApartments$ = this._actions$
        .pipe(
            ofType(ApartmentsActionTypes.GetApartments),
            map((action: fromActions.GetApartments) => action.payload),
            switchMap((listFilter: ApartmentListFilter) => {
                return this._apartmentsDataService
                    .getApartments(listFilter)
                    .pipe(
                        map(({ count, apartments }) => new fromActions.GetApartmentsSuccess({ count, apartments })),
                        catchError(() => of(new fromActions.GetApartmentsFailure()))
                    );
            })
        );

    // Get Apartment
    @Effect()
    getApartment$ = this._actions$
        .pipe(
            ofType(ApartmentsActionTypes.GetApartment),
            map((action: fromActions.GetApartment) => action.payload),
            switchMap((id: number) => {
                return this._apartmentsDataService
                    .getApartment(id)
                    .pipe(
                        map((apartment: Apartment) => new fromActions.GetApartmentSuccess(apartment)),
                        catchError(() => of(new fromActions.GetApartmentFailure()))
                    );
            })
        );

    // Create Apartment
    @Effect()
    createApartment$ = this._actions$
        .pipe(
            ofType(ApartmentsActionTypes.CreateApartment),
            map((action: fromActions.CreateApartment) => action.payload),
            switchMap((apartment: Apartment) => {
                return this._apartmentsDataService
                    .createApartment(apartment)
                    .pipe(
                        mapTo(new fromActions.CreateApartmentSuccess()),
                        catchError(() => of(new fromActions.CreateApartmentFailure()))
                    );
            })
        );

    @Effect()
    createApartmentSuccess$ = this._actions$
        .pipe(
            ofType(ApartmentsActionTypes.CreateApartmentSuccess),
            tap(() => this._snackBar.open(`Apartment created successfully`, 'Yay')),
            mapTo(new fromRootActions.Go({ path: ['/apartments/list'] }))
        );

    @Effect({ dispatch: false })
    createApartmentFailure$ = this._createSnackBarEffect(
        ApartmentsActionTypes.CreateApartmentFailure,
        'Uh oh! Something wrong happened and we couldn\'t create the apartment. Please, try again later!',
        'Sure'
    );

    // Update Apartment
    @Effect()
    updateApartment$ = this._actions$
        .pipe(
            ofType(ApartmentsActionTypes.UpdateApartment),
            map((action: fromActions.UpdateApartment) => action.payload),
            switchMap(({ id, apartment }) => {
                return this._apartmentsDataService
                    .updateApartment(id, apartment)
                    .pipe(
                        mapTo(new fromActions.UpdateApartmentSuccess()),
                        catchError(() => of(new fromActions.UpdateApartmentFailure()))
                    );
            })
        );

    @Effect()
    updateApartmentSuccess$ = this._actions$
        .pipe(
            ofType(ApartmentsActionTypes.UpdateApartmentSuccess),
            tap(() => this._snackBar.open(`Apartment updated successfully`, 'Yay')),
            mapTo(new fromRootActions.Go({ path: ['/apartments/list'] }))
        );

    @Effect({ dispatch: false })
    updateApartmentFailure$ = this._createSnackBarEffect(
        ApartmentsActionTypes.UpdateApartmentFailure,
        'Uh oh! Something wrong happened and we couldn\'t update this apartment. Please, try again later!',
        'Sure'
    );

    // Delete Apartment
    @Effect()
    deleteApartment$ = this._actions$
        .pipe(
            ofType(ApartmentsActionTypes.DeleteApartment),
            map((action: fromActions.DeleteApartment) => action.payload),
            switchMap((id: number) => {
                return this._apartmentsDataService
                    .deleteApartment(id)
                    .pipe(
                        mapTo(new fromActions.DeleteApartmentSuccess()),
                        catchError(() => of(new fromActions.DeleteApartmentFailure()))
                    );
            })
        );

    @Effect({ dispatch: false })
    deleteApartmentSuccess$ = this._createSnackBarEffect(
        ApartmentsActionTypes.DeleteApartmentSuccess,
        'Apartment deleted forever!',
        'Alright'
    );

    @Effect({ dispatch: false })
    deleteApartmentFailure$ = this._createSnackBarEffect(
        ApartmentsActionTypes.DeleteApartmentFailure,
        'Uh oh! Something wrong happened and we couldn\'t delete this apartment. Please, try again later!',
        'No worires'
    );

    @Effect()
    getRealtors$ = this._actions$
        .pipe(
            ofType(ApartmentsActionTypes.GetRealtors),
            switchMap(() => {
                return this._usersDataService
                    .getRealtors()
                    .pipe(
                        map(({ users: realtors }: GetUsersRes) => new fromActions.GetRealtorsSuccess(realtors)),
                        catchError(() => of(new fromActions.GetRealtorsFailure()))
                    );
            })
        );

    private _createSnackBarEffect(actionType: string, message: string, buttonText: string) {
        return this._actions$
            .pipe(
                ofType(actionType),
                pluck('payload'),
                tap(() => this._snackBar.open(message, buttonText))
            );
    }
}
