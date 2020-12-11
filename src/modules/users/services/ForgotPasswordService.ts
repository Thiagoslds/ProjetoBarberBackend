/*Serviço para enviar um email de recuperação de senha*/

import {injectable, inject} from 'tsyringe';
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

        await this.userTokensRepository.generate(user.id);
        
        this.mailProvider.sendMail(
            email,
            'Pedido de recuperação de senha recebido.'
        );
    }
}

export default ForgotPasswordService;