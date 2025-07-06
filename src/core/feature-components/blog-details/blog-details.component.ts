import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  public blog: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (history.state && history.state.data) {
      this.blog = history.state.data;
    } else {
      this.goBackToBlogPage();
    }
  }

  public goBackToBlogPage() {
    this.router.navigate(['/blog']);
  }

}