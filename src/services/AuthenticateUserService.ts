import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import authconfig from '../config/auth'

import User from '../models/Users';
import auth from '../config/auth';

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

class AuthenticateUserService{
    public async execute({email, password}: Request): Promise<Response>{
        const usersRepository = getRepository(User);

        //verifica se o email está correto
        const user = await usersRepository.findOne({where: {email}});
        if(!user){
            throw new Error('Senha ou email incorretos');
        }

        //Verifica se a senha está correta, com o metodo compare do bcrypt
        const passwordMatched = await compare(password, user.password);
        if(!passwordMatched){
            throw new Error('Senha ou email incorretos');
        }

        //destruct em cima do auth.ts
        const {secret, expiresIn} = authconfig.jwt;

        //token jwt; primeiro campo sao as permissoes do usuario, nao deve ser colocado info privada
        //segundo paramentro é 'thiago' em md5 - chave secreta-
        const token = sign({}, secret, {
            subject: user.id,   //subject é o usuario que gerou o token
            expiresIn //quanto tempo a sessão ira deslogar
        });

        return{
            user,
            token
        };
    }
}

export default AuthenticateUserService;