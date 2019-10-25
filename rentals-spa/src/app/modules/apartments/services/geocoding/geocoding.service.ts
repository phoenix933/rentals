import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Address, GeoCoordinates } from '../../models';
import { mapAddress } from './map-address';

@Injectable({
    providedIn: 'root'
})
export class GeocodingService {
    private _geocoder;

    // Reverse geocoding
    getAddressFromCoordinates(lat: number, lng: number): Observable<Partial<Address>> {
        const request = { location: { lat, lng } };

        return this._geocode(request)
            .pipe(
                map(result => {
                    return mapAddress(result[0].address_components);
                })
            );
    }

    getCoordinatesFromAddress(address: Address): Observable<GeoCoordinates> {
        const request = { address: Object.keys(address).map(key => address[key]).join(', ') };
        return this._geocode(request)
            .pipe(
                map(result => {
                    const { location } = result[0].geometry;
                    const coordinates = { lat: location.lat(), lng: location.lng() };
                    return coordinates;
                })
            );
    }

    private _geocode(request) {
        return new Observable((observer) => {
            if (!(window as any).google) {
                observer.error(new Error('Google is not loaded'));
            } else {
                if (!this._geocoder) {
                    this._geocoder = new (window as any).google.maps.Geocoder();
                }

                this._geocoder.geocode(request, (result, status) => {
                    if (status === 'OK') {
                        observer.next(result);
                    } else {
                        observer.error(new Error('Could not geocode'));
                    }
                });
            }
        });
    }
}
