import { Component, OnInit } from '@angular/core';
import { GetApiDataService } from 'src/core/shared-service/get-api-data.service';

@Component({
  selector: 'app-latest-post',
  templateUrl: './latest-post.component.html',
  styleUrls: ['./latest-post.component.css']
})
export class LatestPostComponent implements OnInit {

  public allCards = [];
  public interval: any;
  public currentIndex = 0;
  public visibleCards: {
    category: string;
    color: string;
    title: string;
    description: string;
    author: string;
    readTime: string;
    image: string;
    avatar: string;
    date:string;
    order: number;
    link: string;
  }[] = [];
  constructor(private apiService: GetApiDataService) { }

  ngOnInit(): void {
    this.apiService.getApiData("json/newspaper.json").subscribe((response: any) => {
      this.allCards = response.data;
      this.updateVisibleCards();
      this.startAutoSlide();
    });
  }

  updateVisibleCards() {
    const len = this.allCards.length;
    this.visibleCards = [
      this.allCards[this.currentIndex % len],
      this.allCards[(this.currentIndex + 1) % len],
      this.allCards[(this.currentIndex + 2) % len],
    ];
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.allCards.length;
      this.updateVisibleCards();
    }, 4000); // Slide every 3 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}