import {Entity, Column, PrimaryGeneratedColumn,
     CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/Users'

//Sem aula sobre o início de classe e construtor

@Entity('appointments') /*Decorators, funciona como uma função que passa a classe como parametro
Cria uma entidade (classe que mapeia para um banco de dados), com o nome da tabela criada de
appointments. Será criada as colunas especificadas na classe abaixo */
class Appointment {
    @PrimaryGeneratedColumn('uuid') //coluna com chave primaria gerada
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(()=> User) //um usuario pode fazer varios agendamentos
    @JoinColumn({ name: 'provider_id' }) //objeto para se relacionar
    provider: User; //referência ao user

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;