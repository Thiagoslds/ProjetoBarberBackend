import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddUserIdToAppointments1608074516167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn( //adiciona a coluna nova
            'appointments',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true //mantem o historico caso o prestador delete
            })
        );

        //chave estrangeira
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentUser',
                columnNames: ['user_id'],
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

        await queryRunner.dropColumn('appointments', 'user_id');
    }

}
