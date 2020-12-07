import {startOfHour} from 'date-fns'; //date-fns manipula data e hora
import {getCustomRepository} from 'typeorm'; //permite utilizar os métodos padrões do repositorio

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import AppError from '@shared/errors/AppError'

//Interfaces são utilizadas em typescript, servindo como modelo para requerimento em função
interface Request{
    provider_id: string;
    date: Date;
}

class CreateAppointmentService{
    //função assincrona que requer um date e um provider
    public async execute({date, provider_id}: Request): Promise<Appointment>{
        //a constante agora pode utilizar os metodos delete, update, save, etc
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date); //retorna a hora inicial da data que foi passada

        //busca pela mesma data especificada utilizando o repositorio construido
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

        //se retornar como verdadeiro é pq ja utilizou o horario para agendamento
        if(findAppointmentInSameDate){
            throw new AppError('Esse agendamento já está sendo utilizado');
        }
        //cria um agendamento com o fornecedor e a hora determinada, não precisa ser assincrona pois
        //ela apenas instancia, não salva no banco de dados
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })
        //salva a entidade no banco de dados
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;