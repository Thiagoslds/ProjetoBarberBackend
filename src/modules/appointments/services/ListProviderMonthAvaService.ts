import {inject, injectable} from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import { getDaysInMonth, getDate, isAfter } from 'date-fns'

/*Lista o agendamento mensal de um prestador, se tem alguma disponibilidade naquele dia*/

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
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({provider_id, month, year}: IRequest): Promise<IResponse>{
        const appointments = await this.appointmentsRepository.
        findAllInMonthProvider({
                provider_id, year, month
            });

            /*Retorna quantos dias tem o mes solicitado, ajustando o -1 ao javascript q inicia 
            com 0*/
            const numberOfDaysInMonth = getDaysInMonth(new Date(year, month-1));

            /*Cria uma array com as condições especificadas
            objeto com o tamanho do array e uma função que recebe o valor (que estpa vazio)
            e o indíce. Retorna com o novo valor do indice, que no caso é o proprio indice mais um
            [1, 2, 3, ... 30, 31] */
            const eachDayArray = Array.from(
                {length: numberOfDaysInMonth},
                (_, index) => index+1
            );

            /*Para cada dia, filtra todos os apontamentos existentes e verifica 
            todos os agendamentos que tem no proprio dia*/
            const availability = eachDayArray.map(day => {
                /*mostra o dia do mes, na ultima hora do dia*/
                const compareDate = new Date(year, month-1, day, 23,59,59);

                const appointmentsInDay = appointments.filter(appointmentVar =>{
                    return getDate(appointmentVar.date) === day;
                })

                /*Como os agendamentos sao de 8 as 17, verifica se a variavel appointmentsInDay
                é menor que 10 para ter diponibilidade ou igual se nao tiver vaga*/
                return {
                    day,
                    available: appointmentsInDay.length < 10 && 
                    isAfter(compareDate, new Date())
                }
            })
            
            return availability;
    }
}