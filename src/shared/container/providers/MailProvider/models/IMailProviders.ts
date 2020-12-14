/*Cria uma interface padrão para o envio de emails*/

import ISendMailDTO from '../dtos/ISendMailDTO'

export default interface IMailProvider{
    sendMail(data: ISendMailDTO): Promise<void>;
}