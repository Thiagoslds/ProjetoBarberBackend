import {container} from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

/*Toda vez que tiver uma injeção com nome hashprvider retorna uma instancia da bcrypt*/
container.registerInstance<IHashProvider>('HashProvider', container.resolve(BCryptHashProvider));