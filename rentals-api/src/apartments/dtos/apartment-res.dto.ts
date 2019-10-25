import { ApartmentState } from '../enums';
import { AddressResDto } from './address-res.dto';

export class ApartmentResDto {
    id: number;
    name: string;
    description: string;
    areaSize: number;
    price: number;
    roomsCount: number;
    createdAt: Date;
    realtorId: number;
    address: AddressResDto;
    state: ApartmentState;
}
