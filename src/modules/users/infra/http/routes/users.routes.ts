import { Router, response, request } from 'express';
import multer from 'multer';
import UsersController from '@modules/users/infra/http/controllers/UsersController'
import AvatarController from '@modules/users/infra/http/controllers/AvatarController'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

//utiliza o router do express
const usersRouter = Router();

const upload = multer(uploadConfig);
const usersController = new UsersController();
const avatarController = new AvatarController();

usersRouter.post('/', celebrate({
    /*confirmação de senha deve ser igual a senha*/
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string(). required(),
    }
}), usersController.create);

//patch para pequenas alterações 
usersRouter.patch('/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'), 
    avatarController.update
);

export default usersRouter;
