import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../repositories';
import { RegisterReqDto, LoginReqDto, JwtPaylaod, LoginResDto } from '../dtos';
import { UserRole } from '../enums';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private _userRepository: UserRepository,
        private _jwtService: JwtService
    ) {}

    register(registerReqDto: RegisterReqDto): Promise<void> {
        // Although there's validation, double-check that no one can sign up as an admin.
        if (registerReqDto.role === UserRole.Admin) {
            throw new BadRequestException();
        }

        return this._userRepository.createCustom(registerReqDto);
    }

    async logIn(logInReqDto: LoginReqDto): Promise<LoginResDto> {
        const user = await this._userRepository.logIn(logInReqDto);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const { id, username, role } = user;
        const payload: JwtPaylaod = { username, role };
        const token = this._jwtService.sign(payload);

        return { id, username, role, token };
    }
}
