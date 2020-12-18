import Redis, {Redis as RedisClient} from 'ioredis';
import ICacheProvider from '../models/ICacheProvider';
import cacheConfig from '@config/cache';

interface ICacheData{
    [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider{
    private cache: ICacheData = {};

    public async save(key: string, value: any): Promise<void> {
       this.cache[key] = value;   
    }
    public async recover<T>(key: string): Promise<T|null> {
        const data = this.cache[key];
        if(!data) return null;

        /*converte os dados de volta para o formato devido e tipa ele como T,
         satisfazzendo o tipo de retorno*/
        const parsedData = JSON.parse(data) as T;
        return parsedData;
    }
    public async invalidate(key:string): Promise<void> {
        delete this.cache[key] ;    }

    public async invalidatePrefix(prefix: string): Promise<void>{
        const keys = Object.keys(this.cache).filter(key => key.startsWith(`${prefix}:`));

        keys.forEach(key => {
            delete this.cache[key];
        })
    }

}