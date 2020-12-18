import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider'
import ICacheProvider from "./CacheProvider/models/ICacheProvider";

import IMailProviders from './MailProvider/models/IMailProviders';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);

container.registerSingleton<ICacheProvider>(
    'CacheProvider', 
    RedisCacheProvider
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider
);

//Instancia a classe quando utilizado a injeção
container.registerInstance<IMailProviders>(
    'MailProvider',
    container.resolve(EtherealMailProvider)
);
