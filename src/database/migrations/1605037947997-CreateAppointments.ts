import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1605037947997 implements MigrationInterface {

    //O up determina o que será feito quando a migration for executada
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments', //padrão do dev foi minuscula, plural e _
                columns:[
                {
                    name: 'id',
                    type: 'uuid', //por ser o uuid do appointments
                    isPrimary: true, //chave primária
                    generationStrategy: 'uuid', //gera o campo id de forma automatica como uuid
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'provider',
                    type: 'varchar',
                },
                {
                    name: 'date',
                    type: 'timestamp with time zone', //pega a data com seu timezone, apenas em pg
                },
                //criado e atualizado para facilitar logs 
                {
                    name: 'created_at',
                    type: 'timestamp', 
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp', 
                    default: 'now()'
                }
                ]
            })
        )
    }
    //O down serve para desfazer ou corrigir comandos do up
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
