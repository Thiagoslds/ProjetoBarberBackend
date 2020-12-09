import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('CreateAppointment', ()=>{
    it('should be able to create a new appointment', async ()=>{
        /*Cria o service, passando o repositorio fake, nao salvando no banco e sim na 
        memoria  */
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

        /*Cria um agendamento para teste */
        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123456'
        });

        /*Esperado resultado*/
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    })

    it('should be not able to create two appointments in same date', async ()=>{
        /*Cria o service, passando o repositorio fake, nao salvando no banco e sim na 
        memoria  */
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

        const appointmentDate = new Date();

        /*Cria um agendamento para teste com a data atual */
        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456'
        });

        /*Resultado deve ser de erro para a mesma data e seja uma instancia do erro*/
        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
})