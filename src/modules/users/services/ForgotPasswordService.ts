/*Serviço para enviar um email de recuperação de senha*/

import {injectable, inject} from 'tsyringe';
import path from 'path';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProviders from '@shared/container/providers/MailProvider/models/IMailProviders'
import AppError from '@shared/errors/AppError';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequest{
    email: string;
}

@injectable()
class ForgotPasswordService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProviders,

        @inject('UsersTokensRepository')
        private userTokensRepository:IUsersTokensRepository
    ){}

    public async execute({email}: IRequest): Promise<void>{
        const user = await this.usersRepository.findByEmail(email); /*Procura
        através do findemail, que foi definido no UserRepository, sendo chamado aqui atraves
        da interface dele, com utilizadção da inject*/

        if(!user) throw new AppError("Usuário não existente.");

        /*Pega o token gerado e envia no corpo do email, possibilitando o reset
        da senha*/
        const {token} =await this.userTokensRepository.generate(user.id);

        /*caminho para o arquivo de template*/
        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'templates',
            'forgot_password.hbs'
        );
        
        /*Envia o corpo da mensagem e o template com variaveis possibilitados pelo handlebar*/
        await this.mailProvider.sendMail(
            {to: {
                name: user.name,
                email: user.email
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }}
        );
    }
}

export default ForgotPasswordService;