import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';

export default class ForgotPasswordController{
    public async create(request: Request, response: Response): Promise<Response>{
        const { email } = request.body;

        /*O resolve funciona como um new (), carregando o service e verificando se 
        ele precisa de alguma dependencia e retorna a instancia da classe*/ 
        const forgotPassword = container.resolve(ForgotPasswordService);

        await forgotPassword.execute({email});
        
        return response.status(204).json();
    }
}