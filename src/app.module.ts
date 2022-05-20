import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from "./config/db";

let baseModules = [HomeModule, FileModule]
let modules = [
  TypeOrmModule.forRoot(dbConfig)
]

@Module({
  imports: [...baseModules, ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
