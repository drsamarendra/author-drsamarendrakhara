import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../shared-service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public productList: any[] = [];
  public product: any;
  public selectedImage: string | null = null;
  public thumbStartIndex = 0;
  public maxThumbs = 4; // Show 4 thumbnails at a time
  private productDetailsSubscription?: Subscription;
  public showFullDescription = false;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {

    if (history.state && history.state.data) {
      const product = history.state.data;
      console.log('Product Details:', product);
      if (product?.id) {
        this.getproductDetails(product.id)
      } else {
        this.goBackToProductPage();
      }
    } else {
      this.goBackToProductPage();
    }
  }

  private getproductDetails(id: number) {
    this.productDetailsSubscription =
      this.productService.handleProductDetails(id).subscribe(
        response => {
          this.product = response;
          if (this.product?.imageUrls?.length) {
            this.selectedImage = this.product.imageUrls[0];
            this.thumbStartIndex = 0;
          }
        }
      );
  }

  goBackToProductPage() {
    this.router.navigate(['/products']);
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

  scrollThumbs(direction: 'left' | 'right') {
    if (!this.product?.imageUrls) return;
    if (direction === 'left' && this.thumbStartIndex > 0) {
      this.thumbStartIndex--;
    } else if (direction === 'right' && this.thumbStartIndex + this.maxThumbs < this.product.imageUrls.length) {
      this.thumbStartIndex++;
    }
  }

  ngOnDestroy(): void {
    this.productDetailsSubscription?.unsubscribe();
  }
}
