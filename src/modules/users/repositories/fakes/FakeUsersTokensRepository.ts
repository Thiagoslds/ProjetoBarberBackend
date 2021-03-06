/*Simula a criação de um token de um usuario, atribuindo um uuid a cada usuario criado 
e colocado em um array*/

import {v4 as uuidv4} from 'uuid'
import UserToken from '@modules/users/infra/typeorm/entities/UserToken'; //importa o modelo de entidade definido
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository{ 
    private arrUserTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken>{
       const userToken = new UserToken();

       Object.assign(userToken, {
           id: uuidv4(),
           token: uuidv4(),
           user_id,
           created_at: new Date(),
           updated_at: new Date()
       });

       this.arrUserTokens.push(userToken);

       return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined>{
        const userToken = this.arrUserTokens.find(
            varFindToken => varFindToken.token === token
        );

        return userToken;
    }
}

export default FakeUsersTokensRepository;