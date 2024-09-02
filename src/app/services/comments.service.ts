import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private afs:AngularFirestore,private toaster:ToastrService) { }

  loadData() {
    return this.afs
      .collection('comment')
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
      .doc(`comment/${id}`)
      .delete()
      .then((docRef) => {
        this.toaster.success('data deleted!');
      });
  }
}
