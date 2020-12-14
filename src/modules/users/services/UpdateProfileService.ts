import {inject, injectable} from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/Users';

interface IRequest{
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({
        user_id,
        name,
        email,
        old_password,
        password
    }: IRequest): Promise<User>{

        /*Pega o usuário correspondente*/
        const user = await this.usersRepository.findById(user_id);

        if(!user) throw new AppError('Usuário não encontrado');

        /*Pega o usuário correspondente ao email passado*/
        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

        /*verifica se o id do email corresponde ao mesmo usuario do id solicitado,
        significa que o email ja existe e lança erro*/
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) 
            throw new AppError('Email já está em uso.')

        //atualiza nome e email
        user.name = name;
        user.email = email;

        //se nao tiver a senha antiga
        if(password && !old_password)
            throw new AppError('Você precisa informar a velha senha para colocar uma nova.')


        if(password && old_password){
            /*retorna true caso os dois sejam iguais*/
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password, 
                user.password
            );

            if(!checkOldPassword) throw new AppError("Senha antiga não corresponde");

            /*transforma a senha em um hash*/
            user.password = await this.hashProvider.generateHash(password);            
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateProfileService;