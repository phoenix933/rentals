import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { ApartmentEntity } from './apartment.entity';

@Entity('address')
export class AddressEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street1: string;

    @Column({ nullable: true })
    street2: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    postalCode: string;

    @Column({ type: 'decimal' })
    lat: number;

    @Column({ type: 'decimal' })
    lng: number;

    @OneToOne(type => ApartmentEntity, apartment => apartment.address, { eager: false })
    apartment: ApartmentEntity;
}
