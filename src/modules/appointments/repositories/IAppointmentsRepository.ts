/*Permite utilizar um modelo padrão de interface, que pode ser utilizado em diversos 
tipos de bancos de dados, nao dependendo de ser typeorm*/

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO'
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayProviderDTO'

export default interface IAppointmentsRepository{
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
    findAllInMonthProvider(data: IFindAllInMonthProviderDTO): Promise<Appointment[]>;
    findAllInDayProvider (data: IFindAllInDayProviderDTO): Promise<Appointment[]>
}