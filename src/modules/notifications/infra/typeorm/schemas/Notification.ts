import { Entity, ObjectIdColumn, ObjectID, 
    Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/*Cria a tabela/schema de notificações da aplicação*/
@Entity('notifications')
class Notification {
    @ObjectIdColumn()
    id: ObjectID; //id padrão do mongodb

    @Column()
    content: string;

    @Column('uuid')
    recipient_id: string; //id de para quem vai enviar a notificação

    @Column({default: false})
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Notification;