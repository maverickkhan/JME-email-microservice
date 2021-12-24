import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BellAlertModule } from './bell-alert/bell-alert.module';
import { GlobalReponseInterceptor } from './common/globalReponse.interceptor';
import { typeOrmConfig } from './config/database.config';
import { emailConfig } from './config/email.config';

@Module({
  imports: [BellAlertModule, TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot(emailConfig),],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_INTERCEPTOR,
    useClass: GlobalReponseInterceptor,
    }
  ],
})
export class AppModule { }
