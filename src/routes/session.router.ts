import {Router} from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

//utiliza o router do express
const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try{
        const {email, password} = request.body;

        const authenticateUser = new AuthenticateUserService();

        //pega o valor do usuario, que é retornado na chamada do service de autenticação
        const {user} = await authenticateUser.execute({
            email, password
        })

        //Não mostrar o password 
        delete user.password;
        
        return response.json({user});
    } catch(err){
        return response.status(400).json({error: err.message});
    }
})

export default sessionsRouter;
