import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { BellAlertDto } from 'src/bell-alert/dto/create-bell-alert.dto';
import { bellAlertTemplate } from 'src/template/bell-alert';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async BellAlertEmail(bellAlertDto:BellAlertDto) {
    try {
      const title = "test"
      const message = "test email"
      const link = bellAlertDto.originLink
      const from = `Jobsmideast.com <submissions@jobsmideast.com>`;
      await this.mailerService
        .sendMail({
          to: bellAlertDto.email, // List of receivers email address
          from: from, // Senders email address
          subject: 'Have you seen this?',
          text: '', // plaintext body
          html: bellAlertTemplate.send(title,message,link), // HTML body content
        })
        .then((success) => {
          console.log(success);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

}
