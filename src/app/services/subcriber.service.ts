import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubcriberService {

  constructor(private afs:AngularFirestore,private toaster:ToastrService) { }

  loadData() {
    return this.afs
      .collection('subscriber')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          console.log(actions)
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  deleteData(id: any) {
    this.afs
      .doc(`subscriber/${id}`)
      .delete()
      .then((docRef) => {
        this.toaster.success('data deleted!');
      });
  }
}
