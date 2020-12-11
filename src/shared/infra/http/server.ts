/*Arquivo Principal primário
Através do Express, chama o index do Routes, com as rotas para cada parte da aplicação

*/

import 'reflect-metadata'; //necessário para o typescript e utilização de decorators

import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';
import '@shared/container'

import routes from '@shared/infra/http/routes'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';

const app = express();

app.use(cors()); //Evita sites que não são confiaveis e monitora o acesso; nao precisa pro insomnia e native
app.use(express.json());
//visualização dos arquivos de forma estática, por ex. dentro do navegador
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if(err instanceof AppError){
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message
            });
        }

        console.error(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error '
        })
        
    }
)

app.listen(3333, ()=>{
    console.log('Server started!')
})
