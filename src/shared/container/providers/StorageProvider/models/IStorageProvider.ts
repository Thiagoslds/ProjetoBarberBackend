/*INterface com o padrão para manipulação de arquivos; na aplicação 
será salva no disco mas será padrão para diversos tipos*/
export default interface IStorageProvider{
    saveFile(file:string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}