import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserReqDto, GetUsersReqDto, GetUsersResDto, UpdateUserRoleReqDto, UserResDto } from '../dtos';
import { UserRepository } from '../repositories';
import { UserEntity } from '../entities';
import { UserRole } from '../enums';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private _userRepository: UserRepository
    ) {}

    async getUsers(getUsersFilterDto: GetUsersReqDto): Promise<GetUsersResDto> {
        const { count, users } = await this._userRepository.findAll(getUsersFilterDto);

        return { count, users: users.map(user => this._toResDto(user)) };
    }

    async getUserByUsername(username: string): Promise<UserResDto> {
        return this._toResDto((await this._getUserEntityByUsername(username)));
    }

    createUser(createUserDto: CreateUserReqDto): Promise<void> {
        return this._userRepository.createCustom(createUserDto);
    }

    async updateUserRole(username: string, { role }: UpdateUserRoleReqDto): Promise<UserResDto> {
        const user = await this._getUserEntityByUsername(username);

        if (user.role === UserRole.Admin) {
            throw new BadRequestException();
        }

        user.role = role;
        await user.save();

        return this._toResDto(user);
    }

    async delete(loggedInUser: UserEntity, username: string): Promise<void> {
        if (loggedInUser.username === username) {
            throw new BadRequestException();
        }

        const user = await this._getUserEntityByUsername(username);

        if (user.role === UserRole.Admin) {
            throw new BadRequestException();
        }

        await user.remove();

        // Delete the user with a single query only.
        // However, we want to first check whether the user about to be deleted is in fact an admin.
        // const { affected } = await this._userRepository.delete({ username });

        // if (!affected) {
        //     throw new NotFoundException(`User ${username} was not found.`);
        // }
    }

    private async _getUserEntityByUsername(username: string): Promise<UserEntity> {
        const user = await this._userRepository.findOne({ username });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    private _toResDto(user: UserEntity): UserResDto {
        const userResDto = new UserResDto();

        userResDto.id = user.id;
        userResDto.username = user.username;
        userResDto.role = user.role;

        return userResDto;
    }
}
