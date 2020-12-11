import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/AppError';
import ForgotPasswordService from './ForgotPasswordService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let forgotPassword: ForgotPasswordService;
let resetPassword: ResetPasswordService;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('ResetPasswordService', ()=>{
    /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPassword = new ResetPasswordService(
            fakeUserRepository, fakeUserTokensRepository, fakeHashProvider);
        forgotPassword = new ForgotPasswordService(
            fakeUserRepository, 
            fakeMailProvider,
            fakeUserTokensRepository
        );
    })

    it('deve ser capaz de resetar uma senha', async ()=>{
        /*Cria um usuario para teste */
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        const {token} = await fakeUserTokensRepository.generate(user.id);
        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: '000000',
            token
        })

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('000000');
        expect(updatedUser?.password).toBe('000000');
    })

    it('nao deve ser capaz de resetar a senha com token inexistente', async ()=>{
        await expect(
            resetPassword.execute({
                token: 'token_inexistente',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('nao deve ser capaz de resetar a senha com usuario inexistente', async ()=>{
        const {token} = await fakeUserTokensRepository.generate('usuario_inexistente');
        
        await expect(
            resetPassword.execute({
                token,
                password: '123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('nao deve ser capaz de resetar uma senha depois de 2 horas', async ()=>{
        /*Cria um usuario para teste */
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        const {token} = await fakeUserTokensRepository.generate(user.id);

        /*O mock simula uma função, alterando o resultado quando executado.
        Aqui altera-se quando chama o date.now, atrasando 3 horas da hora correta */
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                password: '000000',
                token
        })).rejects.toBeInstanceOf(AppError);

    })
})