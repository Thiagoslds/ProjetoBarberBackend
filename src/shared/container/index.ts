//Controla as dependencias da aplicação, injetando-as
//Utiliza as marcações @injectable e o @inject

import {container} from 'tsyringe';

import '@modules/users/providers'; //chama o gerador hash criado para injetar dependencia
import './providers' //chama o providers de salvamento dos arquivos

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

/*Singleton carrega apenas uma vez, utilizando apenas uma instancia*/
container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository', //Pode ser qualquer nome
    AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
    'UsersRepository', //Pode ser qualquer nome
    UsersRepository
)