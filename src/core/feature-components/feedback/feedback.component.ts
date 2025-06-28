import { Component, OnInit, OnDestroy } from '@angular/core';
import { Feedback } from 'src/core/model/feedback';
import { GetApiDataService } from 'src/core/shared-service/get-api-data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  constructor(private getApiDataService: GetApiDataService) { }

  public feedbackList: Array<Feedback> = [];

  ngOnInit(): void {
    this.getApiDataService.getApiData('json/feedbackList.json')
      .subscribe(response => {
        this.feedbackList = response.data || [];
      });
  }
  
  getFeedbackGroup(index: number): Array<Feedback> {
    // Show 3 cards per slide, sliding by 3
    const groupSize = 3;
    if (!this.feedbackList.length) return [];
    const start = index * groupSize;
    return this.feedbackList.slice(start, start + groupSize);
  }

  ngOnDestroy(): void {}

}