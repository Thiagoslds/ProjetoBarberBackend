import { Router, response, request } from 'express';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//utiliza o router do express
const profileRouter = Router();

const profileController = new ProfileController();
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
