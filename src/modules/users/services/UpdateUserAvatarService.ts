import {getRepository} from 'typeorm';
import path from 'path';
import fs from 'fs';
import {inject, injectable} from 'tsyringe';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/Users'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';


interface Request {
    user_id: string,
    avatarFilename: string
}

@injectable()
class UpdateUserAvatarService{
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
        ){}

    public async execute({user_id, avatarFilename}: Request):Promise <User>{
        const user = await this.usersRepository.findById(user_id);

        //verifica se existe o usuário que foi passado
        if(!user){
            throw new AppError('Somente usuários autenticados.')
        }

        //se ja tiver o avatar, ele exclui o antigo para upar o novo
        if(user.avatar){
            //caminho para o arquivo com imagem do avatar, usando o endereço que esta no upload
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            //utilizando o modulo fs, filestream, do node, verifica o status do arquivo, utilizando
            //para verificar se ja possui o arquivo no caminho
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
        
            //deleta o arquivo do caminho especificado
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        //subtitui o caminho antigo com o novo arquivo
        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;