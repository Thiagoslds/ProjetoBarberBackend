//serve para adicionar à alguma biblioteca padrão, no caso express
//Aqui ela irá acrescentar o campo user ao request
declare namespace Express{
    export interface Request{
        user: {
            id: string;
        }
    }
}