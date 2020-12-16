import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

/*Pega os dados do frontend referentes a lista de providers*/
export default class ProviderDayAvaController{
    public async index(request: Request, response: Response): Promise<Response>{
        const provider_id = request.user.id;
        const {day, month, year} = request.body;
        const listProviderAppointment = container.resolve(ListProviderAppointmentsService);
        
        const appointments = await listProviderAppointment.execute({
            provider_id, day, month, year
        });
        return response.json(appointments); 
    }
}