import {getRepository} from 'typeorm';
import path from 'path';
import fs from 'fs';
import {inject, injectable} from 'tsyringe';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/Users'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface Request {
    user_id: string,
    avatarFilename: string
}

@injectable()
class UpdateUserAvatarService{
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
        ){}

    public async execute({user_id, avatarFilename}: Request):Promise <User>{
        const user = await this.usersRepository.findById(user_id);

        //verifica se existe o usuário que foi passado
        if(!user){
            throw new AppError('Somente usuários autenticados.')
        }

        //se ja tiver o avatar, ele exclui o antigo para poder upar o novo
        if(user.avatar) 
            await this.storageProvider.deleteFile(user.avatar);

        /*chama a função para poder salvar o novo avatar*/
        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;

        await this.usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;