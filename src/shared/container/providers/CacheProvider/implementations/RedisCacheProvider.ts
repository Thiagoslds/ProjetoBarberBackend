import Redis, {Redis as RedisClient} from 'ioredis';
import ICacheProvider from '../models/ICacheProvider';
import cacheConfig from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider{
    private client: RedisClient;

    constructor(){
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }
    public async recover<T>(key: string): Promise<T|null> {
        const data = await this.client.get(key);
        if(!data) return null;

        /*converte os dados de volta para o formato devido e tipa ele como T,
         satisfazzendo o tipo de retorno*/
        const parsedData = JSON.parse(data) as T;
        return parsedData;
    }
    public async invalidate(key:string): Promise<void> {
        await this.client.del(key);    }

    public async invalidatePrefix(prefix: string): Promise<void>{
        /*busca todos os valores que contem o prefixo recebido*/
        const keys = await this.client.keys(`${prefix}:*`);
        /*pipeline melhora a perfomance para multiplas tarefas*/
        const pipeline = this.client.pipeline();
        /*deleta cada chave localizada com o pipeline*/
        keys.forEach(key => {
            pipeline.del(key);
        })
        await pipeline.exec();
    }

}