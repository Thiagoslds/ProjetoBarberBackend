import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('CreateUser', ()=>{
    it('should be able to create a new user', async ()=>{
        /*Cria o service, passando o repositorio fake, nao salvando no banco e sim na 
        memoria  */
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        /*Cria um usuario para teste */
        const user = await createUser.execute({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        /*Esperado resultado*/
        expect(user).toHaveProperty('id');
    })

    it('should be not able to create a new user with same email from another', async ()=>{
        
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        await createUser.execute({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        /*Esperado resultado*/
        expect(
            createUser.execute({
                name: 'Fulano',
                email: 'fulano@johndoe.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
   
})