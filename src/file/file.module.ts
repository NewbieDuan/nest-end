import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from "./file.controller";
import { FileRepository } from '../config/repositories/file.repository';
import { UserRepository } from '../config/repositories/user.repository';
import { FileService } from "./file.service";

@Module({
    imports: [TypeOrmModule.forFeature([FileRepository, UserRepository])],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule { }
