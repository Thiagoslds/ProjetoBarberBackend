import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/AppError';
import ListProviderService from './ListProviderService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let listProvider: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUserRepository;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('ListProviders', ()=>{
    /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeUserRepository = new FakeUserRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProvider = new ListProviderService(fakeUserRepository, fakeCacheProvider);
    })

    it('deve ser capaz de listar os prestadores', async ()=>{
       
        const user1 = await fakeUserRepository.create({
            name: 'Fulano A',
            email: 'fulanoa@jonhdoe.com',
            password: '123456'
        });

        const user2 = await fakeUserRepository.create({
            name: 'Fulano B',
            email: 'fulanob@jonhdoe.com',
            password: '123456'
        });

        const loggedUser = await fakeUserRepository.create({
            name: 'Fulano Principal',
            email: 'fulanop@jonhdoe.com',
            password: '123456'
        });

        const providers = await listProvider.execute({
            user_id: loggedUser.id
        })

        console.log(providers)
        expect(providers).toEqual([user1, user2]);
    })

})