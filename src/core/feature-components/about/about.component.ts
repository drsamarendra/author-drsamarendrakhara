import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../shared-service/blog.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  public blogList: any[] = [];
  private blogServiceSubscription: any;

  constructor(private blogService: BlogService,
    private router: Router) { }

  ngOnInit(): void {
    this.blogServiceSubscription = this.blogService.getLatestPostList().subscribe(data => {
      this.blogList = data;
    });
  }

  goToBlogDetails(blog: any): void {
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
