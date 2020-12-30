/*Mostra todos os prestadores de serviço, mas não deve mostrar o id do próprio usuário 
conectado*/

import {inject, injectable} from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/Users';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest{
    user_id: string;
}

@injectable()
export default class ListProviderService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async execute({
        user_id,
    }: IRequest): Promise<User[]>{
        /*Recupera o cache de todos os usuários já salvos*/
        let users = await this.cacheProvider.recover<User[]>(
            `providers-list:${user_id}`
        );

        /*Caso não tenha usuários salvo em cache, busca no bd e salva em cache*/
        if(!users){
            /*Lista todos provedores de serviço exceto o proprio usuario
            Definido por regra de negocio*/
            users = await this.usersRepository.findAllProviders({
                except_user_id: user_id
        })

            /* */
            await this.cacheProvider.save( `providers-list:${user_id}`, classToClass(users));
        }

        return (users);
    }
}