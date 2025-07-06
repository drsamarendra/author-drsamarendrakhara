import { Injectable } from '@angular/core';
import { ApiDetails } from '../model/api-details';

@Injectable({
  providedIn: 'root'
})
export class ApiDetailsService {

  constructor() { }

  private baseUrl = 'assets/'; // Base URL for the API
  private version = '1.0';

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      // Add more headers as needed, e.g. Authorization
      // 'Authorization': 'Bearer <token>'
    };
  }

  private apiList: Array<ApiDetails> = [
    new ApiDetails()
      .setBaseUrl(this.baseUrl)
      .setVersion(this.version)
      .setUrl('json/productList.json')
      .setMethod('get')
      .setHeader(this.getHeaders()),
    new ApiDetails()
      .setBaseUrl(this.baseUrl)
      .setVersion(this.version)
      .setUrl('json/blogList.json')
      .setMethod('get')
      .setHeader(this.getHeaders()),
      new ApiDetails()
      .setBaseUrl(this.baseUrl)
      .setVersion(this.version)
      .setUrl('json/productDetails.json')
      .setMethod('get')
      .setHeader(this.getHeaders()),
  ];

  public getApiDetails(url: string): ApiDetails {
    const apiDetail = this.apiList.find(api => api.url === url);
    if (!apiDetail) {
      throw new Error(`API details not found for url: ${url}`);
    }
    return apiDetail;
  }
}

