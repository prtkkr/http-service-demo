import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  private url  = 'https://jsonplaceholder.typicode.com/posts';
  aData : any = [];  //named as posts in video

  constructor(private http: HttpClient) {   }

  ngOnInit(): void {
    this.http.get(this.url).subscribe(response => {
      console.log(response);
      this.aData = response;
    });
  }

  createPost(param: HTMLInputElement) {
    let newPost : any = { title: param.value };
    param.value = '';

    this.http.post(this.url, JSON.stringify(newPost)).subscribe(data => {
      let aPost : any = [];
      aPost = data;
      newPost.id = aPost.id;
      this.aData.splice(0, 0, newPost);
      console.log(newPost);
    });
  }

  updatePost(i : any) {
    this.http.patch(this.url + '/' + i.id,
        JSON.stringify({isRead : true}) ).
          subscribe(response => {
            console.log(response);
    });
    // this.http.put(this.url, JSON.stringify(post) ).subscribe(response => {
      // console.log(response);
    //});  // a bit of peformance issue
  }

  deletePost(i : any) {
    this.http.delete(this.url + '/' + i.id).subscribe(response => {
      let index = this.aData.indexOf(i);
      this.aData.splice(index, 1);
      console.log(response);
    })
  }

}
