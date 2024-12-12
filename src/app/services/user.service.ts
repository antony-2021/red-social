import { inject, Injectable, OnInit } from '@angular/core';
import { UserEntity } from '../model/user-entity';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc, query, where, getDocs } from '@angular/fire/firestore';
//import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, "users");


  constructor() { }

  /* public add(user: UserEntity) {
    this.getUserByEmail(user.email).then((response)=>{
      if(response==null){

        let userDTO:any={
          email: user.email,
          name: user.name,
          universityCareer: user.universityCareer,
          academicYear: user.academicYear,
          urlImage: user.urlImage,
          enabled: user.enabled
        }
        const contactData = { ...userDTO }; // Convertir la instancia de Contact en un objeto plano
        return addDoc(this._collection, contactData);
      }
    })
  }
*/
  public add(user: UserEntity) {
    return this.getUserByEmail(user.email).then((response) => {
      if (response == null) {
        const userDTO: any = {
          email: user.email,
          name: user.name,
          universityCareer: user.universityCareer,
          academicYear: user.academicYear,
          urlImage: user.urlImage,
          enabled: user.enabled,
        };
        const contactData = { ...userDTO }; 
        return addDoc(this._collection, contactData);
      } else {
        return Promise.reject(new Error('El usuario ya existe.'));
      }
    }).catch((error) => {
      return Promise.reject(error);
    });
  }
  

  public list(): Observable<UserEntity[]> {
    return collectionData(this._collection, { idField: 'id' }) as Observable<UserEntity[]>;
  }

  public update(user: UserEntity): Promise<void> {
    const contactDocRef = doc(this._firestore, `users/${user.id}`);
    return updateDoc(contactDocRef, {
      name: user.name,
      universityCareer: user.universityCareer,
      academicYear: user.academicYear,
      urlImage: user.urlImage,
      enabled: user.enabled
    });
  }

  public delete(id: string): Promise<void> {
    const contactDocRef = doc(this._firestore, `users/${id}`);
    return deleteDoc(contactDocRef);
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    const userQuery = query(this._collection, where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data(),
    } as UserEntity;
  }

}
