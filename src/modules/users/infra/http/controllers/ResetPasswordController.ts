import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';


export default class ResetPasswordController{
    public async create(request: Request, response: Response): Promise<Response>{
        /*Pega as informações que vem do frontend*/
        const { password, token } = request.body;

        /*O resolve funciona como um new (), carregando o service e verificando se 
        ele precisa de alguma dependencia e retorna a instancia da classe*/ 
        const resetPassword = container.resolve(ResetPasswordService);

        /*Manda pro service executar*/
        await resetPassword.execute({
            token,
            password
        });
        
        return response.status(204).json();
    }
}