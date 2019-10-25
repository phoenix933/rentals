import { NotFoundException } from '@nestjs/common';

import { Repository, EntityRepository } from 'typeorm';

import { GetApartmentsReqDto, SaveApartmentReqDto } from '../dtos';
import { ApartmentState, ApartmentStateFilter } from '../enums';
import { ApartmentEntity, AddressEntity } from '../entities';

@EntityRepository(ApartmentEntity)
export class ApartmentRepository extends Repository<ApartmentEntity> {
    async findAll(
        { minAreaSize, maxAreaSize, minPrice, maxPrice, minRoomsCount, maxRoomsCount, state, limit, offset }: GetApartmentsReqDto
    ): Promise<{ count: number; apartments: ApartmentEntity[] }> {
        const query = this.createQueryBuilder('apartment');

        query.leftJoinAndSelect('apartment.address', 'address');

        if (minAreaSize) {
            query.andWhere('apartment.areaSize >= :minAreaSize', { minAreaSize });
        }

        if (maxAreaSize) {
            query.andWhere('apartment.areaSize <= :maxAreaSize', { maxAreaSize });
        }

        if (minPrice) {
            query.andWhere('apartment.price >= :minPrice', { minPrice });
        }

        if (maxPrice) {
            query.andWhere('apartment.price <= :maxPrice', { maxPrice });
        }

        if (minRoomsCount) {
            query.andWhere('apartment.roomsCount >= :minRoomsCount', { minRoomsCount });
        }

        if (maxRoomsCount) {
            query.andWhere('apartment.roomsCount <= :maxRoomsCount', { maxRoomsCount });
        }

        if (state && state !== ApartmentStateFilter.All) {
            query.andWhere('apartment.state = :state', { state });
        }

        const count = await query.clone().getCount();

        query.orderBy('apartment.createdAt', 'DESC');

        if (limit) {
            query.limit(limit);
        }

        if (offset) {
            query.offset(offset);
        }

        const apartments = await query.getMany();
        return { count, apartments };
    }

    async findCustom(id: number, state: ApartmentState = null): Promise<ApartmentEntity> {
        const where = !!state ? { id, state } : { id };
        const apartment = await this.findOne({ where });

        if (!apartment) {
            throw new NotFoundException();
        }

        return apartment;
    }

    async createCustom(
        { name, description, areaSize, price, roomsCount, realtorId, state, address: addressDto }: SaveApartmentReqDto
    ): Promise<ApartmentEntity> {
        const apartment = new ApartmentEntity();

        apartment.name = name;
        apartment.description = description;
        apartment.areaSize = areaSize;
        apartment.price = price;
        apartment.roomsCount = roomsCount;
        apartment.realtorId = realtorId;
        apartment.state = state;

        const address = new AddressEntity();

        address.street1 = addressDto.street1;
        address.street2 = addressDto.street2;
        address.city = addressDto.city;
        address.state = addressDto.state;
        address.country = addressDto.country;
        address.postalCode = addressDto.postalCode;
        address.lat = addressDto.lat;
        address.lng = addressDto.lng;

        apartment.address = address;

        await apartment.save();

        return apartment;
    }

    async updateCustom(
        id: number,
        { name, description, areaSize, price, roomsCount, realtorId, state, address: addressDto }: SaveApartmentReqDto
    ): Promise<ApartmentEntity> {
        const apartment = await this.findCustom(id);

        apartment.name = name;
        apartment.description = description;
        apartment.areaSize = areaSize;
        apartment.price = price;
        apartment.roomsCount = roomsCount;
        apartment.realtorId = realtorId;
        apartment.state = state;

        const { address } = apartment;

        address.street1 = addressDto.street1;
        address.street2 = addressDto.street2;
        address.city = addressDto.city;
        address.state = addressDto.state;
        address.country = addressDto.country;
        address.postalCode = addressDto.postalCode;
        address.lat = addressDto.lat;
        address.lng = addressDto.lng;

        apartment.address = address;

        await apartment.save();

        return apartment;
    }
}
