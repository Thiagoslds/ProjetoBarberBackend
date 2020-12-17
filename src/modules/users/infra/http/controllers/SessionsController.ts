import {Request, Response} from 'express';
import {container} from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import {classToClass} from 'class-transformer'

export default class SessionsController{
    public async create(request: Request, response: Response): Promise<Response>{
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);
    
        //pega o valor do usuario, que é retornado na chamada do service de autenticação
        const { user, token } = await authenticateUser.execute({
            email, password
        })
    
        //Não mostrar o password, sera utilizado o class transformer
        //delete user.password;
    
        return response.json({ user: classToClass(user), token });
    }
}