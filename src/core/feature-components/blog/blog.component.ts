import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BlogService } from '../../shared-service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  public blogList: any[] = [];
  private blogServiceSubscription: any;

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.blogServiceSubscription = this.blogService.handleBlogList().subscribe(
      response => {
        this.blogList = response;
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

  ngOnDestroy(): void {
    this.blogServiceSubscription?.unsubscribe();
  }
}