/*Permite utilizar um modelo padrão de interface, que pode ser utilizado em diversos 
tipos de bancos de dados, nao dependendo de ser typeorm*/

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

export default interface IAppointmentsRepository{
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>
}