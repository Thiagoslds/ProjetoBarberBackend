import {Router} from 'express';
import {getCustomRepository} from 'typeorm';
import {parseISO} from 'date-fns'; //para converter uma string de iso em Date

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//utiliza o router do express
const appointmentsRouter = Router();

//Utiliza o middleware de autenticação criado em todas as rotas
appointmentsRouter.use(ensureAuthenticated);

/*Através do server, que é iniciado na porta 3333, é recebido e atualizado os valores do insomnia,
utilizando os metodos get e post*/

appointmentsRouter.get('/', async (request,response) => {

    console.log(request.user);
    //utilização dos metodos do respositorio
    const appointmentsRepository = getCustomRepository(AppointmentsRepository); 
    //busca todos os dados do respositorio 
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
    try{
        const {provider_id, date} = request.body; //destruct dos valores vindo do insomnia
        const parsedDate = parseISO(date); //conversão da data para o formato Date
        const createAppointment = new CreateAppointmentService(); //instancia do service
        /*Execução do appointment, mandando os valores obtidos do insomnia para o service
        Lá esses dados irão ser salvos no banco de dados. Aqui ela recebe os valores que foram 
        criados em uma nova instancia, onde é convertido em json. Seu formato é em array, com
        n posições, sendo n o numero de itens criados*/
        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id 
        });
        return response.json(appointment);
    } catch(err){
        return response.status(400).json({error: err.message});
    }
})

export default appointmentsRouter;
