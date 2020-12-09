import {startOfHour} from 'date-fns'; //date-fns manipula data e hora
import {inject, injectable} from 'tsyringe'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';


//Interfaces são utilizadas em typescript, servindo como modelo para requerimento em função
interface Request{
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService{
    //Pelo SOLID, o serviço depende de uma interface, não do typeorm em si*/
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
        ) {}

    //função assincrona que requer um date e um provider
    public async execute({date, provider_id}: Request): Promise<Appointment>{
        const appointmentDate = startOfHour(date); //retorna a hora inicial da data que foi passada

        //busca pela mesma data especificada utilizando o repositorio construido
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)

        //se retornar como verdadeiro é pq ja utilizou o horario para agendamento
        if(findAppointmentInSameDate){
            throw new AppError('Esse agendamento já está sendo utilizado');
        }
        //cria um agendamento com o fornecedor e a hora determinada, não precisa ser assincrona pois
        //ela apenas instancia, não salva no banco de dados
        //foi definida no AppointmentsRepository
        const appointment = this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })

        return appointment;
    }
}

export default CreateAppointmentService;