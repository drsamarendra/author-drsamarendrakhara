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

  public handleBlogList(sortOrder: 'newest' | 'oldest'): Observable<any[]> {
    if (this.blogList.length > 0) {
      return of(this.formatBlogData(sortOrder));
    }

    return this.getblogList().pipe(
      map(() => {
        if (this.blogList.length === 0) {
          this.blogList = [];
        }
        return this.formatBlogData(sortOrder);
      })
    );
  }

  private formatBlogData(sortOrder: 'newest' | 'oldest') {
    return this.blogList
      .filter((item: any) => item.isDisplayFrontPage)
      .sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if ("newest" == sortOrder) {
          return dateB.getTime() - dateA.getTime(); // Descending (newest first)
        } else {
          return dateA.getTime() - dateB.getTime(); // Ascending (oldest first)
        }
      });
  }

  public isBlogPresnetById(id: number) {
    return this.blogList.some(blog => blog.id === id);
  }

  public getBlogById(id: number) {
    return this.blogList.find(blog => blog.id === id);
  }

}