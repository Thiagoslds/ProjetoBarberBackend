import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController'
import { celebrate, Segments, Joi } from 'celebrate';

//utiliza o router do express
const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', celebrate({
    /*confirmação de senha deve ser igual a senha*/
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string(),
    }
}), sessionsController.create);

export default sessionsRouter;
