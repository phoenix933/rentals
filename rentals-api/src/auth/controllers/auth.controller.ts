import { Controller, Logger, Post, Body, ValidationPipe } from '@nestjs/common';

import { RegisterReqDto, LoginReqDto, LoginResDto } from '../dtos';
import { AuthService } from '../services';

@Controller('/auth')
export class AuthController {
    private _logger = new Logger('AuthController');

    constructor(
        private _authService: AuthService
    ) {}

    @Post('/register')
    register(@Body(ValidationPipe) registerReqDto: RegisterReqDto): Promise<void> {
        this._logger.verbose(`Registering ${registerReqDto.username} (${registerReqDto.role})`);
        return this._authService.register(registerReqDto);
    }

    @Post('/login')
    logIn(@Body(ValidationPipe) logInReqDto: LoginReqDto): Promise<LoginResDto> {
        return this._authService.logIn(logInReqDto);
    }
}
