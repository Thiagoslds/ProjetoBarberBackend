import {Router} from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'

const providersController = new ProvidersController();

//utiliza o router do express
const providersRouter = Router();

//Utiliza o middleware de autenticação criado em todas as rotas
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
