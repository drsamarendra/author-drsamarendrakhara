import { Injectable } from '@angular/core';
import { ApiDetailsService } from './api-details.service';
import { SharedApiService } from './shared-api.service';
import { ApiDetails } from '../model/api-details';

@Injectable({
  providedIn: 'root'
})
export class GetApiDataService {

  constructor(
    private apiDetails: ApiDetailsService,
    private sharedApi: SharedApiService
  ) { }

  public getApiData(apiUrl: string, body?: any) {
    console.log(`Fetching API data from: ${apiUrl}`);
    const apiDetail: ApiDetails = this.apiDetails.getApiDetails(apiUrl);
    if (!apiDetail) {
      throw new Error(`API details not found for url: ${apiUrl}`);
    }
    const url = apiDetail.baseUrl + apiDetail.url;
    const headers = apiDetail.header || {};
    const method = apiDetail.method ? apiDetail.method.toLowerCase() : 'get';
    return this.sharedApi.request(method, url, body, headers);
  }
}