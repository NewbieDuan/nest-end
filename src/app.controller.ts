import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('base')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('login')
  login(): string {
    return 'login';
  }
}
