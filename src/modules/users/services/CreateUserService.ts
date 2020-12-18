import {inject, injectable} from 'tsyringe'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import User from '@modules/users/infra/typeorm/entities/Users'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

//Executa serviços antes de salvar no banco de dados

interface Request{
    name: string,
    email: string,
    password: string
}

@injectable()
class CreateUserService{
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
        ){}

    public async execute({name, email, password}: Request): Promise<User> {
        //Checar se existe email duplicado
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(checkUserExists){
            throw new AppError("Email já existente");
        }

        //criptografar a senha usando a interface do bcrypt
        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = this.usersRepository.create({
            name, email, password: hashedPassword
        });

        /*Apaga todo o cache salvo com os usuarios cadastrados, pois tem um novo usuario agora*/
        await this.cacheProvider.invalidatePrefix('providers-list');

        return user;
    }
}

export default CreateUserService;