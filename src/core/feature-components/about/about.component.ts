import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../shared-service/blog.service';
import { NavigationExtras, Router } from '@angular/router';
import { GetApiDataService } from 'src/core/shared-service/get-api-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  public blogList: any[] = [];
  private blogServiceSubscription: any;
  public componentData: any = {};
  public languageData: { EN?: any; BN?: any } = {};
  isEnglish = true;
  constructor(private blogService: BlogService,
    private router: Router, private apiData: GetApiDataService) { }


  ngOnInit(): void {
    this.blogServiceSubscription = this.blogService.getLatestPostList().subscribe(data => {
      this.blogList = data;
    });
    this.apiData.getApiData('json/language_data.json').subscribe(response => {
      this.languageData = response.data;
      this.toggleLanguage();
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


  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
    this.componentData = this.isEnglish ? this.languageData['EN'] : this.languageData['BN'];
  }
}
