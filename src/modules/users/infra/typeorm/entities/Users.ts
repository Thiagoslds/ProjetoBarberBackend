import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import {Exclude, Expose} from 'class-transformer'; //

@Entity('users') 
class User {
    @PrimaryGeneratedColumn('uuid') //coluna com chave primaria gerada
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude() //não existe quando vai para o frontend
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({name: 'avatar_url'}) //permite utilizar esse link para o avatar no frontend
    getAvatarUrl(): string | null {
        return this.avatar ? `${process.env.APP_API_URL}/files/${this.avatar}`
        :null
    }
}

export default User;