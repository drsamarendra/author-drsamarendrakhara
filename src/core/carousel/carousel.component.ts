import { Component, OnInit } from '@angular/core';
import { GetApiDataService } from '../shared-service/get-api-data.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public carouselList: any[] = [];

  constructor(
    private getApiDataService: GetApiDataService
  ) { }

  ngOnInit(): void {
    this.getApiDataService.getApiData('json/carouselList.json').subscribe(
      response => {
        this.carouselList = response.data;
      }
    );
  }

}
