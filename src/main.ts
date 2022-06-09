import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/AllExceptionsFilter';
import { HttpExceptionFilter } from "./exception/HttpExceptionFilter"
import { LoggingInterceptor } from './Interceptor/logInterceptor';
import { TransformInterceptor } from './Interceptor/transformInterceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: true//生产环境倾向于禁用详细的错误
  }));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter())
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor())
  await app.listen(4000);
}
bootstrap();
