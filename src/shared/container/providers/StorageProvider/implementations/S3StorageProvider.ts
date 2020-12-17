/* Utiliza o serviço S3 da Amazon para fazer o upload dos arquivos.  

import fs from 'fs';
import path from 'path';
import aws, {s3} from 'aws-sdk';
import mime from 'mime';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider{
    private client: S3StorageProvider;

    constructor(){
        this.client = new aws.s3({
            region: 'us-east-1';
        })
    }

    public async saveFile(file:string): Promise<string>{
        const originalPath = path.resolve(uploadConfig.tmpFolder, file);
        const contentType = mime.getType(originalPath);

        if(!contentType) throw new Error('File not found.');
        const fileContent = await fs.promises.readFile(originalPath);
        await this.client.putObject({
            Bucket: uploadConfig.config.aws.bucket,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            contentType
        }).promise();
        await fs.promises.unlink(originalPath);
        return file;
    }

    public async deleteFile(file:string): Promise<void>{
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        await this.client.deleteObject({
            Bucket: uploadConfig.config.aws.bucket,
            Key: file,
        }).promise();
    }
}

export default S3StorageProvider; */