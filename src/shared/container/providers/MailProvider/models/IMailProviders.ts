/*Cria uma interface padrão para o envio de emails*/

export default interface IMailProvider{
    sendMail(to: string, body: string): Promise<void>;
}