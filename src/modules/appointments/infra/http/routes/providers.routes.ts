import {Router} from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderMonthAvaController from '../controllers/ProviderMonthAvaController';
import ProviderDayAvaController from '../controllers/ProviderDayAvaController';

const providersController = new ProvidersController();
const providerMonthAvaController = new ProviderMonthAvaController();
const providerDayAvaController = new ProviderDayAvaController();

//utiliza o router do express
const providersRouter = Router();

//Utiliza o middleware de autenticação criado em todas as rotas
providersRouter.use(ensureAuthenticated);

/*localhost:3333/providers/:id/month-availability
localhost:3333/providers/:id/day-availability*/
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvaController.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvaController.index);

export default providersRouter;
