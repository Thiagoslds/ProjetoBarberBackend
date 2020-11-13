import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

//substituição do provider para provider_id, referenciando o user

export class AlterProvider1605203020750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider'); //tira a coluna provider

        await queryRunner.addColumn( //adiciona a coluna nova provider id
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true
            })
        );

        //chave estrangeira
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL', //set para nulo o provider caso seja deletado
                onUpdate: 'CASCADE' //atualização no padrão cascade, para não perder todas info
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //caminho reverso
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar'
            })
        )
    }

}
