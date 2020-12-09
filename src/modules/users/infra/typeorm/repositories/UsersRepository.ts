import {EntityRepository, Repository, getRepository} from 'typeorm';
//Repositórios servem para manipular (criar, alterar) entidades específicas

import User from '@modules/users/infra/typeorm/entities/Users'; //importa o modelo de entidade definido
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

@EntityRepository(User) /*decorator para usar determinada classe customizada 
como repositorio */

class UsersRepository implements IUsersRepository{ 
    private ormRepository: Repository<User>; //declara o tipo

    /*Carrega algo assim que a classe é chamada*/
    constructor(){
        this.ormRepository = getRepository(User); //Cria o repositorio do tipo User
    } 

    public async findById(id: string): Promise<User | undefined>{
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.ormRepository.findOne({
            where: {email}
        });
        return user;
    }

    public async create(userData:ICreateUserDTO): Promise<User>{
        const user = this.ormRepository.create(userData);
        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User>{
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;