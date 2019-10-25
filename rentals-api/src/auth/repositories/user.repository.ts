import { ConflictException } from '@nestjs/common';

import { Repository, EntityRepository } from 'typeorm';

import { TypeOrmErrorCode } from '../../enums';
import { GetUsersReqDto, ICreateUserReq, LoginReqDto } from '../dtos';
import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async findAll({ search, role, limit, offset }: GetUsersReqDto): Promise<{ count: number, users: UserEntity[] }> {
        const query = this.createQueryBuilder('user');

        if (search) {
            query.andWhere('user.username LIKE :search', { search: `%${search}%` });
        }

        if (role) {
            query.andWhere('user.role = :role', { role });
        }

        const count = await query.clone().getCount();

        if (limit) {
            query.limit(limit);
        }

        if (offset) {
            query.offset(offset);
        }

        const users = await query.getMany();
        return { count, users };
    }

    async createCustom({ username, password, role }: ICreateUserReq): Promise<void> {
        const user = new UserEntity();

        user.username = username;
        user.password = password;
        user.role = role;

        try {
            await user.save();
        } catch (error) {
            if (error.code === TypeOrmErrorCode.UniqueViolation) {
                throw new ConflictException(`Username ${username} already exists.`);
            } else {
                throw error;
            }
        }
    }

    async logIn({ username, password }: LoginReqDto): Promise<UserEntity> {
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user;
        }

        return null;
    }
}
