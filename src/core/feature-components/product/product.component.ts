import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetApiDataService } from 'src/core/shared-service/get-api-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public isGridView: boolean = false; // Default to list view
  public searchText: string = '';
  public constProductList: any[] = [];
  public workerProductList: any[] = [];


  constructor(
    private getApiDataService: GetApiDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getApiDataService.getApiData('json/productList.json').subscribe(
      response => {
        this.constProductList = response.data;
        this.workerProductList = response.data.map((obj: any) => ({ ...obj }));
        this.filterProducts();
      }
    );
  }


  filterProducts(): void {
    this.workerProductList = this.getProducts()
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  getProducts() {
    if (!this.searchText) {
      return this.constProductList;
    }
    return this.constProductList.filter(product =>
      JSON.stringify(product).toLowerCase().includes(this.searchText)
    );
  }

  goToDetails(id: number) {
    this.router.navigate(['/product-details', id]);
  }

}