import { Module } from '@nestjs/common';
import { BellAlertService } from './bell-alert.service';
import { BellAlertController } from './bell-alert.controller';
import { MailService } from 'src/common/sendmail';

@Module({
  controllers: [BellAlertController],
  providers: [BellAlertService,MailService]
})
export class BellAlertModule {}
