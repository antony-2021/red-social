export interface UserEntity {
    id:string,
    email:string,
    name:string,
    universityCareer:string,
    academicYear:number,
    urlImage:string,
    enabled:boolean,

    idGroups:string[]
}
