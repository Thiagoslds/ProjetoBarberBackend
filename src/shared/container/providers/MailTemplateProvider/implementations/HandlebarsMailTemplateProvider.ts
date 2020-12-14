import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider'
import handlebars from 'handlebars'; /*sistema de template engine, utiliza {{}} */
import fs from 'fs'

export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider{
    public async parse({file, variables}: IParseMailTemplateDTO): Promise<string>{
        /*le o arquivo que contem o template em html*/
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8'
        })
        
        /*definido pelo handlebars */
        const parseTemplate = handlebars.compile(templateFileContent); /*recebe um conteudo em string, 
        retornando uma função*/

        return parseTemplate(variables); /*executa passando as variaveis*/
    }
}