import { Address } from './address';
import { ApartmentState } from './apartment-state.enum';

export interface Apartment {
    id?: number;
    name: string;
    description: string;
    areaSize: number;
    price: number;
    roomsCount: number;
    state: ApartmentState;
    createdAt?: Date;
    realtorId: number;
    address: Address;
}
