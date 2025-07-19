import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetApiDataService } from 'src/core/shared-service/get-api-data.service';

@Component({
  selector: 'app-latest-post',
  templateUrl: './latest-post.component.html',
  styleUrls: ['./latest-post.component.css']
})
export class LatestPostComponent implements OnInit, OnDestroy {
  public allCards = [];
  public visibleCards: any = [];
  public currentIndex = 0;
  public interval: any;
  public visibleCardCount = 3;

  constructor(private apiService: GetApiDataService) { }

  ngOnInit(): void {
    this.apiService.getApiData("json/newspaper.json").subscribe((response: any) => {
      this.allCards = response.data.sort((a: any, b: any) => {
        const dataA = new Date(a.data);
        const dateB = new Date(b.data);
        return dateB.getTime() - dataA.getTime();
      });
      this.setVisibleCardCount();
      this.startAutoSlide();
    });

    window.addEventListener('resize', this.setVisibleCardCount.bind(this));
  }

  setVisibleCardCount() {
    const width = window.innerWidth;
    if (width < 576) {
      this.visibleCardCount = 1; // mobile
    } else if (width < 992) {
      this.visibleCardCount = 2; // tablet
    } else {
      this.visibleCardCount = 3; // desktop
    }
    this.updateVisibleCards();
  }

  updateVisibleCards() {
    const len = this.allCards.length;
    this.visibleCards = [];
    for (let i = 0; i < this.visibleCardCount; i++) {
      this.visibleCards.push(this.allCards[(this.currentIndex + i) % len]);
    }
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.allCards.length;
      this.updateVisibleCards();
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    window.removeEventListener('resize', this.setVisibleCardCount.bind(this));
  }
}
