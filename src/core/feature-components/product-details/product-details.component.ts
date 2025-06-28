import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetApiDataService } from 'src/core/shared-service/get-api-data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public productList: any[] = [];
  public product: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private getApiDataService: GetApiDataService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getApiDataService.getApiData('json/productList.json').subscribe(
      response => {
        this.productList = response.data;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.product = this.productList.find(p => p.id === id);
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
}
