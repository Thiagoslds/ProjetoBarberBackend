/*Simula o armazenamento de imagem e arquivos*/
import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider{
    private storage: string[] = [];

    //salva o arquivo no array
    public async saveFile(file:string): Promise<string>{
       this.storage.push(file)
        
       return file;
    }

    public async deleteFile(file:string): Promise<void>{
      const findIndex = this.storage.findIndex(
          storageFile=>storageFile===file
      );

      this.storage.splice(findIndex, 1);  //deleta uma informação que acha no index

    }
}

export default FakeStorageProvider; 