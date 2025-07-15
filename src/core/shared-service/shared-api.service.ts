import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ResponseData } from '../model/api-details';
@Injectable({
  providedIn: 'root'
})
export class SharedApiService {

  constructor(private http: HttpClient) { }

  private get<T>(url: string, header: any): Observable<ResponseData> {
    return this.http.get<T>(url, header).pipe(
      map(data => {
        return new ResponseData()
          .setData(data)
          .setError(null)
          .setStatus(200)
          .setStatusText('OK');
      }),
      catchError(error => {
        return of(
          new ResponseData()
            .setData(null)
            .setError(error)
            .setStatus(error.status || 500)
            .setStatusText(error.statusText || 'Error')
        );
      })
    );
  }

  private post<T>(url: string, body: any, header: any): Observable<ResponseData> {
    return this.http.post<T>(url, body, header).pipe(
      map(data => {
        return new ResponseData()
          .setData(data)
          .setStatus(200)
          .setStatusText('OK')
          .setError(null);
      }),
      catchError(error => {
        return of(
          new ResponseData()
            .setData(null)
            .setError(error)
            .setStatus(error.status || 500)
            .setStatusText(error.statusText || 'Error')
        );
      })
    );
  }

  public request<T>(method: string, url: string, body?: any, header?: any) {
    let response: Observable<ResponseData>;
    if (method === 'get') {
      response = this.get<T>(url, header);
    } else if (method === 'post') {
      response = this.post<T>(url, body, header);
    } else {
      response = of(new ResponseData().setError('Unsupported method'));
    }
    return response;
  }
}