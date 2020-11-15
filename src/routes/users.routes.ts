import { Router, response, request } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService';
import updateUserAvatar from '../services/UpdateUserAvatarService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

//utiliza o router do express
const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();

        //Manda os dados obtidos pelo INsomnia pro services do usuario, onde sera salvo
        const user = await createUser.execute({
            name, email, password
        })

        //Não mostrar o password 
        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

//patch para pequenas alterações 
usersRouter.patch('/avatar', ensureAuthenticated,
    upload.single('avatar'),  //single: upload de um unico arquivo; tem array para vários arquivos
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });

        delete user.password;

        return response.json(user)
    });

export default usersRouter;
