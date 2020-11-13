import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity('users') 

class User {
    @PrimaryGeneratedColumn('uuid') //coluna com chave primaria gerada
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;