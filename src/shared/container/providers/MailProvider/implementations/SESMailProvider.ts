/* Exemplo de aplicação para o AWS da AMAZON

import nodemailer, {Transporter} from 'nodemailer'; 
import aws from 'aws-sdk';
import IMailProvider from '../models/IMailProviders';
import ISendMailDTO from '../dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import { injectable, inject } from 'tsyringe';
import { addWeeks } from 'date-fns';

@injectable()
export default class SESMailProvider implements IMailProvider{
   private client: Transporter; //para ter uma tipagem

   constructor(
       @inject('MailTemplateProvider')
       private mailTemplateProvider: IMailTemplateProvider
   ){
       this.client = nodemailer.createTransport({
              SES: new addWeeks.SES({
                  apiVersion: '2010-12-01'
              })
           });
       });
   }

   public async sendMail({to, from, subject, templateData}: ISendMailDTO): Promise<void>{
    const message = await this.client.sendMail({
        from: {
            name: from?.name || name,
            address: from?.email || email
        },
        to: {
            name: to.name,
            address: to.email
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData) 
    });
    }
} */