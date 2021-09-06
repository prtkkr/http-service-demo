import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  aData : any = [];  //named as posts in video

  constructor(private service: PostService) {   }

  ngOnInit(): void {
    this.service.getPosts().
      subscribe(response => {
          //console.log(response);
           this.aData = response;
      }
    );
  }

  createPost(param: HTMLInputElement) {
    let newPost : any = { title: param.value };
    param.value = '';

    this.service.createPosts(newPost).subscribe(data => {
      let aPost : any = [];
      aPost = data;
      newPost.id = aPost.id;
      this.aData.splice(0, 0, newPost);
      console.log(newPost);
    });
  }

  updatePost(i : any) {
    this.service.updatePosts(i).subscribe(response => {
      console.log(response);
    });
    // this.http.put(this.url, JSON.stringify(post) ).subscribe(response => {
      // console.log(response);
    //});  // a bit of peformance issue
  }

  deletePost(i : any) {
    this.service.deletePosts(i).subscribe(response => {
      let index = this.aData.indexOf(i);
      this.aData.splice(index, 1);
      console.log(response);
    })
  }

}
