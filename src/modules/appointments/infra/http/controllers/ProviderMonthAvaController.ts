import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListProviderMonthAvaService from '@modules/appointments/services/ListProviderMonthAvaService';

/*Pega os dados do frontend referentes a lista de providers*/
export default class ProviderMonthAvaController{
    public async index(request: Request, response: Response): Promise<Response>{
        const {provider_id} = request.params;
        const {month, year} = request.body;
        const listProvidersMonth = container.resolve(ListProviderMonthAvaService);
        
        const availability = await listProvidersMonth.execute({
            provider_id, month, year
        });
        return response.json(availability); 
    }
}