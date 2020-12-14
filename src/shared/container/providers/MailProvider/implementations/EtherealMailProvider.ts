import nodemailer, {Transporter} from 'nodemailer'; /*Envio de emails gerenciado pelo node*/
import IMailProvider from '../models/IMailProviders';
import ISendMailDTO from '../dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import { injectable, inject } from 'tsyringe';

@injectable()
export default class EtherealMailProvider implements IMailProvider{
   private client: Transporter; //para ter uma tipagem

   /*Definido pelo Ethereal*/
   constructor(
       @inject('MailTemplateProvider')
       private mailTemplateProvider: IMailTemplateProvider
   ){
       /*then pois não aceita await*/
       nodemailer.createTestAccount().then(account => {
           const transporter = nodemailer.createTransport({
               host: account.smtp.host,
               port: account.smtp.port,
               secure: account.smtp.secure,
               auth: {
                   user: account.user,
                   pass: account.pass
               }
           });

           this.client = transporter;
       });
   }

   /*destruct nos elementos definidos pela interface de enviar email */
   public async sendMail({to, from, subject, templateData}: ISendMailDTO): Promise<void>{
    const message = await this.client.sendMail({
        from: {
            name: from?.name || 'Equipe GoBarber',
            address: from?.email || 'equipe@gobarber.com.br'
        },
        to: {
            name: to.name,
            address: to.email
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData) /*Faz o parse do 
        template enviado pelo serviço de forgotpass, que passou o template
        utiliza injeção de dependencia*/
    });
        console.log('Message sent: %s', message.messageId); 
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message)); 
    }
}