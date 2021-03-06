import {EntityRepository, Repository, getRepository, Raw} from 'typeorm';
//Repositórios servem para manipular (criar, alterar) entidades específicas

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'; //importa o modelo de entidade definido
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

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
    public async findByDate(date: Date, provider_id: string): Promise<Appointment|undefined>{
        /*metodo definido findOne, encontra a primeira entidade que match as condições dadas*/
        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id } //condição tem que bater com a data recebida como parâmetro em findbydate
        });

        return findAppointment;
    }

    /*Define como será o método de criação, que também irá salvar*/
    public async create({provider_id, user_id, date}:ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = this.ormRepository.create({provider_id, user_id, date});
        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async findAllInMonthProvider({provider_id, month, year}: IFindAllInMonthProviderDTO):
     Promise<Appointment[]>{
        const parsedMonth = String(month).padStart(2, '0'); /*converte o mes para string e 
        adiciona 0 a esquerda (start), caso nao tenha dois digitos*/

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw( /*Permite utilizar funções que atuam direto no postgre*/
                    nomeCampo => 
                    /*o nome campo contem o nome que o typeorm chama o date dentro do banco de
                    dados, que então é convertido para uma string, no formato de mes e ano definido
                    pelo postgre;
                    Ele verifica se é igual ao mes e ano passado pra função, com o mes convertido*/
                    `to_char(${nomeCampo}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                )
            }
        });
        
        return appointments;
    }

    public async findAllInDayProvider({provider_id, month, year, day}: IFindAllInDayProviderDTO):
     Promise<Appointment[]>{
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0'); /*converte o mes para string e 
        adiciona 0 a esquerda (start), caso nao tenha dois digitos*/

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw( /*Permite utilizar funções que atuam direto no postgre*/
                    nomeCampo => 
                    /*o nome campo contem o nome que o typeorm chama o date dentro do banco de
                    dados, que então é convertido para uma string, no formato de mes e ano definido
                    pelo postgre;
                    Ele verifica se é igual ao mes e ano passado pra função, com o mes convertido*/
                    `to_char(${nomeCampo}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                )
            },
            relations: ['user'] //retorna também os dados do usuário. Eager Loading
        });
        
        return appointments;
    }
}

export default AppointmentsRepository;