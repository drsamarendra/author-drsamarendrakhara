import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../shared-service/blog.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public blogList: any[] = [];
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.handleBlogList().subscribe((data: any) => {
      this.blogList = data;
    }, (error: any) => {
      console.error('Error fetching blog list:', error);
    });
  }

}
