import {MigrationInterface, QueryRunner, Table} from "typeorm"; //importação do table

export class CreateUser1605124368414 implements MigrationInterface {
//O up determina o que será feito quando a migration for executada
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: 'users', //padrão do dev foi minuscula, plural e _
            columns:[
            {
                name: 'id',
                type: 'uuid', //por ser o uuid do appointments
                isPrimary: true, //chave primária
                generationStrategy: 'uuid', //gera o campo id de forma automatica como uuid
                default: 'uuid_generate_v4()'
            },
            {
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'email',
                type: 'varchar',
                isUnique: true
            },
            {
                name: 'password',
                type: 'varchar'
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
    await queryRunner.dropTable('users');
}


}
