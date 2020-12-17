import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate'; //validação de middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentControllers from '@modules/appointments/infra/http/controllers/AppointmentControllers'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsRouter = Router();
const appointmentControllers = new AppointmentControllers();
//utiliza o router do express
const providerAppointmentsController = new ProviderAppointmentsController();

/*Não precisa tirar a dependencia das rotas com o typeorm pois eles estão na mesma camada de infra,
ao contrario do services*/

//Utiliza o middleware de autenticação criado em todas as rotas
appointmentsRouter.use(ensureAuthenticated);

/*Através do server, que é iniciado na porta 3333, é recebido e atualizado os valores do insomnia ou
frontend, utilizando os metodos get e post
O controlador faz toda a configuração*/
 
appointmentsRouter.post('/', celebrate({
    /*Body do json precisa dessas duas informações*/
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date()
    }
}), appointmentControllers.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
