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
import { Interaction, PublicationEntity } from '../model/publication-entity';


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
      emailUser: publication.emailUser,
      idGroup: publication.idGroup
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


  public listByIdGroup(idGroup: string): Observable<PublicationEntity[]> {
    const list = collectionData(this._collection, { idField: 'id' }) as Observable<PublicationEntity[]>;

    return new Observable<PublicationEntity[]>((observer) => {
      list.subscribe((publications) => {
        const filteredPublications = publications.filter(p => p.idGroup === idGroup);
        observer.next(filteredPublications);
        observer.complete();
      });
    });
  }

 
  public updateInteractionByEmail(idPublication: string, email: string, like: boolean, comment?: string): void {
    const docRef = doc(this._firestore, `publication/${idPublication}`);

    docData(docRef, { idField: 'id' }).toPromise()
      .then((publicationSnapshot: PublicationEntity | undefined) => {
        if (publicationSnapshot) {
          console.log('Publication snapshot:', publicationSnapshot);

          const publication = publicationSnapshot;
          const interaction = publication.interaction.find(i => i.emailUser === email);

          if (interaction) {
            if (comment) {
              interaction.comentarios.push(comment);  
            }
            interaction.like = like;

            updateDoc(docRef, { interaction: publication.interaction })
              .then(() => {
                console.log('Documento actualizado correctamente');
              })
              .catch(error => {
                console.error('Error al actualizar el documento:', error);
              });
          } else {
            console.log('No se encontró interacción para este email');
          }
        } else {
          console.log('No se encontró la publicación');
        }
      })
      .catch((error: any) => {
        console.error('Error al obtener el documento de Firestore:', error);
      });
  }
  
  
  

}
