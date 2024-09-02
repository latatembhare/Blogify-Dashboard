import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent implements OnInit {
  categories: any;
  postForm: FormGroup | any;
  link: any;
  post: any;
  formStatus = 'Add New';
  docId: any;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
    this.route.queryParams.subscribe((val) => {
      // console.log(val)
      this.postService.loadSingleData(val['id']).subscribe((data) => {
         console.log(data)
        this.docId = val['id'];
        this.post = data;
        console.log(this.post);
        if (this.docId) {
          this.postForm = this.fb.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(10)],
            ],
            permaLink: [this.post.permaLink, Validators.required],
            excerpt: [
              this.post.excerpt,
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              `${this.post.category.categoryId}-${this.post.category.category}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        }else{
          this.postForm = this.fb.group({
            title: [
              '',
              [Validators.required, Validators.minLength(10)],
            ],
            permaLink: ['', Validators.required],
            excerpt: [
              '',
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              '',
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: ['', Validators.required],
          });
        }
      });
    });
  }
  imgSrc: any = '/assets/images/default-placeholder.png';
  selecteImg: any;

  onTitleChange(event: any) {
    this.postForm.title = event.target.value;
    this.postForm.permaLink = this.postForm.title.replace(/\s/g, '-');
  }
  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.selecteImg = event.target.files[0];
  }
  onSubmit() {
    console.log(this.postForm);
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);
    const postData: Post = {
      title: this.postForm.value.title,
      permaLink: this.postForm.value.permaLink,
      category: { categoryId: splitted[0], category: splitted[1] },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this.postService.uploadImg(
      this.selecteImg,
      postData,
      this.formStatus,
      this.docId
    );
    console.log(postData);
    this.postForm.reset();
    this.imgSrc = '/assets/images/default-placeholder.png';
  }
}
