import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'categories',component:CategoriesComponent,canActivate:[authGuard]},
  {path:'post',component:AddPostComponent,canActivate:[authGuard]},
  {path:'post/new',component:NewPostComponent,canActivate:[authGuard]},
  {path:'subscriber',component:SubscriberComponent,canActivate:[authGuard]},
  {path:'comment',component:CommentsComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
