import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('CreateAppointment', ()=>{
        /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeAppointmentRepository = new FakeAppointmentRepository();
        createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
    })

    it('deveria ser capaz de criar um novo agendamento em determinada data', async ()=>{
        /*Cria o service, passando o repositorio fake, nao salvando no banco e sim na 
        memoria  */

        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2020, 4, 10, 12).getTime();
        });

        /*Cria um agendamento para teste */
        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: '1234567',
            provider_id: '123456'
        });

        /*Esperado resultado*/
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    })

    it('nao deveria ser capaz de criar dois agendamentos na mesma data', async ()=>{

        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2020, 4, 10, 11).getTime();
        });

        const appointmentDate = new Date(2020, 4, 10, 12);
        console.log('a', appointmentDate)

        /*Cria um agendamento para teste com a data atual */
        await createAppointment.execute({
            date: appointmentDate,
            user_id: '1234567',
            provider_id: '123456'
        });

        console.log('b', appointmentDate)

        /*Resultado deve ser de erro para a mesma data e seja uma instancia do erro*/
        expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '1234567',
                provider_id: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('nao deveria ser capaz de criar agendamentos em data passada', async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: '1234567',
                provider_id: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('nao deveria ser capaz de criar agendamentos com mesmo usuario que o prestador', async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                user_id: '123456',
                provider_id: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('nao deveria ser capaz de criar agendamentos antes das 8 e depois das 17', async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 7),
                user_id: '123456',
                provider_id: '1234567'
            })
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 18),
                user_id: '123456',
                provider_id: '1234567'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
})