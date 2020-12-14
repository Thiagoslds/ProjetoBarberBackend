import {v4 as uuidv4} from 'uuid'
import User from '@modules/users/infra/typeorm/entities/Users'; //importa o modelo de entidade definido
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository{ 
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined>{
       const findUser = this.users.find(userVar => userVar.id === id);
       return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const findUser = this.users.find(userVar => userVar.email === email);
        return findUser;
    }

    public async findAllProviders({except_user_id}: IFindAllProvidersDTO): Promise<User[]>{
        let {users} = this;
        if(except_user_id)
            {users = this.users.filter(userVar => userVar.id !== except_user_id);}
        return users;
    }

    public async create(userData:ICreateUserDTO): Promise<User>{
        const user = new User();
        Object.assign(user, {id: uuidv4()}, userData);
        this.users.push(user);
        return user;
    }

    public async save(user: User): Promise<User>{
        const findIndex = this.users.findIndex(findUser => findUser.id===user.id);
        this.users[findIndex] = user;
        return user;
    }
}

export default FakeUsersRepository;