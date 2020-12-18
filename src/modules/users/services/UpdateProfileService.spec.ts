import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository'
import UpdateProfile from './UpdateProfileService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let updateProfile: UpdateProfile;
let fakeHashProvider: FakeHashProvider;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('ForgotPassword', ()=>{
    /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfile(fakeUserRepository, fakeHashProvider);
    })

    it('deve ser capaz de atualizar o perfil', async ()=>{
       
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@jonhdoe.com',
            password: '123456'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Fulanoide',
            email: 'fulanoide@johndoe.com'
        });

        expect(updatedUser.name).toBe('Fulanoide');
        expect(updatedUser.email).toBe('fulanoide@johndoe.com');
    })

    it('deve ser capaz de atualizar a senha', async ()=>{
       
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@jonhdoe.com',
            password: '123456'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Fulanoide',
            email: 'fulano@jonhdoe.com',
            old_password: '123456',
            password: '000000'
        });

        expect(updatedUser.password).toBe('000000');
    })

    it('nao deve ser capaz de atualizar o perfil de um usuario inexistente', async ()=>{
       
        expect(updateProfile.execute({
            user_id:'nao-existente',
            name: 'Test',
            email: 'test@example.com'
        })).rejects.toBeInstanceOf(AppError);        
    })

    it('não deve ser capaz de atualizar a senha com senha errada antiga', async ()=>{
       
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@jonhdoe.com',
            password: '123456'
        });

        await expect(
            updateProfile.execute({
            user_id: user.id,
            name: 'Fulanoide',
            email: 'fulano@jonhdoe.com',
            old_password: 'senhaerrada',
            password: '000000'
        })).rejects.toBeInstanceOf(AppError);

    })
})