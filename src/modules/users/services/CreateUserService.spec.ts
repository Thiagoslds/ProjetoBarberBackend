import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('CreateUser', ()=>{
    it('deve ser capaz de criar um usuario', async ()=>{
        /*Cria o service, passando o repositorio fake, nao salvando no banco e sim na 
        memoria  */
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

        /*Cria um usuario para teste */
        const user = await createUser.execute({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        /*Esperado resultado*/
        expect(user).toHaveProperty('id');
    })

    it('nao deveria ser capaz de criar um usuario com um email existente', async ()=>{
        
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);


        await createUser.execute({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        /*Esperado resultado*/
        await expect(
            createUser.execute({
                name: 'Fulano',
                email: 'fulano@johndoe.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
   
})