import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProvidersDayService from './ListProviderDayAvaService'

let listProviderDay: ListProvidersDayService;
let fakeAppointmentRepository: FakeAppointmentRepository;

/*describe com um conjunto de testes pertencentes a uma categoria e o it faz
o mesmo que test*/
describe('ListProviders', ()=>{
    /*Executa essa função antes de cada it, contendo as instancias das variaveis*/
    beforeEach(()=>{
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderDay = new ListProvidersDayService(fakeAppointmentRepository);
    })

    it('deve ser capaz de listar a disponibilidade diaria dos prestadores', async ()=>{
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

        /*Cria uma data ficticia de 11h*/
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2020, 4, 20, 11).getTime();
        })

        const availability = await listProviderDay.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
            day: 20
        })

        /*Espera que o resultado, um array, seja igual ao array passado*/
        expect(availability).toEqual(
            expect.arrayContaining([
                {hour: 8, available: false},
                {hour: 9, available: false},
                {hour: 10, available: false},
                {hour: 13, available: true},
                {hour: 14, available: false},
                {hour: 15, available: false},
                {hour: 16, available: true},
            ])
        )
    })

})