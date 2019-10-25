import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

import { ICreateUserReq } from './create-user-req.interface';

export abstract class BaseCreateUserReqDto implements ICreateUserReq {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password is too weak. Must have all of the following: a capital letter, a number and a special character.' }
    )
    password: string;
}
