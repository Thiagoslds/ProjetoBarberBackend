/*Criado a partir da linha de comando migration:create*/

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUserToken1607715200217 implements MigrationInterface {
//O up determina o que será feito quando a migration for executada
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_tokens',
                columns: [
                {
                    name: 'id',
                    type: 'uuid', //por ser o uuid do appointments
                    isPrimary: true, //chave primária
                    generationStrategy: 'uuid', //gera o campo id de forma automatica como uuid
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'token',
                    type: 'uuid', //por ser o uuid do appointments
                    generationStrategy: 'uuid', //gera o campo id de forma automatica como uuid
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'user_id',
                    type: 'uuid', //por ser o uuid do appointments
                },
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
            ],
                foreignKeys: [{
                    name: 'TokenUser',
                    columnNames: ['user_id'], //coluna nessa tabela que referencia
                    referencedColumnNames: ['id'], //referencia a coluna id
                    referencedTableName: 'users', //referencia a tabela users
                    onDelete: 'CASCADE', //um usuario deletado deleta os tokens
                    onUpdate: 'CASCADE' //atualiza usuario e os tokens tb
                }]
            })
        )
    }

    //contrario do Up
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_tokens');
    }

}
