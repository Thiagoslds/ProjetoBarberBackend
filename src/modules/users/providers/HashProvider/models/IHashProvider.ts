/*Interface com o padrão esperado para um gerador de hash de senha*/
export default interface IHashProvider{
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}