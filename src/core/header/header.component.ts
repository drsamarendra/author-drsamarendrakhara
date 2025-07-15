import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  
  public isCollapsed = false;
  public activeNav: string = 'home';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        if (url.startsWith('/home')) {
          this.activeNav = 'home';
        } else if (url.startsWith('/blog')) {
          this.activeNav = 'blog';
        } else if (url.startsWith('/product')) {
          this.activeNav = 'product';
        }
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
    this.isCollapsed = scrollY > 80;
  }

  setActiveNav(nav: string, event: Event) {
    this.activeNav = nav;
    event.preventDefault();
    const collapseEl = this.navbarCollapse?.nativeElement;
    if (collapseEl && collapseEl.classList.contains('show')) {
      collapseEl.classList.add('collapsing-animate');
      setTimeout(() => {
        collapseEl.classList.remove('show');
        collapseEl.classList.remove('collapsing-animate');
      }, 300); // Match the CSS transition duration
    }
  }

  closeNavbarOnMobile(navbarToggler: HTMLElement) {
    if (window.innerWidth < 992) { // Bootstrap lg breakpoint
      navbarToggler.click();
    }
  }

}