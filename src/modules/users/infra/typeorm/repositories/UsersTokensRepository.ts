import {EntityRepository, Repository, getRepository} from 'typeorm';
//Repositórios servem para manipular (criar, alterar) entidades específicas

import UserToken from '@modules/users/infra/typeorm/entities/UserToken'; //importa o modelo de entidade definido
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';


class UsersTokensRepository implements IUsersTokensRepository{ 
    private ormRepository: Repository<UserToken>; //declara o tipo

    /*Carrega algo assim que a classe é chamada*/
    constructor(){
        this.ormRepository = getRepository(UserToken); //Cria o repositorio do tipo User
    } 

    public async findByToken(token: string): Promise<UserToken | undefined>{
        const userToken = await this.ormRepository.findOne({
            where: {token}
        });
        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id
        });
        await this.ormRepository.save(userToken);
        return userToken; 
    }

}

export default UsersTokensRepository;