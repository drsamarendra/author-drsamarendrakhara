import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetApiDataService } from 'src/core/shared-service/get-api-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  public componentData: any = {};
  public languageData: { en?: any; bn?: any } = {};
  public isEnglish = true;

  constructor(private apiData: GetApiDataService) { }

  ngOnInit(): void {
    this.apiData.getApiData('json/language_data.json').subscribe(response => {
      this.languageData = response.data;
      this.componentData = this.isEnglish ? this.languageData['en'] : this.languageData['bn'];
    });
  }

  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
    this.componentData = this.isEnglish ? this.languageData['en'] : this.languageData['bn'];
  }

  ngOnDestroy(): void { }

}