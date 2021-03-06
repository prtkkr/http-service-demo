import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //snapshot method
    // let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);

    this.route.paramMap.subscribe(params => {
      // console.log(params);
      let userId = Number(params.get('id'));
      console.log(userId);
    });
  }

}
