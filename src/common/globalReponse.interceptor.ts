import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
}

@Injectable()
export class GlobalReponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  async intercept(context: ExecutionContext, next: CallHandler) : Promise<any>  {
  
    return next.handle().pipe(
      map((data) => ({
        status: true,
        statusCode: context.switchToHttp().getResponse().statusCode,
        data: data,
      })),
    );
  }
}