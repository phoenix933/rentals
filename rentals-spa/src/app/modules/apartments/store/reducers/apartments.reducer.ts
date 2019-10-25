import * as fromActions from '../actions';
import { ApartmentsActionTypes } from '../actions';

import { User } from '../../../../modules/users/models';
import { Apartment } from '../../models';

export interface ApartmentsState {
    apartments: Apartment[];
    count: number;
    selectedApartment: Apartment;

    getApartmentsLoading: boolean;
    getApartmentLoading: boolean;
    createApartmentLoading: boolean;
    updateApartmentLoading: boolean;
    deleteApartmentLoading: boolean;

    realtors: User[];
    getRealtorsLoading: boolean;
}

export const initialState: ApartmentsState = {
    apartments: [],
    count: 0,
    selectedApartment: null,

    getApartmentsLoading: false,
    getApartmentLoading: false,
    createApartmentLoading: false,
    updateApartmentLoading: false,
    deleteApartmentLoading: false,

    realtors: [],
    getRealtorsLoading: false,
};

export function reducer(state = initialState, action: fromActions.ApartmentsAction): ApartmentsState {
    switch (action.type) {
        // Get Apartments
        case ApartmentsActionTypes.GetApartments: {
            return {
                ...state,
                getApartmentsLoading: true
            };
        }

        case ApartmentsActionTypes.GetApartmentsSuccess: {
            const { count, apartments } = action.payload;
            return {
                ...state,
                apartments,
                count,
                getApartmentsLoading: false
            };
        }

        case ApartmentsActionTypes.GetApartmentsFailure: {
            return {
                ...state,
                getApartmentsLoading: false
            };
        }

        // Get Apartment
        case ApartmentsActionTypes.GetApartment: {
            return {
                ...state,
                getApartmentLoading: true
            };
        }

        case ApartmentsActionTypes.GetApartmentSuccess: {
            const selectedApartment = action.payload;
            return {
                ...state,
                selectedApartment,
                getApartmentLoading: false
            };
        }

        case ApartmentsActionTypes.GetApartmentFailure: {
            return {
                ...state,
                getApartmentLoading: false
            };
        }

        // Create Apartment
        case ApartmentsActionTypes.CreateApartment: {
            return {
                ...state,
                createApartmentLoading: true
            };
        }

        case ApartmentsActionTypes.CreateApartmentSuccess:
        case ApartmentsActionTypes.CreateApartmentFailure: {
            return {
                ...state,
                createApartmentLoading: false
            };
        }

        case ApartmentsActionTypes.UpdateApartment: {
            return {
                ...state,
                updateApartmentLoading: true
            };
        }

        case ApartmentsActionTypes.UpdateApartmentSuccess:
        case ApartmentsActionTypes.UpdateApartmentFailure: {
            return {
                ...state,
                updateApartmentLoading: false
            };
        }

        case ApartmentsActionTypes.DeleteApartment: {
            return {
                ...state,
                deleteApartmentLoading: true
            };
        }

        case ApartmentsActionTypes.DeleteApartmentSuccess:
        case ApartmentsActionTypes.DeleteApartmentFailure: {
            return {
                ...state,
                deleteApartmentLoading: false
            };
        }

        case ApartmentsActionTypes.GetRealtors: {
            return {
                ...state,
                getRealtorsLoading: true
            };
        }

        case ApartmentsActionTypes.GetRealtorsSuccess: {
            const realtors = action.payload;
            return {
                ...state,
                realtors,
                getRealtorsLoading: false
            };
        }

        case ApartmentsActionTypes.GetRealtorsFailure: {
            return {
                ...state,
                getRealtorsLoading: false
            };
        }
    }

    return state;
}
