/*Token para recuperação de senha, garantindo a origem do envio e a recuperação do id
 do usuário*/

import {Entity, Column, 
    PrimaryGeneratedColumn, CreateDateColumn, 
    UpdateDateColumn, Generated} from 'typeorm'

@Entity('user_tokens') 

class UserToken {
    @PrimaryGeneratedColumn('uuid') //coluna com chave primaria gerada
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserToken;