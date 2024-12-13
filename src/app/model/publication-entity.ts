export interface PublicationEntity {
    id:string,
    title:string,
    description:string,
    urlImage:string[],
    interaction:Interaction[]
}

export interface Interaction{
    emailUser:string,
    comentarios:string[],
    like:boolean,
}