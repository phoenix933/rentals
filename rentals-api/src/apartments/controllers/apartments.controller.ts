import { Controller, Post, Body, Put, Param, Get, Delete, ParseIntPipe, ValidationPipe, Query, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from '../../auth/entities';
import { RolesGuard } from '../../auth/guards';
import { Roles, User } from '../../auth/decorators';
import { UserRole } from './../../auth/enums';
import { ApartmentsService } from './../services';
import { ApartmentResDto, GetApartmentsReqDto, GetApartmentsResDto, SaveApartmentReqDto } from '../dtos';

@Controller('/apartments')
@UseGuards(AuthGuard())
export class ApartmentsController {
    constructor(
        private _apartmentsService: ApartmentsService
    ) {}

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    getAll(
        @Query() getApartmentsReqDto: GetApartmentsReqDto,
        @User() user: UserEntity,
    ): Promise<GetApartmentsResDto> {
        return this._apartmentsService.getApartments(getApartmentsReqDto, user.role);
    }

    @Get('/:id')
    getById(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserEntity,
    ): Promise<ApartmentResDto> {
        return this._apartmentsService.getApartmentById(id, user.role);
    }

    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRole.Realtor, UserRole.Admin)
    create(@Body(ValidationPipe) createApartmentReqDto: SaveApartmentReqDto): Promise<ApartmentResDto> {
        return this._apartmentsService.createApartment(createApartmentReqDto);
    }

    @Put('/:id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.Realtor, UserRole.Admin)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateApartmentReqDto: SaveApartmentReqDto
    ): Promise<ApartmentResDto> {
        return this._apartmentsService.updateApartment(id, updateApartmentReqDto);
    }

    @Delete('/:id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.Realtor, UserRole.Admin)
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._apartmentsService.deleteApartment(id);
    }
}
