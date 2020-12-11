/*Serviço para resetar uma senha*/

import {injectable, inject} from 'tsyringe';
import {isAfter, addHours} from 'date-fns'
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest{
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private userTokensRepository:IUsersTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({token, password}: IRequest): Promise<void>{
        /*Para resetara a senha, primeiro busca pelo usuario utilizando o token e usando
        o repositorio de tokens de usuario. Se ele existir, busca dentro do repsoitorios dos
        usuários, usando o userID correspondente dele, retornando o usuario.
        Logo após a senha recebida é atualizada e depois o usuario é salvo no repositorio  */
        
        const userToken = await this.userTokensRepository.findByToken(token);

        if(!userToken) throw new AppError('Token de usuário não existente');

        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user) throw new AppError('Usuário não existente');

        const tokenCreatedAt = userToken.created_at; /*pega o instante de criação*/
        const compareDate = addHours(tokenCreatedAt, 2); /*adiciona duas horas, sendo o tempo limite
        para poder trocar*/

        /*Se a hora agora for depois da hora de comparação (2 horas), lança o erro*/
        if(isAfter(Date.now(), compareDate)) throw new AppError('Token Expired');
            
        //gera um hash para a senha
        user.password = await this.hashProvider.generateHash(password);
        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;