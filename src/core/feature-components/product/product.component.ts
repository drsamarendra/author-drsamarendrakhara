import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared-service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  private productSubscription?: Subscription;
  public isGridView: boolean = false; // Default to list view
  public searchText: string = '';
  public constProductList: any[] = [];
  public workerProductList: any[] = [];


  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.handleListDetails().subscribe(
      response => {
        this.constProductList = response;
        this.workerProductList = response.map((obj: any) => ({ ...obj }));
        this.filterProducts();
      }
    );
  }


  public filterProducts(): void {
    this.workerProductList = this.getProducts()
  }

  public toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  public getProducts() {
    if (!this.searchText) {
      return this.constProductList;
    }
    return this.constProductList.filter(product =>
      JSON.stringify(product).toLowerCase().includes(this.searchText)
    );
  }

  public goToDetails(id: number) {
    this.router.navigate(['/product-details', id]);
  }



  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

}