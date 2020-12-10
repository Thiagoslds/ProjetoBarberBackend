import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider{
    public async saveFile(file:string): Promise<string>{
        /*Para manipular o file do node com promises
        O rename serve para mover um arquivo de um caminho para outro, no caso de tmp para upload*/
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file)
        );
        return file;
    }

    public async deleteFile(file:string): Promise<void>{
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        /*utilizando o modulo fs, filestream, do node, verifica o status do arquivo, utilizando
        para verificar se ja possui o arquivo no caminho*/
        try{
            await fs.promises.stat(filePath);
        } catch{ //se não encontrar o arquivo, ele gera um erro e para a função
            return;
        }
        await fs.promises.unlink(filePath); /*caso tenha encontrado o arquivo, ele
         é deletado com unlink*/
    }
}

export default DiskStorageProvider;