import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEmail()
    email?: string
}
