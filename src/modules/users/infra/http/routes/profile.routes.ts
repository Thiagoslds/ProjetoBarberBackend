import { Router, response, request } from 'express';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

//utiliza o router do express
const profileRouter = Router();

const profileController = new ProfileController();
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', celebrate({
    /*confirmação de senha deve ser igual a senha*/
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
}), profileController.update);

export default profileRouter;
