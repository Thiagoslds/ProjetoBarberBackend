import {getRepository} from 'typeorm'
import {hash} from 'bcryptjs'

import User from '@modules/users/infra/typeorm/entities/Users'
import AppError from '@shared/errors/AppError';


//Executa serviços antes de salvar no banco de dados

interface Request{
    name: string,
    email: string,
    password: string
}

class CreateUserService{
    public async execute({name, email, password}: Request): Promise<User> {
        const usersRepository = getRepository(User);

        //Checar se existe email duplicado
        const checkUserExists = await usersRepository.findOne({
            where: {email}
        });

        if(checkUserExists){
            throw new AppError("Email já existente");
        }

        //criptografar a senha
        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name, email, password: hashedPassword
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;