/*Usa DTO Sempre que precisar tipar uma informação composta, utilizada para criar, alterar, etc
Aqui os dados necessários para criar um appointment*/
export default interface ICreateAppointmentDTO{
    provider_id: string;
    user_id: string;
    date: Date;
}