import {inject, injectable} from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { ca } from 'date-fns/locale';
import { classToClass } from 'class-transformer';

/*Lista o agendamento diario de um prestador que queira ver sua agenda*/

interface IRequest{
    provider_id: string;
    month: number;
    year: number;
    day: number;
}
/*Tem que ser um array, por isso utiliza o type para permitir, interface não permite*/
type IResponse = Array<{
    hour: number;
    available: boolean;
}>

@injectable()
export default class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async execute({provider_id, year, month, day}: IRequest): Promise<Appointment[]>{
        /*para salvar a agenda diaria do prestador em cache*/
        const cacheKey = `provider-appointments:${provider_id}:${year}:${month}:${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

        if(!appointments) {
            appointments = await this.appointmentsRepository.
                findAllInDayProvider({
            provider_id, year, month, day
            });

            await this.cacheProvider.save(cacheKey, classToClass(appointments));
        }

        return appointments;
    }
}