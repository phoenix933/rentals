import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Apartment, ApartmentListFilter } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class ApartmentsDataService {
    private readonly _apartmentsUrl = `${environment.apiUrl}/apartments`;

    constructor(
        private _http: HttpClient
    ) { }

    getApartments(listFilter: ApartmentListFilter): Observable<{ count: number; apartments: Apartment[] }> {
        const params = Object.keys(listFilter)
            .reduce((res, key) => listFilter[key] ? { ...res, [key]: `${listFilter[key]}` } : res, {});

        return this._http.get<{ count: number; apartments: Apartment[] }>(this._apartmentsUrl, { params });
    }

    getApartment(id: number): Observable<Apartment> {
        return this._http.get<Apartment>(`${this._apartmentsUrl}/${id}`);
    }

    createApartment(apartment: Apartment): Observable<void> {
        return this._http.post<void>(this._apartmentsUrl, apartment);
    }

    updateApartment(id: number, apartment: Apartment): Observable<void> {
        return this._http.put<void>(`${this._apartmentsUrl}/${id}`, apartment);
    }

    deleteApartment(id: number): Observable<void> {
        return this._http.delete<void>(`${this._apartmentsUrl}/${id}`);
    }
}
