import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toaster: ToastrService,
    private router: Router
  ) {}

  uploadImg(selectedImg: any, postData: any, formStatus: any, id: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImg).then(() => {
      console.log('post image uploaded successfully');
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          console.log(URL);
          postData.postImgPath = URL;
          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          }else{
          this.saveData(postData);}
        });
    });
  }
  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toaster.success('Data insert succeesfully');
      });
    this.router.navigate(['/post']);
  }

  loadData() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadSingleData(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: any, postData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toaster.success('Data updated successfully');
        this.router.navigate(['/post']);
      });
  }

  deleteImg(postImgPath:any,id:any){
    this.storage.storage.refFromURL(postImgPath).delete().then(()=>{
           this.deletedata(id)
    })
  }

  deletedata(id:any){
    this.afs.doc(`posts/${id}`).delete().then(()=>{
      this.toaster.warning('data deleted')
    })
  }

  markFeatured(id:any,feturedData:any){
    this.afs.doc(`posts/${id}`).update(feturedData).then(()=>{
      this.toaster.info('feature status update')
    })
    
  }
}
