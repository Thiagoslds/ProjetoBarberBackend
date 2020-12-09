import {Router} from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentControllers from '@modules/appointments/infra/http/controllers/AppointmentControllers'

const appointmentControllers = new AppointmentControllers();

/*Não precisa tirar a dependencia das rotas com o typeorm pois eles estão na mesma camada de infra,
ao contrario do services*/


//utiliza o router do express
const appointmentsRouter = Router();

//Utiliza o middleware de autenticação criado em todas as rotas
appointmentsRouter.use(ensureAuthenticated);


/*Através do server, que é iniciado na porta 3333, é recebido e atualizado os valores do insomnia ou
frontend, utilizando os metodos get e post
O controlador faz toda a configuração*/

/*
appointmentsRouter.get('/', async (request,response) => {

    //utilização dos metodos do respositorio
    //const appointmentsRepository = getCustomRepository(AppointmentsRepository); 
    
    //busca todos os dados do respositorio 
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})*/

appointmentsRouter.post('/', appointmentControllers.create);

export default appointmentsRouter;
