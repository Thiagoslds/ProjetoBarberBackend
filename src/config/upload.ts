import path from 'path';
import crypto from 'crypto'; //biblioteca do node para criptografar
import multer from 'multer'; //multer para gerenciamento e upload de arquivos

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); //caminho para salvar

export default {
    tmpFolder, //caminho temporario
    uploadsFolder: path.resolve(tmpFolder, 'uploads'), //pasta uploads que sera com arquivos permanente
    
    //local de armazenamento dos arquivos que sao feitos o upload
    storage: multer.diskStorage({
        destination: tmpFolder, //caminho para salvar
        //função para determinar o nome do arquivo
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex'); /*gera um hash de 10 bytes em 
            formato hexadecimal*/
            const fileName = `${fileHash}-${file.originalname}`; /*nome do arquivo, juntando o 
            nome original com o hash gerado, para ser único*/

            return callback(null, fileName);
        }
    })
}