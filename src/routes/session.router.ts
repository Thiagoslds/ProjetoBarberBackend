import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

//utiliza o router do express
const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    //pega o valor do usuario, que é retornado na chamada do service de autenticação
    const { user, token } = await authenticateUser.execute({
        email, password
    })

    //Não mostrar o password 
    delete user.password;

    return response.json({ user, token });

})

export default sessionsRouter;
