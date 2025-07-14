import { Injectable } from '@angular/core';
import { GetApiDataService } from './get-api-data.service';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogList: any[] = [];

  constructor(private apiService: GetApiDataService) { }

  private getblogList(): Observable<any[]> {
    return this.apiService.getApiData('json/blogList.json').pipe(
      tap((response: any) => {
        this.blogList = response.data;
      }),
      map((response: any) => response.data)
    );
  }

  public handleBlogList(): Observable<any[]> {
    if (this.blogList.length > 0) {
      return of(this.blogList);
    }

    return this.getblogList().pipe(
      map(() => {
        if (this.blogList.length === 0) {
          this.blogList = [];
        }
        return this.blogList;
      })
    );
  }

  public getLatestPostList(): Observable<any[]> {
    if (this.blogList.length > 0) {
      return of(this.formatBlogData());
    }

    return this.getblogList().pipe(
      map(() => {
        if (this.blogList.length === 0) {
          this.blogList = [];
        }
        return this.formatBlogData();
      })
    );
  }

  private formatBlogData() {
    return this.blogList
      .filter((item: any) => item.isDisplayFrontPage)
      .sort((a: any, b: any) => a.data - b.data);
  }

  public isBlogPresnetById(id: number) {
    return this.blogList.some(blog => blog.id === id);
  }

  public getBlogById(id: number) {
    return this.blogList.find(blog => blog.id === id);
  }

}