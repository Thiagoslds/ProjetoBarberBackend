import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController'
import { celebrate, Segments, Joi } from 'celebrate';

//utiliza o router do express
const passwordRouter = Router();
const forgotPassword = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();

passwordRouter.post('/forgot', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
    }
}), forgotPassword.create);
passwordRouter.post('/reset', celebrate({
    /*confirmação de senha deve ser igual a senha*/
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
}), resetPassword.create);

export default passwordRouter;
