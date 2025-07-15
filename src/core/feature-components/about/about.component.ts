import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../shared-service/blog.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  public blogList: any[] = [];
  private blogServiceSubscription: any;

  constructor(private blogService: BlogService,
    private router: Router) { }

  ngOnInit(): void {
    this.blogServiceSubscription = this.blogService.getLatestPostList
    ().subscribe(data => {
      this.blogList = data;
    });
    this.startAutoSlide();
  }

  goToBlogDetails(blog: any): void {
    const navigationExtras: NavigationExtras = {
      state: {
        data: blog
      }
    };
    this.router.navigateByUrl('/blog-details', navigationExtras);
  }

  ngOnDestroy(): void {
    this.blogServiceSubscription?.unsubscribe();
     clearInterval(this.intervalId);
  }

  cards = [
    {
      category: 'TECHNOLOGY', categoryColor: 'primary',
      title: 'Advancements in Quantum Computing Break Records',
      description: 'Researchers achieve quantum supremacy with new 256-qubit processor...',
      author: 'Michael Chen', readTime: '4 min read',
      img: 'https://via.placeholder.com/30?text=🧠'
    },
    {
      category: 'SPORTS', categoryColor: 'success',
      title: 'Local Team Wins Championship After Dramatic Final',
      description: 'In an overtime thriller, the underdogs clinched their first title...',
      author: 'David Park', readTime: '3 min read',
      img: 'https://via.placeholder.com/30?text=🏀'
    },
    {
      category: 'FOOD', categoryColor: 'warning',
      title: 'The Rise of Plant-Based Fine Dining',
      description: 'Michelin-starred chefs are reinventing haute cuisine...',
      author: 'Elena Rodriguez', readTime: '6 min read',
      img: 'https://via.placeholder.com/30?text=🥗'
    },
    {
      category: 'TRAVEL', categoryColor: 'info',
      title: 'Exploring Hidden Gems of Asia',
      description: 'Backpacking through Southeast Asia reveals unknown gems...',
      author: 'Liam Wong', readTime: '5 min read',
      img: 'https://via.placeholder.com/30?text=🌏'
    },
    {
      category: 'HEALTH', categoryColor: 'danger',
      title: 'Revolutionary Cancer Therapy Approved',
      description: 'A new hope for patients worldwide emerges with the latest therapy...',
      author: 'Sarah Lee', readTime: '7 min read',
      img: 'https://via.placeholder.com/30?text=💊'
    }
  ];

  currentIndex = 0;
  intervalId: any;


  get visibleCards() {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(this.cards[(this.currentIndex + i) % this.cards.length]);
    }
    return visible;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => this.nextSlide(), 3000);
  }
}
