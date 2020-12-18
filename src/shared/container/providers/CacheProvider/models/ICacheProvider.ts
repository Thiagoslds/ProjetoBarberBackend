/*Padrão para utilização de cache, onde será salvo, recuperar informação de algum ou 
excluir algum cache*/
export default interface ICacheProvider{
    save(key: string, value: any): Promise<void>;
    recover<T>(key: string): Promise<T | null>;
    invalidate(key:string): Promise<void>;
    invalidatePrefix(prefix: string): Promise<void>;
}