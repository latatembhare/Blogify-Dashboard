import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  @ViewChild('categoryForm', { static: false }) categoryForm: NgForm | any;
  categoryArray:any[] =[]
formCategory: any;
formStatus:string='Add '
  categoryId: any;
  constructor(private categoryService:CategoryService) {}
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val=>{
      console.log(val)
      this.categoryArray = val
    })
  }
  Onsubmit() {
    console.log(this.categoryForm);
    let categoryData:Category = {
      category: this.categoryForm.value.category,
    };
    console.log(categoryData);
    if(this.formStatus == 'Add '){
    this.categoryService.saveData(categoryData)
    this.categoryForm.reset()}
    else{
      this.categoryService.updateData(this.categoryId,categoryData)
      this.formStatus = 'Add '
    }
  }

  onEdit(category:any,id:any){
    console.log(category)
  this.formCategory = category
  this.categoryId = id
  this.formStatus ="Edit "
  }

  onDelete(id:any){
    this.categoryService.deleteData(id)
  }
}
