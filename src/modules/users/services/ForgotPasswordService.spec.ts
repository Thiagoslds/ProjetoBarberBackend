import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/AppError';
import ForgotPasswordService from './ForgotPasswordService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository'

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let forgotPassword: ForgotPasswordService;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('ForgotPassword', ()=>{
    /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository()
        forgotPassword = new ForgotPasswordService(
            fakeUserRepository, 
            fakeMailProvider,
            fakeUserTokensRepository
        );
    })

    it('deve ser capaz de recuperar uma senha usando o email', async ()=>{
       
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        /*Cria um usuario para teste */
        const user = await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        await forgotPassword.execute({
            email: 'fulano@johndoe.com'
        })

        expect(generateToken).toHaveBeenCalledWith(user.id);
    })

    it('nao deve ser capaz de recuperar a senha de um email nao existente', async ()=>{
       
        const verifySendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

        //await para aguardar a execução antes de verificar 
        await expect(
            forgotPassword.execute({
                email:'fulano@johndoe.com'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('deve ser capaz de gerar um token de recuperação de senha', async ()=>{
      
        const verifySendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

        /*Cria um usuario para teste */
        await fakeUserRepository.create({
            name: 'Fulano',
            email: 'fulano@johndoe.com',
            password: '123456'
        });

        await forgotPassword.execute({
            email: 'fulano@johndoe.com'
        })

        expect(verifySendEmail).toHaveBeenCalled();
    })
})