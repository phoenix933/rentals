
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApartmentsState } from '../reducers/apartments.reducer';

export const getApartmentsState = createFeatureSelector<ApartmentsState>('apartments');

export const getApartments = createSelector(getApartmentsState, (state: ApartmentsState) => state.apartments);
export const getApartmentsCount = createSelector(getApartmentsState, (state: ApartmentsState) => state.count);
export const getSelectedApartment = createSelector(getApartmentsState, (state: ApartmentsState) => state.selectedApartment);

export const getGetApartmentsLoading = createSelector(getApartmentsState, (state: ApartmentsState) => state.getApartmentsLoading);
export const getGetApartmentLoading = createSelector(getApartmentsState, (state: ApartmentsState) => state.getApartmentLoading);
export const getCreateApartmentLoading = createSelector(getApartmentsState, (state: ApartmentsState) => state.createApartmentLoading);
export const getUpdateApartmentLoading = createSelector(getApartmentsState, (state: ApartmentsState) => state.updateApartmentLoading);
export const getDeleteApartmentLoading = createSelector(getApartmentsState, (state: ApartmentsState) => state.deleteApartmentLoading);

export const getRealtors = createSelector(getApartmentsState, (state: ApartmentsState) => state.realtors);
export const getGetRealtorsLoading = createSelector(getApartmentsState, (state: ApartmentsState) => state.getRealtorsLoading);
