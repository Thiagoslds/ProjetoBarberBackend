import authConfig from '../config/auth'
import { Request, Response, NextFunction } from 'express'
import {verify} from 'jsonwebtoken'
import AppError from '../errors/AppError';

interface TokenPayLoad{
    iat: number; //referente a quando o token foi gerado
    exp: number; //quando token vai expirar
    sub: string; //qual usuário criou o token
}

/*Verifica se o usuário está autenticado
Utilizando o Express é necessário importar os tipos para declaração 
de req, res, next*/
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    //pega os tokens do cabeçalho da requisição
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new AppError('Token JWT não encontrado.', 401);
    }

    /*Beared xxxxxxXx
    Necessário dividir o string e fazer destruct; como o primeiro valor não será utilizado, deixa em branco*/
    const [test, token] = authHeader.split(' ');
    try{
        //verifica efetivamente se o token dado é o que foi salvo
        const decoded = verify(token, authConfig.jwt.secret);

        //pega as informações que sao geradas pelo verify (iat, exp e o sub)
        const {sub} = decoded as TokenPayLoad;

        //atribui o id do usuario ao user do request (adicionado a biblioteca em outro arquivo)
        request.user = {
            id: sub
        }

        return next();
    } catch{ //catch sem parametro a principio so em ts
        throw new AppError('Token JWT Inválido', 401);
    }
}