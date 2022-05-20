import { Module } from '@nestjs/common';
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { UserRepository } from '../config/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../config/repositories/file.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), TypeOrmModule.forFeature([FileRepository])],
    controllers: [HomeController],
    providers: [HomeService],
})
export class HomeModule { }
