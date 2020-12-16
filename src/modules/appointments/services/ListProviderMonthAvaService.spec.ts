import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProviderMonthAvaService from './ListProviderMonthAvaService'

let listProviderMonthAva: ListProviderMonthAvaService;
let fakeAppointmentRepository: FakeAppointmentRepository;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('ListProviders', ()=>{
    /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderMonthAva = new ListProviderMonthAvaService(fakeAppointmentRepository);
    })

    it('deve ser capaz de listar a disponibilidade mensal dos prestadores', async ()=>{
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 8, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 9, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 10, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 11, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 12, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 13, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 14, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 15, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 16, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 17, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 21, 8, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        const availability = await listProviderMonthAva.execute({
            provider_id: 'user',
            year: 2020,
            month: 5
        })

        /*Espera que o resultado, um array, seja igual ao array passado*/
        expect(availability).toEqual(
            expect.arrayContaining([
                {day: 19, available: true},
                {day: 20, available: false},
                {day: 21, available: true},
                {day: 22, available: true},
            ])
        )
    })

})