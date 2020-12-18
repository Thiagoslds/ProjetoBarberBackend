import {RedisOptions} from 'ioredis';

interface ICacheConfig{
    driver: 'redis2';
    config:{
        redis: RedisOptions; /*permite utilizar varias opções que o ioredis tem, como port
        password,, etc*/
    };
}

/*Feito de tal forma que pode ser utilizado outros tipos de provedores de cache*/
export default {
    driver: 'redis2',
    config: {
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASS || undefined
        }
    }
} as ICacheConfig