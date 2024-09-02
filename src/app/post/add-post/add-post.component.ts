import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
allPost: any[]=[];
  id: any;
constructor(private postservice:PostsService,
){
  this.postservice.loadData().subscribe(res=>{
    console.log(res)
    this.allPost = res
  })
}

onDelete(postImgPath:any,id:any){
   this.postservice.deleteImg(postImgPath,id)
}

onFeatured(id:any, value:boolean){
  const featuredData ={
    featured : value
  }
  this.postservice.markFeatured(id,featuredData)
}
}
