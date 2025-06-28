import { Component, OnInit } from '@angular/core';
import { GetApiDataService } from '../../shared-service/get-api-data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

 public blogList: any[] = [];
 
   constructor(
     private getApiDataService: GetApiDataService
   ) { }
 
   ngOnInit(): void {
     this.getApiDataService.getApiData('json/blogList.json').subscribe(
       response => {
         this.blogList = response.data;
       }
     );
   }
}
