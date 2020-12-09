import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import {inject, injectable} from 'tsyringe'
import authconfig from '@config/auth'
import User from '@modules/users/infra/typeorm/entities/Users'
import AppError from  '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService{
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
        ){}

    public async execute({email, password}: Request): Promise<Response>{
        //verifica se o email está correto
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError('Senha ou email incorretos', 401);
        }

        //Verifica se a senha está correta, com o metodo compare do bcrypt
        const passwordMatched = await compare(password, user.password);
        if(!passwordMatched){
            throw new AppError('Senha ou email incorretos', 401);
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