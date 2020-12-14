/*Dados padrão para um envio de email*/

import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact{
    name: string;
    email: string;
}

export default interface ISendMailDTO{
    to: IMailContact;
    from?: IMailContact; //remetente é padrão, mas pode alterar caso necessário
    subject: string; //corpo da mensagem
    templateData: IParseMailTemplateDTO;
}