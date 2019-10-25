import { Controller, Logger, Get, Post, Body, ValidationPipe, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserReqDto, UpdateUserRoleReqDto, GetUsersReqDto, UserResDto, GetUsersResDto } from '../dtos';
import { UserRole } from './../enums';
import { RolesGuard } from './../guards';
import { UsersService } from '../services';
import { User, Roles } from '../decorators';
import { UserEntity } from '../entities';

@Controller('/users')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRole.Admin)
export class UsersController {
    private _logger = new Logger('UsersController');

    constructor(
        private _usersService: UsersService
    ) {}

    @Get()
    getAll(@Query(ValidationPipe) getUsersFilterDto: GetUsersReqDto): Promise<GetUsersResDto> {
        return this._usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:username')
    getByUsername(@Param('username') username: string): Promise<UserResDto> {
        return this._usersService.getUserByUsername(username);
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserReqDto): Promise<void> {
        return this._usersService.createUser(createUserDto);
    }

    @Patch('/:username/role')
    updateRole(
        @Param('username') username: string,
        @Body(ValidationPipe) updateUserRoleDto: UpdateUserRoleReqDto
    ): Promise<UserResDto> {
        return this._usersService.updateUserRole(username, updateUserRoleDto);
    }

    @Delete('/:username')
    delete(
        @User() user: UserEntity,
        @Param('username') username: string
    ): Promise<void> {
        return this._usersService.delete(user, username);
    }
}
