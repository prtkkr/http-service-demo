import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  aData: any = [];  //named as posts in video

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.service.getAll().
      subscribe(response => {
        //console.log(response);
        this.aData = response;
      });
  }

  createPost(param: HTMLInputElement) {
    let newPost: any = { title: param.value };
    param.value = '';

    this.service.create(newPost)
      .subscribe(
        response => {
          let aPost: any = [];
          aPost = response;
          newPost.id = aPost.id;
          this.aData.splice(0, 0, newPost);
          //console.log(newPost);
        },
        (error: AppError) => {
          if(error instanceof BadInput)
            // this.form.setErrors(error.originalError);
            alert('Error');
          else
            throw error;  //handled by global error handler i.e. "app-error-handler.ts"
          
        }
      );
  }

  updatePost(i: any) {
    this.service.update(i)
      .subscribe(
        response => {
          console.log(response);
        },
        (error: Response) => {
          if (error.status === 400)
            alert('400 Error Occurred');
          else
            throw error;
        });
    // this.http.put(this.url, JSON.stringify(post) ).subscribe(response => {
    // console.log(response);
    //});  // a bit of peformance issue
  }

  deletePost(i: any) {
    this.service.delete(i.id)// use blank to get errors
      .subscribe(
        response => {
          let index = this.aData.indexOf(i);
          this.aData.splice(index, 1);
          console.log(response);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else 
            throw error;
        });
  }
}
