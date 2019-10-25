import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRole } from '../../auth/enums';
import { ApartmentResDto, GetApartmentsReqDto, GetApartmentsResDto, AddressResDto, SaveApartmentReqDto } from '../dtos';
import { ApartmentState, ApartmentStateFilter } from '../enums';
import { ApartmentRepository } from '../repositories';
import { ApartmentEntity } from '../entities';

@Injectable()
export class ApartmentsService {
    constructor(
        @InjectRepository(ApartmentRepository)
        private _apartmentRepository: ApartmentRepository
    ) {}

    async getApartments(getApartmentsReqDto: GetApartmentsReqDto, role: UserRole): Promise<GetApartmentsResDto> {
        if (role === UserRole.Client) {
            getApartmentsReqDto.state = ApartmentStateFilter.Available;
        }

        const { count, apartments } = await this._apartmentRepository.findAll(getApartmentsReqDto);
        return { count, apartments: apartments.map(apartment => this._toResDto(apartment)) };
    }

    async getApartmentById(id: number, role: UserRole): Promise<ApartmentResDto> {
        const state = role === UserRole.Client ? ApartmentState.Available : null;
        return this._toResDto(await this._apartmentRepository.findCustom(id, state));
    }

    async createApartment(createApartmentReqDto: SaveApartmentReqDto): Promise<ApartmentResDto> {
        return this._toResDto(await this._apartmentRepository.createCustom(createApartmentReqDto));
    }

    async updateApartment(id: number, updateApartmentReqDto: SaveApartmentReqDto): Promise<ApartmentResDto> {
        return this._toResDto(await this._apartmentRepository.updateCustom(id, updateApartmentReqDto));
    }

    async deleteApartment(id: number): Promise<void> {
        const { affected } = await this._apartmentRepository.delete({ id });

        if (!affected) {
            throw new NotFoundException(`Apartment ${id} not found.`);
        }
    }

    // TODO: Move this to the DTO constructor?
    private _toResDto(apartment: ApartmentEntity): ApartmentResDto {
        const apartmentResDto = new ApartmentResDto();

        apartmentResDto.id = apartment.id;
        apartmentResDto.name = apartment.name;
        apartmentResDto.description = apartment.description;
        apartmentResDto.areaSize = apartment.areaSize;
        apartmentResDto.price = apartment.price;
        apartmentResDto.roomsCount = apartment.roomsCount;
        apartmentResDto.realtorId = apartment.realtorId;
        apartmentResDto.createdAt = apartment.createdAt;
        apartmentResDto.state = apartment.state;

        const addressResDto = new AddressResDto();

        const { address } = apartment;

        addressResDto.street1 = address.street1;
        addressResDto.street2 = address.street2;
        addressResDto.city = address.city;
        addressResDto.state = address.state;
        addressResDto.country = address.country;
        addressResDto.postalCode = address.postalCode;
        addressResDto.lat = address.lat;
        addressResDto.lng = address.lng;

        apartmentResDto.address = addressResDto;

        return apartmentResDto;
    }
}
