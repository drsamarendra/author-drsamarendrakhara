import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private lclStrKeyList: Array<string> = ["lang", "sortBlog", "viewOpsKey", "prodSortKey"];

  ngOnInit(): void {
    this.removeLocalStorage(this.lclStrKeyList);
  }

  private removeLocalStorage(keyList: Array<string>) {
    keyList.forEach(key => localStorage.removeItem(key));
  }

  ngOnDestroy(): void {
    this.removeLocalStorage(this.lclStrKeyList);
  }

}