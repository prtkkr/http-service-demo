import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from '../services/github-followers.service';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers !: any[];

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { }

  ngOnInit(): void {
    const paramMap = this.route.paramMap;
    const queryParamMap = this.route.queryParamMap;

    combineLatest([
      paramMap,
      queryParamMap
    ])
      .pipe(switchMap(combined => {
        let id = combined[0].get('id');
        let page = combined[1].get('page');

        return this.service.getAll();
      }))
      .subscribe(followers => this.followers = followers);
  };

}
