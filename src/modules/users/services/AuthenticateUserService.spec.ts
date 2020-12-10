import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';


describe('AuthenticateUser', ()=>{
    it('deve ser capaz de autenticar um novo usuario', async ()=>{
  
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        /*Cria um usuario para teste e depois autentica*/
        const user = await createUserService.execute({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        const response = await authenticateUser.execute({
            email: 'fulano@johndoe.com',
            password: '123456'
        })

        /*Esperado resultado que a resposta contenha o token autenticado 
        e que o usuario seja o mesmo que o criado*/
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    })
   
    it('nao deve ser capaz de autenticar usuario que não existe', async ()=>{
  
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        /*Cria um usuario para teste e depois autentica com um usuario que nao existe*/
        await createUserService.execute({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        expect(
            authenticateUser.execute({
                email: 'fulano2@johndoe.com',
                password: '123456' 
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('nao deve ser capaz de autenticar uma senha errada', async ()=>{
  
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        /*Cria um usuario para teste e depois tenta autenticar com uma senha errada*/
        await createUserService.execute({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        expect(
            authenticateUser.execute({
                email: 'fulano@johndoe.com',
                password: '1234567'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
})