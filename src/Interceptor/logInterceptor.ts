import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;
        const now = Date.now();

        return next.handle().pipe(tap(() => console.log(
            `method: ${request.method}, path: ${request.url}, statusCode: ${statusCode}, time: ${Date.now() - now}ms`
        )))
    }
}