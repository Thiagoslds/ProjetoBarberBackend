import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', ()=>{
    beforeEach(()=>{
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        createUser = new CreateUserService(fakeUserRepository, 
            fakeHashProvider, fakeCacheProvider);
    })
    it('deve ser capaz de autenticar um novo usuario', async ()=>{

        /*Cria um usuario para teste e depois autentica*/
        const user = await createUser.execute({
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
  
        /*Cria um usuario para teste e depois autentica com um usuario que nao existe*/
        await createUser.execute({
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
        /*Cria um usuario para teste e depois tenta autenticar com uma senha errada*/
        await createUser.execute({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        await expect(
            authenticateUser.execute({
                email: 'fulano@johndoe.com',
                password: '1234567'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
})