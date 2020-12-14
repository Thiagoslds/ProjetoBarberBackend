/*Usa DTO Sempre que precisar tipar uma informação composta, utilizada para criar, alterar, etc*/

/*os colchetes permitem ter qualquer chave, sendo string, e valor, sendo string ou numero  */
interface ITemplateVariables{
    [chave: string]: string | number;
}

export default interface IParseMailTemplateDTO{
    file: string; /*conteudo da template em html*/
    variables: ITemplateVariables; /*objeto*/
}