import { Injectable } from '@angular/core';
import { GetApiDataService } from './get-api-data.service';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productList: any[] = [];
  private carouselDetails: any[] = [];
  private listDetails: any[] = [];

  private productDetailsLoaded = false;

  constructor(private apiService: GetApiDataService) { }

  private getProductDetilsList(): Observable<any[]> {
    if (this.productDetailsLoaded) {
      return of(this.productList);
    }
    return this.apiService.getApiData('json/productDetails.json').pipe(
      tap((response: any) => {
        this.productList = response.data;
        this.productDetailsLoaded = true;
      }),
      map((response: any) => response.data)
    );
  }

  public handleCarouselDetails(): Observable<any[]> {
    if (this.carouselDetails.length > 0 && this.productDetailsLoaded) {
      return of(this.carouselDetails);
    }

    if (!this.carouselDetails.length && this.productDetailsLoaded) {
      this.formatCarousalData();
      return of(this.carouselDetails);
    }
    return this.getProductDetilsList().pipe(
      map(() => {
        if (this.carouselDetails.length === 0) {
          this.formatCarousalData();
        }
        return this.carouselDetails;
      })
    );
  }

  private formatCarousalData() {
    const formatted = this.productList
      .filter((item: any) => item.carouselDetails.isDisplayed)
      .sort((a: any, b: any) => a.carouselDetails.order - b.carouselDetails.order)
      .map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          author: item.author,
          imageUrl: item.carouselDetails.imageUrl,
          description: item.carouselDetails.description,
          alt: item.carouselDetails.alt || 'No image available'
        };
      });
    this.carouselDetails = formatted;
  }

  public handleListDetails(): Observable<any[]> {
    if (this.listDetails.length > 0) {
      return of(this.listDetails);
    }

    if (!this.listDetails.length && this.productDetailsLoaded) {
      this.formatListPage();
      return of(this.listDetails);
    }

    return this.getProductDetilsList().pipe(
      map(() => {
        if (this.listDetails.length === 0) {
          this.formatListPage();
        }
        return this.listDetails;
      })
    );
  }


  private formatListPage() {
    const formatted = this.productList.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        author: item.author,
        imageUrl: item.listPageDetails.imageUrl,
        description: item.listPageDetails.description,
        alt: item.listPageDetails.alt || 'No image available'
      };
    });
    this.listDetails = formatted;
  }

  public handleProductDetails(id?: number): Observable<any> {
    if (this.productDetailsLoaded) {
      return of(this.formatProductDetails(id));
    }
    return this.getProductDetilsList().pipe(
      map(() => this.formatProductDetails(id))
    );
  }

  private formatProductDetails(id?: number) {
    const product = this.productList.find((item: any) => item.id == id);
    if (!product) return null;
    return {
      id: product.id,
      title: product.title,
      author: product.author,
      imageUrls: product.productPageDeatils.imageUrls,
      description: product.productPageDeatils.description,
      alt: product.productPageDeatils.alt || 'No image available'
    };
  }
}