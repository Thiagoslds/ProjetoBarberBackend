/* A template é uma html que contem variaveis, a interface irá definir essa forma 
Como irá receber uma informação composta, cria uma DTO*/
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider{
    parse(data: IParseMailTemplateDTO): Promise<string>;
}