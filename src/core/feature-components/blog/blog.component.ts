import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BlogService } from '../../shared-service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  public constBlogList: any[] = [];
  public blogList: any[] = [];
  public sortOrder: any = '';
  private blogServiceSubscription: any;
  public searchBlogText: string = "";

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sortOrder = localStorage.getItem("sortBlog") || 'newest'
    this.fetchBlogList();
  }

  private fetchBlogList() {
    localStorage.setItem("sortBlog", this.sortOrder);
    this.blogServiceSubscription = this.blogService.handleBlogList(this.sortOrder).subscribe(
      response => {
        this.constBlogList = response;
        this.blogList = response.map((obj: any) => ({ ...obj }));
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

  public setSortOrder() {
    this.sortOrder = (this.sortOrder == "newest") ? "oldest" : "newest";
    this.fetchBlogList();

  }

  public searchBlog() {
    this.blogList = this.getFilterBlog();
  }

  public getFilterBlog() {
    if (!this.searchBlogText) {
      return this.constBlogList;
    }
    return this.constBlogList.filter(blog =>
      JSON.stringify(blog).toLowerCase().includes(this.searchBlogText)
    );
  }

  ngOnDestroy(): void {
    this.blogServiceSubscription?.unsubscribe();
  }
}