import { Action } from '@ngrx/store';

import { User } from '../../../../modules/users/models';
import { Apartment, ApartmentListFilter } from '../../models';

export enum ApartmentsActionTypes {
    GetApartments = '[Apartments] Get Apartments',
    GetApartmentsSuccess = '[Apartments] Get Apartments Success',
    GetApartmentsFailure = '[Apartments] Get Apartments Failure',

    GetApartment = '[Apartments] Get Apartment',
    GetApartmentSuccess = '[Apartments] Get Apartment Success',
    GetApartmentFailure = '[Apartments] Get Apartment Failure',

    CreateApartment = '[Apartments] Create Apartment',
    CreateApartmentSuccess = '[Apartments] Create Apartment Success',
    CreateApartmentFailure = '[Apartments] Create Apartment Failure',

    UpdateApartment = '[Apartments] Update Apartment',
    UpdateApartmentSuccess = '[Apartments] Update Apartment Success',
    UpdateApartmentFailure = '[Apartments] Update Apartment Failure',

    DeleteApartment = '[Apartments] Delete Apartment',
    DeleteApartmentSuccess = '[Apartments] Delete Apartment Success',
    DeleteApartmentFailure = '[Apartments] Delete Apartment Failure',

    // Realtors
    GetRealtors = '[Apartments] Get Realtors',
    GetRealtorsSuccess = '[Apartments] Get Realtors Success',
    GetRealtorsFailure = '[Apartments] Get Realtors Failure',
}

export class GetApartments implements Action {
    readonly type = ApartmentsActionTypes.GetApartments;
    constructor(public payload: ApartmentListFilter) {}
}

export class GetApartmentsSuccess implements Action {
    readonly type = ApartmentsActionTypes.GetApartmentsSuccess;
    constructor(public payload: { apartments: Apartment[], count: number }) {}
}

export class GetApartmentsFailure implements Action {
    readonly type = ApartmentsActionTypes.GetApartmentsFailure;
}

export class GetApartment implements Action {
    readonly type = ApartmentsActionTypes.GetApartment;
    constructor(public payload: number) {}
}

export class GetApartmentSuccess implements Action {
    readonly type = ApartmentsActionTypes.GetApartmentSuccess;
    constructor(public payload: Apartment) {}
}

export class GetApartmentFailure implements Action {
    readonly type = ApartmentsActionTypes.GetApartmentFailure;
}

export class CreateApartment implements Action {
    readonly type = ApartmentsActionTypes.CreateApartment;
    constructor(public payload: Apartment) {}
}

export class CreateApartmentSuccess implements Action {
    readonly type = ApartmentsActionTypes.CreateApartmentSuccess;
}

export class CreateApartmentFailure implements Action {
    readonly type = ApartmentsActionTypes.CreateApartmentFailure;
}

export class UpdateApartment implements Action {
    readonly type = ApartmentsActionTypes.UpdateApartment;
    constructor(public payload: { id: number; apartment: Apartment; }) {}
}

export class UpdateApartmentSuccess implements Action {
    readonly type = ApartmentsActionTypes.UpdateApartmentSuccess;
}

export class UpdateApartmentFailure implements Action {
    readonly type = ApartmentsActionTypes.UpdateApartmentFailure;
}

export class DeleteApartment implements Action {
    readonly type = ApartmentsActionTypes.DeleteApartment;
    constructor(public payload: number) {}
}

export class DeleteApartmentSuccess implements Action {
    readonly type = ApartmentsActionTypes.DeleteApartmentSuccess;
}

export class DeleteApartmentFailure implements Action {
    readonly type = ApartmentsActionTypes.DeleteApartmentFailure;
}

// Realtors
export class GetRealtors implements Action {
    readonly type = ApartmentsActionTypes.GetRealtors;
}

export class GetRealtorsSuccess implements Action {
    readonly type = ApartmentsActionTypes.GetRealtorsSuccess;
    constructor(public payload: User[]) {}
}

export class GetRealtorsFailure implements Action {
    readonly type = ApartmentsActionTypes.GetRealtorsFailure;
}

export type ApartmentsAction =
    | GetApartments
    | GetApartmentsSuccess
    | GetApartmentsFailure

    | GetApartment
    | GetApartmentSuccess
    | GetApartmentFailure

    | CreateApartment
    | CreateApartmentSuccess
    | CreateApartmentFailure

    | UpdateApartment
    | UpdateApartmentSuccess
    | UpdateApartmentFailure

    | DeleteApartment
    | DeleteApartmentSuccess
    | DeleteApartmentFailure

    // Realtors
    | GetRealtors
    | GetRealtorsSuccess
    | GetRealtorsFailure
;
