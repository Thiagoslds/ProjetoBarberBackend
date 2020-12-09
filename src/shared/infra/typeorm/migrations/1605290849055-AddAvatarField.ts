import {MigrationInterface, QueryRunner, TableColumn, Table} from "typeorm";

export class AddAvatarField1605290849055 implements MigrationInterface {

    //Adicionar o campo para personalizar o avatar dentro do user
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar')
    }

}
