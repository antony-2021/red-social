export interface PublicationEntity {
    id:string,
    emailUser:string,
    idGroup:string,
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