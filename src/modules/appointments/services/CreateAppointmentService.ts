import {startOfHour, isBefore, getHours, format} from 'date-fns'; //date-fns manipula data e hora
import {inject, injectable} from 'tsyringe'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

/*Serviço para o usuário criar um agendamento com algum prestador*/

//Interfaces são utilizadas em typescript, servindo como modelo para requerimento em função
interface Request{
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService{
    //Pelo SOLID, o serviço depende de uma interface, não do typeorm em si*/
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
        ) {}

    //função assincrona que requer um date e um provider
    public async execute({date, provider_id, user_id}: Request): Promise<Appointment>{
        const appointmentDate = startOfHour(date); //retorna a hora inicial da data que foi passada

        if(isBefore(appointmentDate, Date.now())) 
            throw new AppError('Você não pode agendar uma data passada.')

        if(user_id === provider_id)
            throw new AppError('Você não pode agendar consigo próprio.')

        if(getHours(appointmentDate)<8 || getHours(appointmentDate)>17)
            throw new AppError('Você só pode agendar entre 8h e 17h.')

        //busca pela mesma data especificada utilizando o repositorio construido
        const findAppointmentInSameDate = await this.appointmentsRepository.
            findByDate(appointmentDate);

        //se retornar como verdadeiro é pq ja utilizou o horario para agendamento
        if(findAppointmentInSameDate){
            throw new AppError('Esse agendamento já está sendo utilizado');
        }
        /* cria um agendamento com o fornecedor e a hora determinada, não precisa ser assincrona pois
        ela apenas instancia, não salva no banco de dados
        foi definida no AppointmentsRepository */
        const appointment = this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate
        })

        /*Formata a data para ser utilizada na criação de uma notificação*/
        /*aspas simples escapa*/
        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormatted}`
        })

        /*Quando um horario novo é criado, necessario apagar o cache do dia */
        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(
            appointmentDate,
            'yyyy-M-d' 
        )}`)

        return appointment;
    }
}

export default CreateAppointmentService;