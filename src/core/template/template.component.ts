import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public myDynamicStyles: any = { 'margin-top': '20px' };
  constructor() { }

  ngOnInit(): void {
    this.fixMarginTop();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.fixMarginTop();
  }

  private fixMarginTop() {
    if (window.innerWidth >= 187 && window.innerWidth <= 357) {
      this.myDynamicStyles = { 'margin-top': '190px' };
    } else if (window.innerWidth >= 358 && window.innerWidth <= 339) {
      this.myDynamicStyles = { 'margin-top': '150px' };
    } else if (window.innerWidth >= 340 && window.innerWidth <= 767) {
      this.myDynamicStyles = { 'margin-top': '130px' };
    } else if (window.innerWidth >= 768) {
      this.myDynamicStyles = { 'margin-top': '100px' };
    }
  }

}
