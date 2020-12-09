/*Imita o repositorio sem ter ligação com banco de dados para teste */
import {v4 as uuidv4} from 'uuid';
import {isEqual} from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'; //importa o modelo de entidade definido
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class AppointmentsRepository implements IAppointmentsRepository{ 

    private appointments: Appointment[] = []; /*cria um array para armazenar cada criação
    de appointment*/

    public async findByDate(date: Date): Promise<Appointment|undefined>{
        /*busca o vetor de appointment*/
        const findAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date)
        )
        return findAppointment;
    }

    /*Define como será o método de criação, que também irá salvar*/
    public async create({provider_id, date}:ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = new Appointment(); /*instancia uma classe simples do 
        apppointment sem relação com typeorm*/
        
        Object.assign(appointment, {id: uuidv4(), date, provider_id}); /*Semelhante a
        appointment.id = uuidv4()
        appointment.date = date
        appointment.provider_id = provider_id */

        this.appointments.push(appointment);
        return appointment;

    }
}

export default AppointmentsRepository;