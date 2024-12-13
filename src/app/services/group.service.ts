import { inject, Injectable } from '@angular/core';
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
  arrayUnion,
} from '@angular/fire/firestore';
import { GroupEntity } from '../model/group-entity';



@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'group');

  constructor() { }

  public add(group: GroupEntity) {

    let groupDTO: any = {
      emailUsers: group.emailUsers,
      title: group.title,
      urlImage: group.urlImage,
    }
    const contactData = { ...groupDTO };
    return addDoc(this._collection, contactData);
  }

  public list(): Observable<GroupEntity[]> {
    return collectionData(this._collection, { idField: 'id' }) as Observable<GroupEntity[]>;
  }

  public getById(id: string): Observable<GroupEntity> {
    const docRef = doc(this._collection, id);
    return docData(docRef, { idField: 'id' }) as Observable<GroupEntity>;
  }


  public update(group: GroupEntity): Promise<void> {
    const contactDocRef = doc(this._firestore, `group/${group.id}`);
    return updateDoc(contactDocRef, {
      emailUsers: group.emailUsers,
      title: group.title,
      urlImage: group.urlImage,
    });
  }

  public delete(id: string): Promise<void> {
    const contactDocRef = doc(this._firestore, `group/${id}`);
    return deleteDoc(contactDocRef);
  }

  addUser(idGroup: string, email: string): Promise<void> {
    const docRef = doc(this._collection, idGroup);
    return updateDoc(docRef, {
      emailUsers: arrayUnion(email),
    });
  }
  
}
