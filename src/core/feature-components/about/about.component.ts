import { Component, OnDestroy, OnInit } from '@angular/core';
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

  ngOnDestroy(): void {
  }

}