import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared-service/product.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  public carouselList: any[] = [];
  private carouselSubscription?: Subscription;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.carouselSubscription = this.productService.handleCarouselDetails().subscribe({
      next: (response) => {
        this.carouselList = response;
      },
      error: (error) => {
        console.error('Error fetching carousel details:', error);
      }
    });
  } 

  ngOnDestroy(): void {
    this.carouselSubscription?.unsubscribe();
  }

}
