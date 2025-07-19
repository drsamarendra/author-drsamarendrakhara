import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GetApiDataService } from 'src/core/shared-service/get-api-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  public componentData: any = {};
  public languageData: any = {};
  public isEnglish = true;
  public dynamicStyles: any = {};

  constructor(private apiData: GetApiDataService) { }

  ngOnInit(): void {
    this.apiData.getApiData('json/language_data.json').subscribe(response => {
      this.languageData = response.data;
      localStorage.getItem("lang");
      const lang = localStorage.getItem("lang") || 'en';
      this.isEnglish = (lang == 'en')
      this.componentData = this.languageData[lang];
    });
  }

  toggleLanguage() {
    console.log("hello")
    this.isEnglish = !this.isEnglish;
    const lang = this.isEnglish ? "en" : 'bn';
    localStorage.setItem("lang", lang);
    this.componentData = this.languageData[lang];

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.fixMarginTop();
  }

  private fixMarginTop() {
    if (window.innerWidth >= 187 && window.innerWidth <= 357) {
      this.dynamicStyles = { 'margin-top': '190px' };
    } else if (window.innerWidth >= 358 && window.innerWidth <= 339) {
      this.dynamicStyles = { 'margin-top': '150px' };
    } else if (window.innerWidth >= 340 && window.innerWidth <= 767) {
      this.dynamicStyles = { 'margin-top': '130px' };
    } else if (window.innerWidth >= 768) {
      this.dynamicStyles = { 'margin-top': '100px' };
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.fixMarginTop.bind(this));
  }

}