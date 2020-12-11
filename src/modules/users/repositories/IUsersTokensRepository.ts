/*Definição de forma geral de uma geração de um token*/
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository{
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}