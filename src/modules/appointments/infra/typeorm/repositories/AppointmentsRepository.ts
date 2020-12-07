import {EntityRepository, Repository} from 'typeorm';
//Repositórios servem para manipular (criar, alterar) entidades específicas

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'; //importa o modelo de entidade definido
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

@EntityRepository(Appointment) /*decorator para usar determinada classe customizada 
como repositorio 

Extende da classe Repository do typeorm, que contem vários métodos, como insert, delete, etc, e 
ela recebe como parâmetro o model do repositorio, no caso Appointment. Dentro só especificamos
uma função que é personalizada
Implementa a interface, que deve conter os métodos descritos nela*/
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentsRepository{ 
    /*como o findONe é uma promessa, deve ser async await. Retorno deve ser uma promise, que
    pode ser um Appointmenr ou null   */
    public async findByDate(date: Date): Promise<Appointment|null>{
        /*metodo definido findOne encontra a primeira entidade que match as condições dadas*/
        const findAppointment = await this.findOne({
            where: { date } //condição tem que bater com a data recebida como parâmetro em findbydate
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;