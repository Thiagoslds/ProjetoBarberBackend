import {EntityRepository, Repository, getRepository} from 'typeorm';
//Repositórios servem para manipular (criar, alterar) entidades específicas

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'; //importa o modelo de entidade definido
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

@EntityRepository(Appointment) /*decorator para usar determinada classe customizada 
como repositorio 

--- Extendia da classe Repository do typeorm, que contem vários métodos, como insert, delete, etc, e 
ela recebe como parâmetro o model do repositorio, no caso Appointment. Dentro só especificamos
uma função que é personalizada. ---
Pelo padrão SOLID, tira-se a extensão e cria os métodos de forma mais manual 
Implementa a interface, que deve conter os métodos descritos nela*/

class AppointmentsRepository implements IAppointmentsRepository{ 
    private ormRepository: Repository<Appointment>; //declara o tipo

    /*Carrega algo assim que a classe é chamada*/
    constructor(){
        this.ormRepository = getRepository(Appointment); //Cria o repositorio do tipo Appointment
    } 
    
    /*como o findONe é uma promessa, deve ser async await. Retorno deve ser uma promise, que
    pode ser um Appointmenr ou null   */
    public async findByDate(date: Date): Promise<Appointment|undefined>{
        /*metodo definido findOne, encontra a primeira entidade que match as condições dadas*/
        const findAppointment = await this.ormRepository.findOne({
            where: { date } //condição tem que bater com a data recebida como parâmetro em findbydate
        });

        return findAppointment;
    }

    /*Define como será o método de criação, que também irá salvar*/
    public async create({provider_id, date}:ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = this.ormRepository.create({provider_id, date});
        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;