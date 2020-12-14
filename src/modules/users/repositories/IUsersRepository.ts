import User from '@modules/users/infra/typeorm/entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository{
    findAllProviders(data: IFindAllProvidersDTO): Promise<User[]> //pode retornar ou não
    findById(id: string): Promise<User | undefined> //pode retornar ou não
    findByEmail(email: string): Promise<User | undefined> //pode retornar ou não
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}