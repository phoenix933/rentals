import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';

import { UserEntity } from '../../auth/entities';
import { ApartmentState } from '../enums';
import { AddressEntity } from './address.entity';

@Entity('apartment')
export class ApartmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    areaSize: number;

    @Column()
    price: number;

    @Column()
    roomsCount: number;

    @Column()
    state: ApartmentState;

    @Column()
    createdAt: Date;

    @ManyToOne(type => UserEntity, user => user.apartments, { eager: false })
    realtor: UserEntity;

    @Column()
    realtorId: number;

    @OneToOne(type => AddressEntity, address => address.apartment, { eager: true, cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    address: AddressEntity;

    @BeforeInsert()
    beforeInsert(): void {
        this.createdAt = new Date();
    }
}
