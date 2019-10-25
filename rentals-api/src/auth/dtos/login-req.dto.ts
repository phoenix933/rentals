import { IsString } from 'class-validator';

export class LoginReqDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
