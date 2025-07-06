import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../shared-service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public productList: any[] = [];
  public product: any;
  public id: number = 0;
  public selectedImage: string | null = null;
  thumbStartIndex = 0;
  maxThumbs = 4; // Show 4 thumbnails at a time
  private productDetailsSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.productDetailsSubscription =
      this.productService.handleProductDetails(this.id).subscribe(
        response => {
          this.product = response;
          if (this.product?.imageUrls?.length) {
            this.selectedImage = this.product.imageUrls[0];
            this.thumbStartIndex = 0;
          }
        }
      );
  }

  goBack() {
    this.location.back();
  }

  buyOnWhatsApp() {
    const phone = '919999999999'; // Replace with your WhatsApp number (with country code, no +)
    const text = encodeURIComponent(
      `Hello, I am interested in buying the book "${this.product?.title}" by ${this.product?.author}.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }

  get visibleThumbs(): string[] {
    if (!this.product?.imageUrls) return [];
    return this.product.imageUrls.slice(this.thumbStartIndex, this.thumbStartIndex + this.maxThumbs);
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  scrollThumbs(direction: 'up' | 'down') {
    if (!this.product?.imageUrls) return;
    if (direction === 'up' && this.thumbStartIndex > 0) {
      this.thumbStartIndex--;
    } else if (direction === 'down' && this.thumbStartIndex + this.maxThumbs < this.product.imageUrls.length) {
      this.thumbStartIndex++;
    }
  }

  ngOnDestroy(): void {
    this.productDetailsSubscription?.unsubscribe();
  }
}
