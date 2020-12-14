import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/AppError';
import ForgotPasswordService from './ForgotPasswordService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository'
import ShowProfileService from './ShowProfileService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let forgotPassword: ForgotPasswordService;
let showProfile: ShowProfileService;
let fakeHashProvider: FakeHashProvider;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('ForgotPassword', ()=>{
    /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository()
        showProfile = new ShowProfileService(fakeUserRepository);
    })

    it('deve ser capaz de mostrar o perfil', async ()=>{
       
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@jonhdoe.com',
            password: '123456'
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('Fulano');
        expect(profile.email).toBe('fulano@jonhdoe.com');
    })

    it('nao deve ser capaz de mostrar o perfil de um usuario inexistente', async ()=>{
       
        expect(showProfile.execute({
            user_id:'nao-existente',
        })).rejects.toBeInstanceOf(AppError);        
    })

})