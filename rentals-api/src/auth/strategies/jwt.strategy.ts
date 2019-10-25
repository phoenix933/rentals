import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { Strategy, ExtractJwt } from 'passport-jwt';

import * as config from 'config';

import { UserRepository } from '../repositories';
import { JwtPaylaod } from '../dtos';
import { UserEntity } from '../entities';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private _userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
        });
    }

    async validate({ username, role }: JwtPaylaod): Promise<UserEntity> {
        const user = await this._userRepository.findOne({ username, role });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
