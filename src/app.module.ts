import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

let baseModules = [HomeModule, FileModule]
let modules = [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client')
  }),
  ConfigModule.forRoot(
    {
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
      load: [databaseConfig]
    }

  ),
  // TypeOrmModule.forRoot(dbConfig)\
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database, synchronize } = configService.get('database')
      return {
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: ['dist/**/*.entity{.ts,.js}'],//configService.get('TYPEORM_ENTITIES'),
        synchronize
      }
    }
  })
]

@Module({
  imports: [...baseModules, ...modules, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
