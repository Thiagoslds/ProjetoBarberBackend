import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListProviderDayAvaService from '@modules/appointments/services/ListProviderDayAvaService';

/*Pega os dados do frontend referentes a lista de providers*/
export default class ProviderDayAvaController{
    public async index(request: Request, response: Response): Promise<Response>{
        const {provider_id} = request.params;
        const {day, month, year} = request.body;
        const listProvidersDay = container.resolve(ListProviderDayAvaService);
        
        const availability = await listProvidersDay.execute({
            provider_id, day, month, year
        });
        return response.json(availability); 
    }
}