/*Middleware para coibir muitas requisições e prevenir ataques */

import { NextFunction, Request, Response } from 'express';
import redis from 'redis';
import {RateLimiterRedis} from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

/*Os dados das requisições serão salvas em cache*/
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5, //quantas requisições serão permitidas
    duration: 1 //por segundo
})

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try{
        await limiter.consume(request.ip); //pega o ip da requisição
        return next();
    } catch(err) {throw new AppError('Too many requests', 429);}
    
}