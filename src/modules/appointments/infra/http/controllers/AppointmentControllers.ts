import {Request, Response} from 'express';
//import {parseISO} from 'date-fns'; //para converter uma string de iso em Date
import {container} from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


export default class AppointmentControllers{
    public async create(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id; /*Ele é setado automatico pelo middleware 
        ensureAuthenticated, pois é um usuário logado*/
        const {provider_id, date} = request.body; //destruct dos valores vindo do insomnia
        /*const parsedDate = parseISO(date); /*conversão da data para o formato Date. Aggora
        o Joi faz*/
        const createAppointment = container.resolve(CreateAppointmentService);
        
        /*Carrega o service, verifica no constructor se precisa de alguma dependencia, 
        vai no container e retorna uma instancia da classe*/

        /*Execução do appointment, mandando os valores obtidos do insomnia para o service
        Lá esses dados irão ser salvos no banco de dados. Aqui ela recebe os valores que foram 
        criados em uma nova instancia, onde é convertido em json. Seu formato é em array, com
        n posições, sendo n o numero de itens criados*/
        const appointment = await createAppointment.execute({
            date: date,
            provider_id,
            user_id
        });
        return response.json(appointment); 
    }
}