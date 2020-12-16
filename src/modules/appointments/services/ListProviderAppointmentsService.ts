import {inject, injectable} from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment';

/*Lista o agendamento diario de um prestador*/

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
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({provider_id, year, month, day}: IRequest): Promise<Appointment[]>{

        const appointments = await this.appointmentsRepository.
        findAllInDayProvider({
            provider_id, year, month, day
        });

        return appointments;
    }
}