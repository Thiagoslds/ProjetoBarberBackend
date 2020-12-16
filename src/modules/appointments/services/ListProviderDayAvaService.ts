import {inject, injectable} from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import { getDaysInMonth, getDate, getHours, isAfter } from 'date-fns'

/*Mostra todos agendamentos em um dia de um prestador*/

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
export default class ListProviderDayAvaService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({provider_id, year, month, day}: IRequest): Promise<IResponse>{

        const appointments = await this.appointmentsRepository.
        findAllInDayProvider({
                provider_id, year, month, day
        });

        const hourStart = 8;    

        const eachHourArray = Array.from(
            {length: 10},
            (_, index) => index+hourStart /*a hora que se inicia será as 8, com o primeiro 
            agendamento. Vetor de 8 as 17*/
        );
        
        const currentDate = new Date(Date.now()); /*pega a data atual, dessa forma para
        facilitar o mock*/

        /*Verifica em cada hora se existe um agendamento marcado
        Retorna um array de objetos, com o horario e a disponibilidade*/
        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(appointmentVar =>
                getHours(appointmentVar.date) === hour
            );

            const compareDate = new Date(year, month-1, day, hour);

            /*Se tiver agendamento no horario, passa false
            tambem precisa ser uma data futura, após a data atual*/
            return {
                hour,
                available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
            }
        })
        return availability;
    }
}