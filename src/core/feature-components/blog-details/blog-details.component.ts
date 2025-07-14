import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../shared-service/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  public blog: any = {};
  public hasNextBlog: boolean = false;
  public hasPreviousBlog: boolean = false;

  constructor(private router: Router, private blogService: BlogService) { }

  ngOnInit(): void {
    if (history.state && history.state.data) {
      this.blog = history.state.data;
      this.handelBlog("first");
    } else {
      this.goBackToBlogPage();
    }
  }

  public goBackToBlogPage() {
    this.router.navigate(['/blog']);
  }

  public handelBlog(step: string = 'next | previous | first') {
    if ("next" == step) {
      this.blog = this.handleFetchBlog(this.blog.id + 1);
    } else if ("previous" == step) {
      this.blog = this.handleFetchBlog(this.blog.id - 1);
    }
    this.hasNextBlog = this.isPresnetBlog(this.blog.id + 1);
    this.hasPreviousBlog = this.isPresnetBlog(this.blog.id - 1);
  }

  private handleFetchBlog(id: number) {
    return this.blogService.getBlogById(id);

  }

  private isPresnetBlog(id: number) {
    return this.blogService.isBlogPresnetById(id);
  }

}