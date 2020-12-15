import {inject, injectable} from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest{
    provider_id: string;
    month: number;
    year: number;
}
/*Tem que ser um array, por isso utiliza o type para permitir, interface não permite*/
type IResponse = Array<{
    day: number;
    available: boolean;
}>

/*[{day: 1, available: false}]
[{day: 2, available: true}]*/


@injectable()
export default class ListProviderMonthAvaService {
    constructor(
        @inject('AppointmentRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({provider_id, month, year}: IRequest): Promise<IResponse>{
        const appointments = await this.appointmentsRepository.findAllInMonthProvider(
            {
                provider_id, year, month
            });
            console.log(appointments);
            return [{day: 1, available: false}];
    }
}