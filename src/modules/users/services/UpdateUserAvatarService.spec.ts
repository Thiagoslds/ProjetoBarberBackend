import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatar: UpdateUserAvatarService;

describe('CreateUser', ()=>{
    beforeEach(()=>{
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeStorageProvider = new FakeStorageProvider();
        updateAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    })
    it('deve ser capaz atualizar o avatar', async ()=>{     

        /*Cria um usuario para teste */
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg' //envia apenas uma string para teste
        })

        /*Esperado resultado*/
        expect(user.avatar).toBe('avatar.jpg');
    })

    it('nao deve ser capaz de atualizar o avatar de um usuario nao existente', async ()=>{
        expect(
            updateAvatar.execute({
                user_id: 'non exist', //envia um usuario que nao existe
                avatarFilename: 'avatar.jpg' //envia apenas uma string para teste
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('deve deletar o avatar quando atualizado para um novo', async ()=>{
        
        const deleteAvatar = jest.spyOn(fakeStorageProvider, 'deleteFile'); /* Com o uso do 
        jest ele retorna a função referente ao deletefile do arquivo fake storageprovider*/
        
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg' //envia apenas uma string para teste
        })

        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg' //envia apenas uma string para teste
        })

        expect(deleteAvatar).toHaveBeenCalledWith('avatar.jpg') /*Esperado que a função de deletar 
        tenha sido chamado com o parametro do avatar inicial*/
        expect(user.avatar).toBe('avatar2.jpg');

    })
})