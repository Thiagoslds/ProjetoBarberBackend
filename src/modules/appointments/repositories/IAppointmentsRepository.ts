/*Permite utilizar um modelo padrão de interface, que pode ser utilizado em diversos 
tipos de bancos de dados, nao dependendo de ser typeorm*/

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository{
    findByDate(date: Date): Promise<Appointment | null>
}