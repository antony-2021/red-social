import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { PublicationEntity } from '../model/publication-entity';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'publication');

  constructor() { }

  public add(publication: PublicationEntity) {

    let publicationDTO: any = {
      description: publication.description,
      interaction: publication.interaction,
      title: publication.title,
      urlImage: publication.urlImage,
      emailUser:publication.emailUser,
      idGroup:publication.idGroup
    }
    const contactData = { ...publicationDTO };
    return addDoc(this._collection, contactData);
  }

  public list(): Observable<PublicationEntity[]> {
    return collectionData(this._collection, { idField: 'id' }) as Observable<PublicationEntity[]>;
  }

  public getById(id: string): Observable<PublicationEntity> {
    const docRef = doc(this._collection, id); 
    return docData(docRef, { idField: 'id' }) as Observable<PublicationEntity>;
  }
  

  public update(publication: PublicationEntity): Promise<void> {
    const contactDocRef = doc(this._firestore, `publication/${publication.id}`);
    return updateDoc(contactDocRef, {
      description: publication.description,
      interaction: publication.interaction,
      title: publication.title,
      urlImage: publication.urlImage,
    });
  }

  public delete(id: string): Promise<void> {
    const contactDocRef = doc(this._firestore, `publication/${id}`);
    return deleteDoc(contactDocRef);
  }
}
