import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert, OneToMany } from 'typeorm';

import * as bcrypt from 'bcryptjs';

import { ApartmentEntity } from '../../apartments/entities';
import { UserRole } from '../enums';

@Entity('user')
@Unique(['username'])
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    passwordSalt: string;

    @Column()
    role: UserRole;

    @OneToMany(type => ApartmentEntity, apartment => apartment.realtor, { eager: true })
    apartments: ApartmentEntity;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.passwordSalt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.passwordSalt);
    }

    async validatePassword(password: string): Promise<boolean> {
        const passwordHash = await bcrypt.hash(password, this.passwordSalt);
        return passwordHash === this.password;
    }
}
