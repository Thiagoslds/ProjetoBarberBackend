import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeCacheProvider: FakeCacheProvider;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('ListProviders', ()=>{
    /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentRepository,
            fakeCacheProvider);
    })

    it('deve ser capaz de listar o agendamento em um dia especifico', async ()=>{
        const appointment1 = await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 14, 0, 0) //20/05/2020 às 14h:00m:00s
        })

        const appointment2 = await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'userid',
            date: new Date(2020, 4, 20, 15, 0, 0) //20/05/2020 às 8h:00m:00s
        })

        const appointments = await listProviderAppointments.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
            day: 20
        })

        /*Espera que o resultado, um array, seja igual ao array passado*/
        expect(appointments).toEqual(
            [appointment1, appointment2]
        )
    });

})