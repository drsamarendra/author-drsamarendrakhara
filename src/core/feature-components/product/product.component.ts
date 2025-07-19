import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  public prodSortKey: any = "newest"; //newest/lowToHigh/highToLow


  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const viewOption = localStorage.getItem("viewOpsKey") || "list";
    this.isGridView = viewOption == "grid";
    this.prodSortKey = localStorage.getItem("prodSortKey") || "newest"; 
    this.getProductList();
  }

  private getProductList() {
    this.productSubscription = this.productService.handleListDetails(this.prodSortKey).subscribe(
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
    const viewOpt = this.isGridView ? "grid" :"list";
    localStorage.setItem("viewOpsKey", viewOpt)
  }

  public getProducts() {
    if (!this.searchText) {
      return this.constProductList;
    }
    return this.constProductList.filter(product =>
      JSON.stringify(product).toLowerCase().includes(this.searchText)
    );
  }

  public goToDetails(product: any): void {
    const navigationExtras: NavigationExtras = {
      state: {
        data: product
      }
    };
    this.router.navigateByUrl('/product-details', navigationExtras);
  }

  public onClickSortdp(selectSortKey: string) {
    this.prodSortKey = selectSortKey;
    localStorage.setItem("prodSortKey", this.prodSortKey)
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

}