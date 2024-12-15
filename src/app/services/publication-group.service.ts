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
  onSnapshot,
} from '@angular/fire/firestore';
import { Interaction, PublicationGroupEntity } from '../model/publication-group-entity';


@Injectable({
  providedIn: 'root'
})
export class PublicationGroupService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'publication-group');

  constructor() { }

  add(publication: PublicationGroupEntity) {

    let publicationDTO: any = {
      description: publication.description,
      interaction: publication.interaction,
      title: publication.title,
      urlImage: publication.urlImage,
      emailUser: publication.emailUser,
      idGroup: publication.idGroup
    }
    const contactData = { ...publicationDTO };
    return addDoc(this._collection, contactData);
  }

  list(): Observable<PublicationGroupEntity[]> {
    return collectionData(this._collection, { idField: 'id' }) as Observable<PublicationGroupEntity[]>;
  }

  getById(id: string): Observable<PublicationGroupEntity> {
    const docRef = doc(this._collection, id);
    return docData(docRef, { idField: 'id' }) as Observable<PublicationGroupEntity>;
  }


  update(publication: PublicationGroupEntity): Promise<void> {
    const contactDocRef = doc(this._firestore, `publication-group/${publication.id}`);
    return updateDoc(contactDocRef, {
      description: publication.description,
      interaction: publication.interaction,
      title: publication.title,
      urlImage: publication.urlImage,
    });
  }

  delete(id: string): Promise<void> {
    const contactDocRef = doc(this._firestore, `publication-group/${id}`);
    return deleteDoc(contactDocRef);
  }


  listByIdGroup(idGroup: string): Observable<PublicationGroupEntity[]> {
    const list = collectionData(this._collection, { idField: 'id' }) as Observable<PublicationGroupEntity[]>;

    return new Observable<PublicationGroupEntity[]>((observer) => {
      list.subscribe((publications) => {
        const filteredPublications = publications.filter(p => p.idGroup === idGroup);
        observer.next(filteredPublications);
        observer.complete();
      });
    });
  }

  updateInteractionByEmail(idPublication: string, email: string, like: boolean, comment: string | null): void {
    const docRef = doc(this._firestore, `publication-group/${idPublication}`);
    onSnapshot(docRef, (docSnapshot) => {
      const publication = docSnapshot.data();
      if (!publication || !publication['interaction']) { 
        console.error('No se encontró la propiedad "interaction" en la publicación');
        return;
      }
      const existingInteraction = publication['interaction'].find((p: { emailUser: string; }) => p.emailUser === email);

      if (!existingInteraction) {
        const newInteraction = {
          emailUser: email,
          comentarios: comment ? [comment] : [],
          like: like
        };
        
        publication['interaction'].push(newInteraction);
      } else {
        if (comment && !existingInteraction.comentarios.includes(comment)) {
          existingInteraction.comentarios.push(comment);
        }
        existingInteraction.like = like;
      }

      updateDoc(docRef, { interaction: publication['interaction'] }) 
        .then(() => console.log('Interacción actualizada exitosamente'))
        .catch(err => {
          console.error('Error al actualizar la interacción:', err);
        });
    });
  }
}
