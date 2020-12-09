import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService' 

export default class UsersController{
    public async create(request: Request, response: Response): Promise<Response>{
        const { name, email, password } = request.body;
        const createUser = container.resolve(CreateUserService);

        //Manda os dados obtidos pelo INsomnia pro services do usuario, onde sera salvo
        const user = await createUser.execute({
            name, email, password
        })

        //Não mostrar o password 
        delete user.password;

        return response.json(user);
    }
}