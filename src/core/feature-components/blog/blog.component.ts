import { Component, OnInit } from '@angular/core';
import { GetApiDataService } from '../../shared-service/get-api-data.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public blogList: any[] = [];

  constructor(
    private apiService: GetApiDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.apiService.getApiData('json/blogList.json').subscribe(
      response => {
        this.blogList = response.data;
      });
  }

  public onClickBlog(blog: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: blog
      }
    };
    this.router.navigateByUrl('/blog-details', navigationExtras);
  }
}