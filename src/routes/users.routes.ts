import {Router} from 'express';

import CreateUserService from '../services/CreateUserService';

//utiliza o router do express
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try{
        const {name, email, password} = request.body;
        const createUser = new CreateUserService();

        //Manda os dados obtidos pelo INsomnia pro services do usuario, onde sera salvo
        const user = await createUser.execute({
            name, email, password
        })

        //Não mostrar o password 
        delete user.password;
        
        return response.json(user);
    } catch(err){
        return response.status(400).json({error: err.message});
    }
})

export default usersRouter;
