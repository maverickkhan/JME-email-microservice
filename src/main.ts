import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/all-exception';
dotenv.config();

const micoserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.HOST || "127.0.0.1",
    port: process.env.PORT || 3002,
  },
};
async function bootstrap() {
  console.log(micoserviceOptions)
  // const app = await NestFactory.createMicroservice(
  //   AppModule,
  //   micoserviceOptions,
  // );
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.listen();
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
