import { Component, OnInit } from '@angular/core';
import { SubcriberService } from '../services/subcriber.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrl: './subscriber.component.scss'
})
export class SubscriberComponent implements OnInit{
  subcribeArray:any[]=[];
  constructor(private sub :SubcriberService){}
  ngOnInit(): void {
    this.sub.loadData().subscribe((val)=>{
      console.log(val)
      this.subcribeArray = val
    })
  }
 onDelete(id:any){
  this.sub.deleteData(id)
 }
}
