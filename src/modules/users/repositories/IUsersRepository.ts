import User from '@modules/users/infra/typeorm/entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

export default interface IUsersRepository{
    findById(id: string): Promise<User | undefined> //pode retornar ou não
    findByEmail(email: string): Promise<User | undefined> //pode retornar ou não
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}