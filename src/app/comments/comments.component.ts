import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  commentArray:any[]=[];
  constructor(private comment :CommentsService){}
  ngOnInit(): void {
    this.comment.loadData().subscribe((val)=>{
      console.log(val)
      this.commentArray = val
    })
  }
 onDelete(id:any){
  this.comment.deleteData(id)
 }
}
